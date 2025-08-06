import React from "react";
import { useDispatch } from "react-redux";
import {
  sweetAlertsError,
  sweetAlertsSuccessfully,
  sweetAlertsMessage,
} from "../../utils/alerts/alerts";
import {
  getAllUsersAction,
  updateUserAction,
} from "../../../redux/actions/actionsUsers";

const DeleteUserButton = ({ user }) => {
  console.log("user en delete", user);

  const dispatch = useDispatch();

  const handlerOnClick = async () => {
    if (user.active === false) {
      sweetAlertsMessage(
        "Usuario inactivo",
        `El usuario ${user.name} ya ha sido dado de baja previamente`,
        "Ok"
      );
      return;
    }
    try {
      await dispatch(
        updateUserAction(user.id, {
          ...user,
          active: false,
          dischargeDate: new Date().toISOString(),
        })
      );
      sweetAlertsSuccessfully(
        `Felicitaciones!`,
        `El usuario ${user.name} ha sido dado de baja con éxito`,
        "Ok"
      );
      await dispatch(getAllUsersAction());
    } catch (error) {
      sweetAlertsError(
        "Intenta de nuevo...",
        `No pudimos dar de baja usuario ${user.name}`,
        "Ok"
      );
    }
  };

  return (
    <div>
      <img
        src={"/managmentIcons/trash-icon.svg"}
        alt="delete user"
        className={user.active ? "w-8 h-auto" : "w-8 h-auto opacity-40"}
        onClick={handlerOnClick}
      />
    </div>
  );
};

export default DeleteUserButton;
