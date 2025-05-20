import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginBusinessAction } from "../../redux/actions/actionBusiness";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import SpinnerLoginBusiness from "../utils/spinners/SpinnerLoginBusiness";

const BusinessLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  //const business = useSelector((state) => state.business)

  const [input, setInput] = useState({
    businessName: "",
    password: "",
  });

  const handlerInputChange = (e) => {
    //console.log("Input cambiado:", e.target.name, e.target.value);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
//console.log(input);

const toggleShowPassword = (e) => {
  e.preventDefault()
  setShowPassword(!showPassword); 
 }

  const handlerLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    dispatch(loginBusinessAction(input));
    //console.log('despacho la action del login con input', input);
    setTimeout(() => {
      navigate("/inbox");
      setLoading(false);
    }, 4000);
    //navigate(-1)
  };

  return (
    <div>
        {isLoading ? (<SpinnerLoginBusiness/>) : (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-stone-300">
      <div className="w-96 h-[26rem] bg-sky-950 rounded-tl-[80px] rounded-tr-[80px] rounded-bl-[80px]  flex flex-col items-center justify-center relative">
        <form onSubmit={handlerLoginSubmit}>
          <h1 className="text-white text-xl font-semibold font-['Inter'] capitalize text-center">
            Bienvenido
          </h1>
          <div className="flex flex-col items-center justify-center my-10">
            <input
              placeholder="Nombre Empresa"
              className="w-64 h-6 bg-white rounded-[30px] shadow-inner p-4 text-sm text-sky-950"
              id="businessName"
              type="text"
              value={input.businessName}
              name="businessName"
              onChange={handlerInputChange}
            />
            <div className="relative w-64 mt-4">
             <input
                placeholder="Contraseña"
                className="w-64 h-6 bg-white rounded-[30px] shadow-inner mt-4 p-4 text-sm text-sky-950"
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
      )}
    </div>
  );
};

export default BusinessLogin;
