import React from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton = (path) => {
  const navigate = useNavigate();

  const handlerOnClick = () => {
    //console.log("path", path);
    navigate(path.path);
  };

  return (
    <div>
      <img
        src={"/buttons/goBack-icon.svg"}
        className="w-6 h-auto"
        onClick={handlerOnClick}
        onMouseOver={(e) =>
          (e.currentTarget.src = "/buttons/goBlack-hover-icon.svg")
        }
        onMouseOut={(e) => (e.currentTarget.src = "/buttons/goBack-icon.svg")}
        alt="Go back"
      />
    </div>
  );
};

export default GoBackButton;
