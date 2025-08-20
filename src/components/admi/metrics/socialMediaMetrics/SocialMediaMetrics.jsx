import SocialMediaYearMetrics from "./SocialMediaYearMetrics";
import SocialMediaMonthMetrics from "./SocialMediaMonthMetrics";

const SocialMediaMetrics = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header del ranking */}
      <div className="flex-shrink-0 bg-sky-950 text-white text-base font-['Oswald'] uppercase flex items-center justify-center py-3">
        Ranking de Redes Sociales
      </div>

      {/* Contenedor de las gráficas - ocupa el resto del espacio */}
      <div className="flex gap-2 flex-1 p-4 min-h-0">
        <div className="flex-1 min-h-0">
          <SocialMediaYearMetrics />
        </div>
        <div className="flex-1 min-h-0">
          <SocialMediaMonthMetrics />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaMetrics;
