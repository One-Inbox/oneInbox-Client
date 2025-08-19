import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { selectMetricsAction } from "../../../redux/actions/actionMetrics";

const MenuButtonMetrics = ({ nameRoute }) => {
  const metricsSelected = useSelector((state) => state.metricsSelected);
  const dispatch = useDispatch();

  const isActive = metricsSelected === nameRoute;

  const handlerOnclick = async () => {
    await dispatch(selectMetricsAction(nameRoute));
  };

  return (
    <div>
      {isActive ? (
        <div>
          <button
            onClick={handlerOnclick}
            className="w-64 h-28 rounded-none shadow-inner flex items-center justify-center bg-white text-sky-950 text-base font-normal font-['Oswald'] uppercase focus:outline-none"
          >
            <div className="flex items-center justify-end">
              <div className="w-56 h-24 border-t-amber-500 border-l-amber-500 border-b-amber-500 border-r-transparent border-4 flex items-center justify-center">
                {nameRoute}
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handlerOnclick}
            className="w-64 h-28 rounded-none shadow-inner flex items-center justify-center bg-green-400 hover:bg-amber-500 text-white text-base font-normal font-['Oswald'] uppercase focus:outline-none"
          >
            {nameRoute}
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuButtonMetrics;
