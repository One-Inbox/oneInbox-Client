// import React, { useEffect } from "react";
// import { useNavigate, Outlet } from "react-router-dom";
// import { sweetAlertsError } from "../utils/alerts/alerts";
// //import { useSelector } from "react-redux";

// export const ProtectRoutes = ({ isAllowed, route }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAllowed) {
//       navigate(route); // Redirige al login si no está autorizado
//       sweetAlertsError(
//         `Ud no tiene privilegios`,
//         "la ruta elegida esta protegida",
//         "Ok"
//       );
//     }
//   }, [isAllowed, navigate]);

//   return <Outlet />;
// };

import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { sweetAlertsError } from "../utils/alerts/alerts";

export const ProtectRoutes = ({ type }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isBusinessLogged = sessionStorage.getItem("loginBusiness") === "true";
    const isAdmiLogged = sessionStorage.getItem("loginAdmi") === "true";
  
    //console.log("isBusinessLogged:", isBusinessLogged);
   // console.log("isAdmiLogged:", isAdmiLogged);
  
    if (type === "business" && !isBusinessLogged) {
      navigate("/"); 
      sweetAlertsError(
        "Acceso denegado",
        "No tienes privilegios para acceder a esta ruta.",
        "Ok"
      );
    } else if (type === "admi" && !isAdmiLogged) {
      navigate(isBusinessLogged ? "/inbox" : "/"); 
      sweetAlertsError(
        "Acceso denegado",
        "No tienes privilegios para acceder a esta ruta.",
        "Ok"
      );
    }
  }, [navigate, type])

  return <Outlet />;
};
