import React from "react";

const DeleteUserButton = () => {
  const handlerOnClick = () => {
    console.log("click en delete user");
  };

  return (
    <div>
      <img
        src={"/managmentIcons/trash-icon.svg"}
        alt="delete user"
        className="w-8 h-auto"
        onClick={handlerOnClick}
      />
    </div>
  );
};

export default DeleteUserButton;
