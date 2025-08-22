import { useSelector } from "react-redux";
import getYearAndMonth from "../utilsMetrics/getYearAndMonth";
import timeStampToISO from "../../../utils/timeStampToISO";
import makesGroup from "../utilsMetrics/makesGroup";
import processResponseTimes from "./processResponseTimes";
import StackedBarChart from "../graphicsTypes/StackedBarChart";
import addSocialMediaName from "../utilsMetrics/addSocialMediaName";

const TimeToResponseByYear = () => {
  const contacts = useSelector((state) => state.contacts);
  //console.log("contactos", contacts);

  const date = new Date();
  const { year: currentYear } = getYearAndMonth(date);
  //filtro contactos por año corriente
  const contactsByYear = contacts.filter((contact) => {
    if (contact.MsgReceiveds && contact.MsgReceiveds.length > 0) {
      const { year } = getYearAndMonth(
        timeStampToISO(contact.MsgReceiveds[0].timestamp)
      );
      return year === currentYear;
    }
    return false; // si no tiene mensajes, lo excluimos
  });

  //quito los las respuestas automaticas
  const contactWithoutAutomaticResponse =
    contactsByYear &&
    contactsByYear.map((contact) => {
      const msgsSents = contact.MsgSents;
      if (!msgsSents.length) return contact;
      const notAutomaticResponse = msgsSents.filter(
        (msg) => msg.UserId !== null
      );
      return {
        ...contact,
        MsgSents: notAutomaticResponse,
      };
    });

  // console.log(
  //   "contactos sin respuestas automaticas",
  //   contactWithoutAutomaticResponse
  // );
  const groups = makesGroup(contactWithoutAutomaticResponse, "SocialMediumId");
  //console.log("grupos por red social", groups);

  const changeDataGroups =
    groups &&
    groups.map((group) => ({
      socialMediaId: group[0].SocialMediumId,
      beforeTime: 0,
      onTime: 0,
      afterTime: 0,
      conversations: group.map((contact) => {
        // Combinar mensajes recibidos y enviados
        const allMessages = [...contact.MsgReceiveds, ...contact.MsgSents];

        // Convertir timestamp a ISO y dejar solo timestamp y received
        const unifiedMessages = allMessages.map((msg) => ({
          timestamp: timeStampToISO(msg.timestamp),
          received: msg.received,
        }));

        // Ordenar por timestamp
        return unifiedMessages.sort((a, b) =>
          a.timestamp.localeCompare(b.timestamp)
        );
      }),
    }));

  const counterData = changeDataGroups
    ? changeDataGroups.map((group) => {
        const counterTime = group.conversations.map((item) =>
          processResponseTimes(item)
        );
        return {
          socialMediaId: group.socialMediaId,
          beforeTime:
            group.beforeTime +
            counterTime.reduce((sum, item) => sum + item.beforeTime, 0),
          onTime:
            group.onTime +
            counterTime.reduce((sum, item) => sum + item.onTime, 0),
          afterTime:
            group.afterTime +
            counterTime.reduce((sum, item) => sum + item.afterTime, 0),
        };
      })
    : null;

  const dataFiltered =
    counterData &&
    counterData.filter(
      (data) =>
        !(data.afterTime === 0 && data.beforeTime === 0 && data.onTime === 0)
    );

  const data = dataFiltered
    ? addSocialMediaName(dataFiltered).sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    : null;

  return (
    <div className="w-full h-auto bg-neutral-100 rounded-t-[50px] rounded-bl-[50px] relative flex flex-col overflow-hidden">
      <div className="flex flex-col items-start pt-4 my-2 ml-6 flex-shrink-0">
        <h4 className="text-xs font-normal font-['Oswald'] uppercase">
          Métricas anuales
        </h4>
        <h1 className="text-base font-normal font-['Oswald'] uppercase">
          Año {currentYear}
        </h1>
      </div>
      <div className="flex-1 p-4 min-h-0">
        {data ? (
          <div className="w-10/12 h-auto mx-auto ">
            <StackedBarChart data={data} label={"cantidad de mensajes"} />
          </div>
        ) : (
          <div className="text-gray-500 text-xs font-normal font-['Inter'] text-center mb-4">
            <span>No hay datos disponibles para este año.</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default TimeToResponseByYear;
