import { useSelector } from "react-redux";
import getYearAndMonth from "../utilsMetrics/getYearAndMonth";
import BarChart from "../graphicsTypes/BarChart";
import timeStampToISO from "../../../utils/timeStampToISO";

const RankingUserByYear = () => {
  const users = useSelector((state) => state.users);
  const date = new Date();
  const { year: currentYear } = getYearAndMonth(date);

  const filteredUsers = users.map((user) => {
    const filteredMsgs =
      user.MsgSents &&
      user.MsgSents.filter((msg) => {
        const { year } = getYearAndMonth(timeStampToISO(msg.timestamp));
        return year === currentYear;
      });

    return {
      ...user,
      MsgSents: filteredMsgs,
    };
  });

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
  const someMsg = data.some((item) => item.quantity > 0);

  return (
    <div className="w-full h-auto bg-neutral-100 rounded-tr-[50px] relative flex flex-col overflow-hidden">
      <div className="flex flex-col items-start pt-4 my-2 ml-6 flex-shrink-0">
        <h4 className="text-xs font-normal font-['Oswald'] uppercase">
          Métricas anuales
        </h4>
        <h1 className="text-base font-normal font-['Oswald'] uppercase">
          Año {currentYear}
        </h1>
      </div>

      <div className="flex-1 p-4 min-h-0">
        {someMsg ? (
          <div className="w-10/12 h-auto mx-auto ">
            <BarChart data={data} label={"Respuestas enviadas"} />
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
export default RankingUserByYear;
