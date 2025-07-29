import React from "react";
// este archivo de deberia oder usar para asignar iconos de redes sociales a los mensajes
// const StateMessagesIcons = ({ state, archived }) => {
//   //falta desestructurar props segun modelo y pasar ese dato a UpperCase
//   return (
//     <div className="w-8 h-8">
//       {archived ? (
//         <img src="/states/archivados.svg" />
//       ) : state === "No Leidos" ? (
//         <img src="/states/noLeido.svg" />
//       ) : state === "Leidos" ? (
//         <img src="/states/leido.svg" />
//       ) : state === "Respondidos" ? (
//         <img src="/states/respondido.svg" />
//       ) : (
//         <img src="/iconoLogoBlanco.svg" />
//       )}
//     </div>
//   );
// };

// export default StateMessagesIcons;

import React from "react";

const StateMessagesIcons = ({ state, archived }) => {
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
        key={state + (archived ? "-arch" : "")} // forzar reemplazo si cambia
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
