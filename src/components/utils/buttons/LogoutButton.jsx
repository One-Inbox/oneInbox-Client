import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { admiLoginAction } from "../../../redux/actions/actionsUsers";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admiLogoutHandler = () => {
    dispatch(admiLoginAction(false));
    sessionStorage.removeItem('Admi')
    sessionStorage.removeItem('SocialMedia')
    sessionStorage.removeItem('loginAdmi')
    navigate("/inbox");
  };

  return (
    <div>
      <button
        onClick={admiLogoutHandler}
        className="w-fit h-fit mr-10 px-8 py-1 bg-sky-950 hover:bg-amber-500 border-gray-700 rounded-[30px] shadow-inner text-white text-xs font-normal font-['Oswald']"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default LogoutButton;
