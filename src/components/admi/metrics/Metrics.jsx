import SocialMediaMetrics from "./socialMediaMetrics/socialMediaMetrics";
import { useSelector } from "react-redux";

const Metrics = () => {
  const metricsSelected = useSelector((state) => state.metricsSelected);
  return (
    <div className="relative flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {metricsSelected && metricsSelected === "Ranking de Redes Sociales" ? (
          <SocialMediaMetrics />
        ) : metricsSelected && metricsSelected === "Tiempos de Respuesta" ? (
          <span className="text-center text-gray-500">
            Tiempos de Respuesta
          </span>
        ) : metricsSelected && metricsSelected === "Ranking de Usuarios" ? (
          <span className="text-center text-gray-500">Ranking de Usuarios</span>
        ) : metricsSelected && metricsSelected === "Horarios de Respuesta" ? (
          <span className="text-center text-gray-500">
            Horarios de Respuesta
          </span>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <img src="/imagenFondoCAInactiva.svg" className="w-auto h-3/4" />
          </div>
        )}
      </div>
    </div>
  );
};
export default Metrics;
