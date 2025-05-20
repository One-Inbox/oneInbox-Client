//es el boton para el menu lateral verde del administrador
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const MenuButton = ({ route, nameRoute, path }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(
    location.pathname === path ? true : false
  );

  const handlerOnclick = () => {
    navigate(route);
  };

  return (
    <div>
      {isActive ? (
        <div>
          <button
            onClick={handlerOnclick}
            className="w-64 h-28 rounded-none shadow-inner flex items-center justify-center bg-white text-sky-950 text-base font-normal font-['Oswald'] uppercase"
          >
            <div className="flex items-center justify-end">
              <div className="w-56 h-24 border-t-amber-500 border-l-amber-500  border-b-amber-500 border-r-transparent border-4 flex items-center justify-center">
                {nameRoute}
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handlerOnclick}
            className="w-64 h-28  rounded-none shadow-inner flex items-center justify-center bg-green-400 hover:bg-amber-500 text-white text-base font-normal font-['Oswald'] uppercase"
          >
            {nameRoute}
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuButton;
