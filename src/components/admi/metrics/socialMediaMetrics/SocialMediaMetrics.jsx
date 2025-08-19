import SocialMediaYearMetrics from "./SocialMediaYearMetrics";
import SocialMediaMonthMetrics from "./SocialMediaMonthMetrics";

const SocialMediaMetrics = () => {
  // return (
  //   <>
  //     <div className="w-3/5 fixed top-16 z-40 ml-32">
  //       <h1 className="w-full bg-sky-950 text-white text-base font-['Oswald'] uppercase flex items-center justify-center py-2">
  //         Ranking Redes Sociales
  //       </h1>
  //     </div>

  //     {/* Contenedor flex para métricas */}
  //     <div className="flex gap-4 w-full px-4 mt-14 mb-4">
  //       <div className="flex-1">
  //         <SocialMediaYearMetrics className="w-full h-full" />
  //       </div>
  //       <div className="flex-1">
  //         <SocialMediaMonthMetrics className="w-full h-full" />
  //       </div>
  //     </div>
  //   </>
  // );
  // return (
  //   <div className="flex flex-col h-full overflow-hidden">
  //     {/* Header fijo dentro del área de contenido */}
  //     <div className="flex-shrink-0 bg-sky-950 text-white text-base font-['Oswald'] uppercase flex items-center justify-center py-2">
  //       Ranking Redes Sociales
  //     </div>

  //     {/* Contenedor flex para métricas que ocupa el resto del espacio */}
  //     <div className="flex gap-2 flex-1 p-4 overflow-hidden">
  //       <div className="flex-1 h-full">
  //         <SocialMediaYearMetrics />
  //       </div>
  //       <div className="flex-1 h-full">
  //         <SocialMediaMonthMetrics />
  //       </div>
  //     </div>
  //   </div>
  // );
  // return (
  //   <div className="flex flex-col h-full">
  //     {/* Header del ranking */}
  //     <div className="flex-shrink-0 bg-sky-950 text-white text-base font-['Oswald'] uppercase flex items-center justify-center py-3">
  //       Ranking Redes Sociales
  //     </div>

  //     {/* Contenedor de las gráficas que ocupa el resto del espacio */}
  //     <div className="flex gap-2 flex-1 p-4">
  //       <div className="flex-1">
  //         <SocialMediaYearMetrics />
  //       </div>
  //       <div className="flex-1">
  //         <SocialMediaMonthMetrics />
  //       </div>
  //     </div>
  //   </div>
  // );
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
