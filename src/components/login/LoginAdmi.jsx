import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserByIdAction,
  admiLoginAction,
} from "../../redux/actions/actionsUsers";
//import {getAllSocialMediaByBusinessAction} from "../redux/actions/actionSocialMedia"
import { sweetAlertsError } from "../utils/alerts/alerts";
import FormExitButton from "../utils/buttons/FormExitButton";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";


const LoginAdmi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users);
  const [showPassword, setShowPassword] = useState(false)

  const [input, setInput] = useState({
    name: "",
    password: "",
  });

  const handlerInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  
   const toggleShowPassword = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword); 
   }

  const handlerLoginSubmit = async (e) => {
    e.preventDefault();
    const user = input.name
      ? allUsers.find(
          (user) => user.name.toUpperCase() === input.name.toUpperCase()
        )
      : null;
    if (user && user.password === input.password && user.privilege == "Admin") {
      dispatch(getUserByIdAction(user.id));
      dispatch(admiLoginAction(true));
      //dispatch(getAllSocialMediaByBusinessAction())
      sessionStorage.removeItem("userId");
      sessionStorage.setItem("Admi", user.id);
      sessionStorage.setItem('loginAdmi', true)
      navigate("/dashboardAdmi/homeAdmi");
    } else {
      sweetAlertsError(
        `${input.name} no tiene privilegios`,
        "comprueba que el nombre y la contraseña sean los correctos",
        "Ok"
      );
      //este navigate deberia cerrar el modal --- hecho asi para prueba de desarrollo
      navigate(-1);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-stone-300">
      <div className="w-96 h-[26rem] bg-sky-950 rounded-tl-[80px] rounded-tr-[80px] rounded-bl-[80px]  flex flex-col items-center justify-center relative">
        <form onSubmit={handlerLoginSubmit}>
          <div className="absolute top-12 right-10">
            <FormExitButton path={-1} />
          </div>
          <h1 className="text-white text-xl font-semibold font-['Inter'] capitalize text-center">
            Bienvenido
          </h1>
          <div className="flex flex-col items-center justify-center my-10">
            <input
              placeholder="Usuario"
              className="w-64 h-6 bg-white rounded-[30px] shadow-inner p-4 text-sm"
              id="name"
              type="text"
              value={input.name}
              name="name"
              onChange={handlerInputChange}
            />
            <div className="relative w-64 mt-4">
             <input
                placeholder="Contraseña"
                className="w-64 h-6 bg-white rounded-[30px] shadow-inner mt-4 p-4 text-sm"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={input.password}
                onChange={handlerInputChange}
              />
            <button onClick={toggleShowPassword} className="absolute right-4 top-1/4  text-gray-500 bg-transparent border-none mx-0 my-2 p-0">   
              {showPassword ? (<EyeSlashIcon className="w-5 h-5" />) : (<EyeIcon className="w-5 h-5" />)} 
            </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-fit h-fit  px-8 py-1 bg-sky-950 hover:bg-amber-500 border-gray-700 rounded-[30px] shadow-inner text-white text-xs font-normal font-['Oswald']"
            >
              LOGIN
            </button>
          </div>
          <img
            src="/logos/logo.svg"
            className="w-20 h-auto absolute bottom-8 right-8"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginAdmi;
