import React from "react";
import { useNavigate } from "react-router-dom";

const AddUserButton = () => {
  const navigate = useNavigate();
  const handlerOnClick = () => {
    navigate("/dashboardAdmi/usersManagement/addUser");
  };

  return (
    <div>
      <img
        src={"/managmentIcons/addUser-icon.svg"}
        alt="addUser"
        className="w-10 h-auto"
        onClick={handlerOnClick}
      />
    </div>
  );
};

export default AddUserButton;
