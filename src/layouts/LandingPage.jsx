import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [socialMediaLogin, setsocialMediaLogin] = useState(false)

  const handlerOnClick = () => {
    navigate('/login')
  }

  const changeShowHandler = () => {
    setsocialMediaLogin(!socialMediaLogin)
  }
  
  return (
        <div className="w-screen h-screen relative bg-sky-950 flex-col justify-start items-start inline-flex z-0">
          <img
            className=" absolute w-screen h-screen left-0 right-0 mx-auto -top-8 from-sky-950 mix-blend-mode-multiply"
            src="/landing.svg"
            alt="OneInbox landing"
          />
          <div className="w-[800px] h-[150px] absolute top-8 left-28">
            <img
              className="w-40 h-24"
              src="/logos/logo.svg"
              alt="OneInbox logo"
            />
            <span className="text-white text-base font-normal font-['Inter'] absolute top-0 left-28">
              Dale la bienvenida a la tranquilidad en tu vida digital
              <br />
            </span>
            <span className="text-white text-base font-normal font-['Inter'] absolute top-7 left-28">
              Unifica, Organiza, conecta
              <br />
            </span>
            <div className="text-white text-4xl font-semibold font-['Inter'] capitalize absolute top-16 left-44">
              oneInbox
            </div>
            <div className="text-white text-base font-normal font-['Inter'] absolute top-28 left-20">
              Tu bandeja de entrada social definitiva
            </div>
          </div>
          <div className="absolute bottom-14 left-0 right-0 flex justify-center">
          {socialMediaLogin ? (
            <div> 
            <a
               href={`https://electrica-mosconi-backend-main.onrender.com/mercadolibre/auth`}
              //href={`https://electrica-mosconi-backend.onrender.com/mercadolibre/auth`}
              className="w-fit h-fit  relative mx-auto px-8 py-1 bg-sky-950 hover:bg-amber-500 border-gray-700 rounded-[30px] shadow-inner text-white text-base font-normal font-['Oswald']"
              >
              INICIAR SESIÓN CON MERCADO LIBRE
            </a>
            <a
              href={`https://electrica-mosconi-backend-main.onrender.com/auth/facebook`}
              //href={`https://electrica-mosconi-backend.onrender.com/auth/facebook`}
              className="w-fit h-fit  relative mx-auto px-8 py-1 bg-sky-950 hover:bg-amber-500 border-gray-700 rounded-[30px] shadow-inner text-white text-base font-normal font-['Oswald']"
              
            >
              INICIAR SESIÓN CON FACEBOOK
            </a>
            <a
              href={`https://electrica-mosconi-backend-main.onrender.com/auth/instagram`}
              //href={`https://electrica-mosconi-backend.onrender.com/auth/instagram`}
              className="w-fit h-fit  relative mx-auto px-8 py-1 bg-sky-950 hover:bg-amber-500 border-gray-700 rounded-[30px] shadow-inner text-white text-base font-normal font-['Oswald']"
              
            >
              INICIAR SESIÓN CON INSTAGRAM
            </a>
            <button
                onClick={changeShowHandler}
                className="w-fit h-fit  relative mx-auto px-8 py-1 bg-sky-950 hover:bg-amber-500 border-gray-700 rounded-[30px] shadow-inner text-white text-base font-normal font-['Oswald']"
              >
                VOLVER 
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={changeShowHandler}
                className="w-fit h-fit  relative mx-auto px-8 py-1 bg-sky-950 hover:bg-amber-500 border-gray-700 rounded-[30px] shadow-inner text-white text-base font-normal font-['Oswald'] "
              >
                INICIOS DE SESION 
              </button>
            <button
                onClick={handlerOnClick}
                className="w-fit h-fit  relative mx-auto px-8 py-1 bg-sky-950 hover:bg-amber-500 border-gray-700 rounded-[30px] shadow-inner text-white text-base font-normal font-['Oswald']"
              >
                COMENCEMOS
              </button>

            </div>
          )}
          </div>
        </div>
  );
};

export default LandingPage;

