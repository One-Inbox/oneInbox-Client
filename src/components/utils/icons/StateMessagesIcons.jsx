import React from "react";
// este archivo de deberia oder usar para asignar iconos de redes sociales a los mensajes
const StateMessagesIcons = ({ state }) => {
  //falta desestructurar props segun modelo y pasar ese dato a UpperCase
  return (
    <div className="w-8 h-8">
      {state === "No Leidos" ? (
        <img src="/states\noLeido.svg" />
      ) : state === "Leidos" ? (
        <img src="/states/leido.svg" />
      ) : state === "Respondidos" ? (
        <img src="/states/respondido.svg" />
      ) : state === "Archivados" ? (
        <img src="/states/archivados.svg" />
      ) : (
        <img src="/iconoLogoBlanco.svg" />
      )}
    </div>
  );
};

export default StateMessagesIcons;
