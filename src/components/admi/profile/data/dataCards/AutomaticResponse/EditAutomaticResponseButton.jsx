import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//import { getUserByAdmiAction } from "../../../redux/actions/actionsUsers";

const EditAtomaticResponseButton = ({ socialMediaActiveIds }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlerOnClick = async () => {
    console.log("edito respuesta automatica para: ", socialMediaActiveIds);
  };

  return (
    <div>
      <img
        src={"/managmentIcons/edit-icon.svg"}
        alt="edit"
        className="w-4 h-auto"
        onClick={handlerOnClick}
      />
    </div>
  );
};

export default EditAtomaticResponseButton;
