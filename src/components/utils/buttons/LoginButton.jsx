import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  //handler provisorio para desarrollo--deberia abrir un modal con el formulario
  const handlerLogin = () => {
    navigate("/loginAdmi");
  };

  return (
    <div>
      <button
        onClick={handlerLogin}
        className="w-fit h-fit  px-8 py-1 bg-sky-950 hover:bg-amber-500 border-gray-700 rounded-[30px] shadow-inner text-white text-xs font-normal font-['Oswald']"
      >
        LOGIN
      </button>
    </div>
  );
};

export default LoginButton;
