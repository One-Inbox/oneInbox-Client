import React from "react";
import { useNavigate } from "react-router-dom";

const FormExitButton = (path) => {
  const navigate = useNavigate();

  const handlerOnClick = () => {
    //console.log("path", path);
    navigate(path.path);
  };

  return (
    <div>
      <img
        src={"/buttons/goBlack-hover-icon.svg"}
        className="w-6 h-auto"
        onClick={handlerOnClick}
        alt="Go back"
      />
    </div>
  );
};

export default FormExitButton;
