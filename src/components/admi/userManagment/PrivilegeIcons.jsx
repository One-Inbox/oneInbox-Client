import React from "react";

const PrivilegeIcons = ({ privilege }) => {
  return (
    <div className="w-8 h-auto">
      {privilege && privilege === "Admin" ? (
        <img src={"/managmentIcons/admin-icon.svg"} alt="administrador" />
      ) : privilege && privilege === "Member" ? (
        <img src={"/managmentIcons/user-icon.svg"} alt="usuario" />
      ) : (
        <img src={"/logos/iconoLogoBlanco.svg"} alt="sin datos" />
      )}
    </div>
  );
};

export default PrivilegeIcons;
