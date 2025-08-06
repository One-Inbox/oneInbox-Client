import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { updateBusnisessAction } from "../../../../redux/actions/actionBusiness";
import {
  sweetAlertsError,
  sweetAlertsSuccessfully,
  sweetAlertsMessage,
} from "../../utils/alerts/alerts";
import FormExitButton from "../../utils/buttons/FormExitButton";
import IconUserProfile from "../profile/IconUserProfile";
import {
  getAllUsersAction,
  updateUserAction,
} from "../../../redux/actions/actionsUsers";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const business = useSelector((state) => state.business);
  const businessId = business.id || sessionStorage.getItem("businessId");
  const user = useSelector((state) => state.userByAdmi);

  const [input, setInput] = useState({
    name: user ? user.name : "",
    password: user ? user.password : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    privilege: user ? user.privilege : "",
    image: user ? user.image : null,
    businessId: user ? user.BusinessId : businessId,
    admissionDate: user ? user.admissionDate : null,
    dischargeDate: user ? user.dischargeDate : null,
    active: user ? user.active : true,
  });

  const handlerInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    // Validar que si el usuario está activo, no se pueda editar la dischargeDate
    if (user.active && input.dischargeDate) {
      sweetAlertsMessage(
        "Acción no permitida",
        "No puedes asignar una fecha de baja a un usuario activo.",
        "Ok"
      );
      return;
    }
    try {
      await dispatch(updateUserAction(user.id, input));
      sweetAlertsSuccessfully(
        `Felicitaciones!`,
        `El usuario ${input.name} ha sido editado con éxito`,
        "Ok"
      );
      await dispatch(getAllUsersAction());
      navigate("/dashboardAdmi/usersManagement");
    } catch (error) {
      sweetAlertsError(
        "Intenta de nuevo...",
        `No pudimos editar el usuario ${input.name}`,
        "Ok"
      );
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-stone-300">
      <div className="w-[48.5rem] h-auto bg-sky-950 rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] relative">
        <form onSubmit={handlerSubmit}>
          <div className="absolute top-6 right-10">
            <FormExitButton path={"/dashboardAdmi/usersManagement"} />
          </div>
          <div className="flex flex-col items-center pt-6 mt-6">
            <h4 className=" text-white text-xs font-normal font-['Oswald'] uppercase">
              editar usuario
            </h4>
            <input
              placeholder={input.name}
              className="w-56 h-5 bg-white rounded-[30px] shadow-inner px-6 text-base font-normal font-['Oswald'] uppercase"
              id="name"
              type="text"
              value={input.name}
              name="name"
              onChange={handlerInputChange}
            />
          </div>
          <div className="flex flex-row justify-between px-12 mt-6 mb-6">
            <div className="flex flex-col">
              <div className="flex flex-row mt-2">
                <label
                  htmlFor="admissionDate"
                  className=" text-white text-sm font-normal font-['Oswald'] uppercase "
                >
                  Fecha Alta:
                </label>
                <input
                  className="w-52 h-5 bg-white rounded-[30px] shadow-inner px-2 text-sm font-normal font-['Inter'] ml-2 "
                  id="admissionDate"
                  type="date"
                  value={
                    input.admissionDate ? input.admissionDate.slice(0, 10) : ""
                  }
                  name="admissionDate"
                  onChange={handlerInputChange}
                />
              </div>
              <div className="flex flex-row mt-3">
                <fieldset className="flex flex-row">
                  <legend className=" text-white text-sm font-normal font-['Oswald'] uppercase">
                    PRIVILEGIOS:
                  </legend>
                  <div className=" flex flex-col">
                    <div className="flex flex-row">
                      <input
                        className="w-4 h-4 accent-amber-400 px-2"
                        id="Admin"
                        type="radio"
                        value="Admin"
                        name="privilege"
                        onChange={handlerInputChange}
                        checked={input.privilege === "Admin"}
                      />
                      <label
                        htmlFor="Admin"
                        className=" text-white text-sm font-normal font-['Inter'] px-2 "
                      >
                        administrador
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <input
                      className="ml-10 w-4 h-4 accent-amber-400"
                      id="Member"
                      type="radio"
                      value="Member"
                      name="privilege"
                      onChange={handlerInputChange}
                      checked={input.privilege === "Member"}
                    />
                    <label
                      htmlFor="Member"
                      className=" text-white text-sm font-normal font-['Inter'] px-2"
                    >
                      usuario
                    </label>
                  </div>
                </fieldset>
              </div>
              <div className="flex flex-row mt-6">
                <label
                  htmlFor="email"
                  className=" text-white text-sm font-normal font-['Oswald'] uppercase "
                >
                  E-mail:
                </label>
                <input
                  placeholder={input.email}
                  className="w-52 h-5 bg-white rounded-[30px] shadow-inner px-2 text-sm font-normal font-['Inter'] ml-2 "
                  id="email"
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={handlerInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col px-12 mt-2">
              <div className="flex flex-row">
                <label
                  htmlFor="dischargeDate"
                  className=" text-white text-sm font-normal font-['Oswald'] uppercase "
                >
                  Fecha Baja:
                </label>
                {user.active ? (
                  <input
                    placeholder="usuario activo"
                    className="w-52 h-5 bg-white rounded-[30px] shadow-inner px-2 text-sm font-normal font-['Inter'] ml-2 "
                    id="dischargeDate"
                    type="text"
                    value={input.dischargeDate}
                    name="dischargeDate"
                    onChange={handlerInputChange}
                  />
                ) : (
                  <input
                    className="w-52 h-5 bg-white rounded-[30px] shadow-inner px-2 text-sm font-normal font-['Inter'] ml-2 "
                    id="dischargeDate"
                    type="date"
                    value={
                      input.dischargeDate
                        ? input.dischargeDate.slice(0, 10)
                        : ""
                    }
                    name="dischargeDate"
                    onChange={handlerInputChange}
                  />
                )}
              </div>
              <div className="flex flex-row mt-6">
                <label
                  htmlFor="password"
                  className=" text-white text-sm font-normal font-['Oswald'] uppercase"
                >
                  password:
                </label>
                <input
                  placeholder={input.password}
                  className="w-52 h-5 bg-white rounded-[30px] shadow-inner px-2 text-sm font-normal font-['Inter'] ml-2 "
                  id="password"
                  type="text"
                  value={input.password}
                  name="password"
                  onChange={handlerInputChange}
                />
              </div>
              <div className="flex flex-row mt-8">
                <label
                  htmlFor="phone"
                  className=" text-white text-sm font-normal font-['Oswald'] uppercase"
                >
                  phone:
                </label>
                <input
                  placeholder={input.phone}
                  className="w-56 h-5 bg-white rounded-[30px] shadow-inner px-2 text-sm font-normal font-['Inter'] ml-2 "
                  id="phone"
                  type="text"
                  value={input.phone}
                  name="phone"
                  onChange={handlerInputChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-10">
            <button
              type="submit"
              className="bg-transparent border-none outline-none"
            >
              <img
                src={"/actionIcons/next icon.svg"}
                className="w-8 h-auto"
                onMouseOver={(e) =>
                  (e.currentTarget.src = "/actionIcons/next hover icon.svg")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.src = "/actionIcons/next icon.svg")
                }
                alt="next"
              />
            </button>
          </div>
        </form>
        <img
          src="/logos/logo.svg"
          className="w-20 h-auto absolute bottom-8 right-8"
        />
      </div>
    </div>
  );
};

export default EditUser;
