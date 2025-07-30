import React from "react";

const StateMessagesIcons = ({ id, state, archived = false }) => {
  let iconPath = "/iconoLogoBlanco.svg";

  if (archived) {
    iconPath = "/states/archivados.svg";
  } else if (state === "No Leidos") {
    iconPath = "/states/noLeido.svg";
  } else if (state === "Leidos") {
    iconPath = "/states/leido.svg";
  } else if (state === "Respondidos") {
    iconPath = "/states/respondido.svg";
  }

  return (
    <div className="w-8 h-8">
      <img
        key={id + state + (archived ? "-arch" : "")} // forzar reemplazo si cambia
        src={iconPath}
        alt={`Estado: ${state}`}
        onError={(e) => {
          e.currentTarget.src = "/iconoLogoBlanco.svg"; // fallback si falla carga
        }}
      />
    </div>
  );
};

export default StateMessagesIcons;
