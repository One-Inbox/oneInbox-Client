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

import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { sweetAlertsError } from "../utils/alerts/alerts";

export const ProtectRoutes = ({ type }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null); // null = en validación true = autorizado, false = no autorizado

  useEffect(() => {
    const isBusinessLogged = sessionStorage.getItem("loginBusiness") === "true";
    const isAdmiLogged = sessionStorage.getItem("loginAdmi") === "true";

    const checkAccess = async () => {
      if (type === "business" && !isBusinessLogged) {
        await sweetAlertsError(
          "Acceso denegado",
          "No tienes privilegios para acceder a esta ruta.",
          "Ok"
        );
        navigate("/");
        setIsAuthorized(false);
      } else if (type === "admi" && !isAdmiLogged) {
        await sweetAlertsError(
          "Acceso denegado",
          "No tienes privilegios para acceder a esta ruta.",
          "Ok"
        );
        navigate(isBusinessLogged ? "/inbox" : "/");
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    };
    checkAccess();
  }, [navigate, type]);

  if (isAuthorized === null) return null;
  return <Outlet />;
};
