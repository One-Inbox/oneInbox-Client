import { useSelector } from "react-redux";
import getYearAndMonth from "../utilsMetrics/getYearAndMonth";
import getMonthName from "../utilsMetrics/getMonthName";
import BarChart from "../graphicsTypes/BarChart";
import timeStampToISO from "../../../utils/timeStampToISO";

const RankingUserByMonth = () => {
  const users = useSelector((state) => state.users);
  console.log("usuarios en redux", users);

  const date = new Date();
  const { year: currentYear, month: currentMonth } = getYearAndMonth(date);
  console.log("año y mes hoy:", currentYear, currentMonth);

  const filteredUsers = users.map((user) => {
    const filteredMsgs =
      user.MsgSents &&
      user.MsgSents.filter((msg) => {
        const { year, month } = getYearAndMonth(timeStampToISO(msg.timestamp));
        console.log("año y mes por msg", year, month);

        return year === currentYear && month === currentMonth;
      });
    return {
      ...user,
      MsgSents: filteredMsgs,
    };
  });

  console.log("usuarios filtrados por mes", filteredUsers);

  const data =
    filteredUsers &&
    filteredUsers.map((user) => {
      const totalMessages = user.MsgSents && user.MsgSents.length;
      return {
        id: user.id,
        name: user.name,
        active: user.active,
        quantity: totalMessages,
      };
    });
  console.log("Data:", data);
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
            <BarChart data={data} label={"Respuestas enviadas"} />
          </div>
        ) : (
          <div className="text-gray-500 text-xs font-normal font-['Inter'] text-center mb-4">
            <span>No hay datos disponibles para este mes.</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default RankingUserByMonth;
