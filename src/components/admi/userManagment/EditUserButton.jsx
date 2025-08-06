import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserByAdmiAction } from "../../../redux/actions/actionsUsers";

const EditUserButton = ({ userId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlerOnClick = async () => {
    await dispatch(getUserByAdmiAction(userId));
    navigate(`/dashboardAdmi/usersManagement/edit/${userId}`);
  };

  return (
    <div>
      <img
        src={"/managmentIcons/edit-icon.svg"}
        alt="edit user"
        className="w-8 h-auto"
        onClick={handlerOnClick}
      />
    </div>
  );
};

export default EditUserButton;
