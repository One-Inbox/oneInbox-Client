//este boton se usa en el sideBar azul del administrador

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const SideBarAButton = ({ route, nameRoute }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(
    route === location.pathname ? true : false
  );

  const handlerOnclick = () => {
    navigate(route);
    setIsActive(true);
  };
  return (
    <div>
      {isActive ? (
        <div>
          <button
            onClick={handlerOnclick}
            className="w-48 h-28 rounded-none shadow-inner flex items-center justify-center bg-green-400 text-white text-base font-normal font-['Oswald'] uppercase"
          >
            <div className="flex items-center justify-end absolute right-0">
              <div className="w-44 h-24 border-t-amber-500 border-l-amber-500  border-b-amber-500 border-r-transparent border-4 flex items-center justify-center">
                {nameRoute}
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handlerOnclick}
            className="w-48 h-28 rounded-none shadow-inner flex items-center justify-center bg-sky-950 hover:bg-amber-500 text-white text-base font-normal font-['Oswald'] uppercase"
          >
            {nameRoute}
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBarAButton;
