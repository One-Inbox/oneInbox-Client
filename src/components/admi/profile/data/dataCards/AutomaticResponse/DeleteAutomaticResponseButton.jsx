import React from "react";
import { useDispatch } from "react-redux";

const DeleteAutomaticResponseButton = ({ socialMediaActiveIds }) => {
  const dispatch = useDispatch();

  const handlerOnClick = async () => {
    console.log("elimino respuesta automatica para:", socialMediaActiveIds);

    // if (user.active === false) {
    //   sweetAlertsMessage(
    //     "Usuario inactivo",
    //     `El usuario ${user.name} ya ha sido dado de baja previamente`,
    //     "Ok"
    //   );
    //   return;
    // }
    // try {
    //   await dispatch(
    //     updateUserAction(user.id, {
    //       ...user,
    //       active: false,
    //       dischargeDate: new Date().toISOString(),
    //     })
    //   );
    //   sweetAlertsSuccessfully(
    //     `Felicitaciones!`,
    //     `El usuario ${user.name} ha sido dado de baja con éxito`,
    //     "Ok"
    //   );
    //   await dispatch(getAllUsersAction());
    // } catch (error) {
    //   sweetAlertsError(
    //     "Intenta de nuevo...",
    //     `No pudimos dar de baja usuario ${user.name}`,
    //     "Ok"
    //   );
    // }
  };

  return (
    <div>
      <img
        src={"/managmentIcons/trash-icon.svg"}
        alt="delete"
        className="w-4 h-auto"
        onClick={handlerOnClick}
      />
    </div>
  );
};

export default DeleteAutomaticResponseButton;
