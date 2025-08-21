import RankingSchedulesByMonth from "./RankingSchedulesByMonth";
import RankingSchedulesByYear from "./RankingSchedulesByYear";

const RankingSchedules = () => {
  return (
    <div className="flex flex-col w-full h-full  overflow-x-hidden overflow-y-auto">
      {/* Header del ranking */}
      <div className="flex-shrink-0 bg-sky-950 text-white text-base font-['Oswald'] uppercase flex items-center justify-center py-3">
        Actividad Horaria: Mensajes recibidos por hora
      </div>

      {/* Contenedor de las gráficas - ahora en columna */}
      <div className="flex flex-col gap-2 flex-1 p-4 min-h-0 mx-2">
        <div className="flex-1 min-h-0">
          <RankingSchedulesByYear />
        </div>
        <div className=" min-h-0">
          <RankingSchedulesByMonth />
        </div>
      </div>
    </div>
  );
};

export default RankingSchedules;
