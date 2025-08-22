import SocialMediaMetrics from "./socialMediaMetrics/socialMediaMetrics";
import RankingUsers from "./rankingUsers/RankingUsers";
import RankingSchedules from "./rankingSchedules/RankingSchedules";
import TimeToResponseMetrics from "./timeToResponseMetrics/timeToResponseMetrics";
import { useSelector, useDispatch } from "react-redux";
import { selectMetricsAction } from "../../../redux/actions/actionMetrics";

const Metrics = () => {
  const metricsSelected = useSelector((state) => state.metricsSelected);
  const dispatch = useDispatch();
  const handlerOnClick = async () => {
    await dispatch(selectMetricsAction(""));
  };

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden">
      {metricsSelected && (
        <div className="fixed top-28 right-10 mt-2 z-50">
          <div>
            <img
              src={"/buttons/goBack-icon.svg"}
              className="w-6 h-auto"
              onClick={handlerOnClick}
              onMouseOver={(e) =>
                (e.currentTarget.src = "/buttons/goBlack-hover-icon.svg")
              }
              onMouseOut={(e) =>
                (e.currentTarget.src = "/buttons/goBack-icon.svg")
              }
              alt="Go back"
            />
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {metricsSelected && metricsSelected === "Ranking de Redes Sociales" ? (
          <SocialMediaMetrics />
        ) : metricsSelected && metricsSelected === "Tiempos de Respuesta" ? (
          <div className="flex-1 flex justify-center items-center">
            <TimeToResponseMetrics />
          </div>
        ) : metricsSelected && metricsSelected === "Ranking de Usuarios" ? (
          <div className="flex-1 flex justify-center items-center">
            <RankingUsers />
          </div>
        ) : metricsSelected && metricsSelected === "Actividad Horaria" ? (
          <div className="flex-1 flex justify-center items-center">
            <RankingSchedules />
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center mt-16">
            <img src="/imagenFondoCAInactiva.svg" className="w-auto h-3/4" />
          </div>
        )}
      </div>
    </div>
  );
};
export default Metrics;
