import React from "react";
import MenuButton from "../../utils/buttons/MenuButton";

const MenuProfile = () => {
  const path =
    "/dashboardAdmi/profile/edit" ||
    "/dashboardAdmi/profile/edit-business" ||
    "/dashboardAdmi/profile/edit-socialMedia";

  return (
    <div className="sticky w-56 h-screen overflow-y-auto overflow-x-hidden bg-green-400 flex flex-col items-center justify-center">
      <MenuButton
        route={"/dashboardAdmi/profile"}
        nameRoute={"Mis Datos"}
        path={"/dashboardAdmi/profile"}
      />
      <MenuButton
        route={"/dashboardAdmi/profile/edit"}
        nameRoute={"Editar"}
        path={path}
      />
    </div>
  );
};

export default MenuProfile;
