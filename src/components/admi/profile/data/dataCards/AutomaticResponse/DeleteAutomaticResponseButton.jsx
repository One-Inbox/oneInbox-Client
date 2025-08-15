import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  sweetAlertsSuccessfully,
  sweetAlertsError,
} from "../../../../../utils/alerts/alerts";
import {
  updateAutomaticResponseAction,
  getAllSocialMediaByBusinessAction,
} from "../../../../../../redux/actions/actionSocialMedia";
import Spinner from "../../../../../utils/spinners/Spinner";

const DeleteAutomaticResponseButton = ({ socialMediaActiveIds, days }) => {
  const dispatch = useDispatch();
  const business = useSelector((state) => state.business);
  const businessId = business.id || sessionStorage.getItem("businessId");
  const [loading, setLoading] = useState(false);

  const handlerOnClick = async () => {
    setLoading(true);
    if (
      !socialMediaActiveIds ||
      !days ||
      days.length === 0 ||
      socialMediaActiveIds.length === 0
    ) {
      throw new Error("Faltan datos para eliminar la respuesta automática");
    }

    try {
      console.log(
        "elimino respuesta automatica para:",
        socialMediaActiveIds,
        "en los dias:",
        days
      );
      const data = await days.map((day) => ({
        day: Number(day),
        startHour: "",
        endHour: "",
        message: "",
      }));
      for (const sm of socialMediaActiveIds) {
        console.log("borro respuesta automatica para:", sm, data);
        await dispatch(updateAutomaticResponseAction(sm, data));
      }
      await dispatch(getAllSocialMediaByBusinessAction(businessId));
      sweetAlertsSuccessfully(
        "Exito",
        "Respuesta automática eliminada correctamente",
        "Ok"
      );
    } catch (error) {
      sweetAlertsError("Error", `${error.message}. Intente nuevamente`, "Ok");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <img
        src={"/managmentIcons/trash-icon.svg"}
        alt="delete"
        className="w-8 h-auto"
        onClick={handlerOnClick}
      />
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay/Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>

          {/* Modal Content */}
          <div className="relative bg-white p-8 rounded-lg shadow-lg z-10">
            <Spinner text="Eliminando respuesta automática..." />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAutomaticResponseButton;
