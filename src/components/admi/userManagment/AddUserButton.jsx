import React from "react";

const AddUserButton = () => {
  const handlerOnClick = () => {
    console.log("click en add user");
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
