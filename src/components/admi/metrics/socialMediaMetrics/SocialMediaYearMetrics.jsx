import { useSelector } from "react-redux";
import makesGroup from "../utilsMetrics/makesGroup";
import getYearAndMonth from "../utilsMetrics/getYearAndMonth";
import timeStampToISO from "../../../utils/timeStampToISO";
import getSocialMediaName from "../utilsMetrics/getSocialMediaName";
import DoughnutChart from "../graphicsTypes/DoughnutChart";

const SocialMediaYearMetrics = () => {
  const contacts = useSelector((state) => state.contacts);
  const socialMedia = useSelector((state) => state.socialMediaActive);
  const socialMediaNames = getSocialMediaName(socialMedia);

  const date = new Date();
  const { year: currentYear } = getYearAndMonth(date);
  const contactsByYear = contacts.filter((contact) => {
    if (contact.MsgReceiveds && contact.MsgReceiveds.length > 0) {
      const { year } = getYearAndMonth(
        timeStampToISO(contact.MsgReceiveds[0].timestamp)
      );
      return year === currentYear;
    }
    return false; // si no tiene mensajes, lo excluimos
  });

  const grouped =
    contactsByYear.length && makesGroup(contactsByYear, "SocialMediumId");

  const data = socialMediaNames.map((sm) => {
    const group = grouped && grouped.find((g) => g[0].SocialMediumId === sm.id);
    const totalContacts = group ? group.length : 0;
    return {
      ...sm,
      quantity: totalContacts,
    };
  });
  const filteredData = data && data.filter((item) => item.quantity > 0);

  return (
    <div className="w-full h-full bg-neutral-100 rounded-bl-[50px] relative flex flex-col overflow-hidden">
      <div className="flex flex-col items-start pt-4 my-2 ml-6 flex-shrink-0">
        <h4 className="text-xs font-normal font-['Oswald'] uppercase">
          Métricas anuales
        </h4>
        <h1 className="text-base font-normal font-['Oswald'] uppercase">
          Año {currentYear}
        </h1>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 min-h-0">
        {filteredData && filteredData.length ? (
          <DoughnutChart
            data={filteredData}
            label={"Conversaciones Abiertas"}
          />
        ) : (
          <div className="text-gray-500 text-xs font-normal font-['Inter'] text-center mb-4">
            <span>No hay datos disponibles para este mes.</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default SocialMediaYearMetrics;
