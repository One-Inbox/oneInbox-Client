import React from "react";

const EditUserButton = () => {
  const handlerOnClick = () => {
    console.log("click en edit user");
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
