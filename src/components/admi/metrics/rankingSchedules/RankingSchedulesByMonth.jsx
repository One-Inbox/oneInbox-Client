import { useSelector } from "react-redux";
import getYearAndMonth from "../utilsMetrics/getYearAndMonth";
import getMonthName from "../utilsMetrics/getMonthName";
import timeStampToISO from "../../../utils/timeStampToISO";
import makesGroup from "../utilsMetrics/makesGroup";
import LineAreaChart from "../graphicsTypes/LineAreaChart";

const RankingSchedulesByMonth = () => {
  const msgReceiveds = useSelector((state) => state.messagesReceived);
  const hoursOfDay = [...Array(24)].map((_, i) =>
    i.toString().padStart(2, "0")
  );
  const date = new Date();
  const { year: currentYear, month: currentMonth } = getYearAndMonth(date);
  const msgFiltered =
    msgReceiveds &&
    msgReceiveds.filter((msg) => {
      const { year, month } = getYearAndMonth(timeStampToISO(msg.timestamp));
      return year === currentYear && month === currentMonth;
    });
  const msgsWithHour =
    msgFiltered &&
    msgFiltered.map((msg) => {
      const timestamp = timeStampToISO(msg.timestamp);
      const hour = timestamp.split("T")[1].split(":")[0];
      return {
        ...msg,
        hour: hour,
      };
    });
  const grouped = makesGroup(msgsWithHour, "hour");
  const msgsData = grouped.map((group) => {
    const quantity = group.length;
    const hour = group[0].hour;
    return {
      hour,
      quantity,
    };
  });
  const data =
    hoursOfDay.length === msgsData.length
      ? msgsData
      : hoursOfDay.map((hour) => {
          const found = msgsData.find((item) => item.hour === hour);
          return {
            hour,
            quantity: found ? found.quantity : 0,
          };
        });
  const someMsg = data.some((item) => item.quantity > 0);
  return (
    <div className="w-full h-full bg-neutral-100 rounded-bl-[50px] relative flex flex-col overflow-hidden">
      <div className="flex flex-col items-start pt-4 my-2 ml-6 flex-shrink-0">
        <h4 className="text-xs font-normal font-['Oswald'] uppercase">
          Métricas mensuales
        </h4>
        <h1 className="text-base font-normal font-['Oswald'] uppercase">
          Mes {getMonthName(currentMonth)}
        </h1>
      </div>

      <div className="flex-1 p-4 min-h-0">
        {someMsg ? (
          <div className="w-10/12 h-auto mx-auto ">
            <LineAreaChart data={data} label={"cantidad de mensajes"} />
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

export default RankingSchedulesByMonth;
