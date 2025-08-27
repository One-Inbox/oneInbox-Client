// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import "./App.css";
// import {
//   BusinessLogin,
//   LandingPage,
//   NavBar,
//   InboxUser,
//   LoginAdmi,
//   HomeAdmi,
//   Profile,
//   EditProfile,
//   EditBusiness,
//   EditSocialMedia,
//   InboxAdmi,
//   InboxDetailAdmi,
//   UsersManagement,
//   AddUser,
//   EditUser,
//   MetricsAnalysis,
//   MercadoLibreAuth,
//   AddAutomaticResponse,
// } from "./layouts";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { ProtectRoutes } from "./components/login/ProtectedRoutes";
// import { connectSocket, disconnectSocket } from "./redux/actions/actionSocket";
// import { UseIsHydrated } from "./components/utils/UseIsHidrated";
// import Spinner from "./components/utils/spinners/Spinner";

// const App = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const isHydrated = UseIsHydrated();

//   // useEffect(() => {
//   //   Conectar el socket cuando el componente se monta
//   //   dispatch(connectSocket());
//   //   return () => {
//   //     Desconectar el socket cuando el componente se desmonta
//   //     dispatch(disconnectSocket());
//   //   };
//   // }, [dispatch]);
//   useEffect(() => {
//     if (!isHydrated) return;
//     console.log("🔌 App montada - conectando socket...");
//     dispatch(connectSocket()); // ✅ Ahora está bien, solo activa el middleware

//     const handleBeforeUnload = () => {
//       console.log("🔌 Cerrando aplicación - desconectando socket...");
//       dispatch(disconnectSocket());
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       console.log("🔌 App desmontada - desconectando socket...");
//       dispatch(disconnectSocket());
//     };
//   }, [dispatch, isHydrated]);

//   if (!isHydrated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <Spinner text={"cargando aplicación..."} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {location.pathname === "/" ||
//       location.pathname === "/login" ||
//       location.pathname === "/loginAdmi" ||
//       location.pathname === "/dashboardAdmi/profile/edit" ||
//       location.pathname === "/dashboardAdmi/profile/edit-business" ||
//       location.pathname === "/dashboardAdmi/profile/edit-socialMedia" ||
//       location.pathname === "/dashboardAdmi/profile/add-automaticResponse" ||
//       location.pathname === "/dashboardAdmi/usersManagement/addUser" ||
//       location.pathname.includes("/dashboardAdmi/usersManagement/edit/") ||
//       location.pathname.includes("/MeLi_auth") ? null : (
//         <div>
//           <NavBar />
//         </div>
//       )}

//       {/* RUTAS  PROTEGIDAS  */}
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<BusinessLogin />} />
//         <Route path="/MeLi_auth" element={<MercadoLibreAuth />} />
//         <Route element={<ProtectRoutes type={"business"} />}>
//           <Route path="/inbox" element={<InboxUser />} />
//           <Route path="/loginAdmi" element={<LoginAdmi />} />
//           <Route element={<ProtectRoutes type={"admi"} />}>
//             <Route path="/dashboardAdmi/homeAdmi" element={<HomeAdmi />} />
//             <Route path="/dashboardAdmi/profile" element={<Profile />} />
//             <Route
//               path="/dashboardAdmi/profile/edit"
//               element={<EditProfile />}
//             />
//             <Route
//               path="/dashboardAdmi/profile/edit-business"
//               element={<EditBusiness />}
//             />
//             <Route
//               path="/dashboardAdmi/profile/edit-socialMedia"
//               element={<EditSocialMedia />}
//             />
//             <Route
//               path="/dashboardAdmi/profile/add-automaticResponse"
//               element={<AddAutomaticResponse />}
//             />
//             <Route path="/dashboardAdmi/inboxAdmi" element={<InboxAdmi />} />
//             <Route
//               path="/dashboardAdmi/inboxAdmi/detail/:contactId"
//               element={<InboxDetailAdmi />}
//             />
//             <Route
//               path="/dashboardAdmi/usersManagement"
//               element={<UsersManagement />}
//             />
//             <Route
//               path="/dashboardAdmi/usersManagement/addUser"
//               element={<AddUser />}
//             />
//             <Route
//               path="/dashboardAdmi/usersManagement/edit/:userId"
//               element={<EditUser />}
//             />
//             <Route
//               path="/dashboardAdmi/metrics"
//               element={<MetricsAnalysis />}
//             />
//           </Route>
//         </Route>
//       </Routes>

//       {/* RUTAS SIN PROTEGER */}
//       {/* <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<BusinessLogin />} />
//         <Route path="/MeLi_auth" element={<MercadoLibreAuth />} />
//         <Route path="/inbox" element={<InboxUser />} />
//         <Route path="/loginAdmi" element={<LoginAdmi />} />
//         <Route path="/dashboardAdmi/homeAdmi" element={<HomeAdmi />} />
//         <Route path="/dashboardAdmi/profile" element={<Profile />} />
//         <Route path="/dashboardAdmi/profile/edit" element={<EditProfile />} />
//         <Route
//           path="/dashboardAdmi/profile/edit-business"
//           element={<EditBusiness />}
//         />
//         <Route
//           path="/dashboardAdmi/profile/edit-socialMedia"
//           element={<EditSocialMedia />}
//         />
//         <Route path="/dashboardAdmi/inboxAdmi" element={<InboxAdmi />} />
//         <Route
//           path="/dashboardAdmi/inboxAdmi/detail/:contactId"
//           element={<InboxDetailAdmi />}
//         />
//         <Route
//           path="/dashboardAdmi/usersManagement"
//           element={<UsersManagement />}
//         />
//         <Route path="/dashboardAdmi/metrics" element={<MetricsAnalysis />} />
//       </Routes> */}
//     </div>
//   );
// };

// export default App;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import {
  BusinessLogin,
  LandingPage,
  NavBar,
  InboxUser,
  LoginAdmi,
  HomeAdmi,
  Profile,
  EditProfile,
  EditBusiness,
  EditSocialMedia,
  InboxAdmi,
  InboxDetailAdmi,
  UsersManagement,
  AddUser,
  EditUser,
  MetricsAnalysis,
  MercadoLibreAuth,
  AddAutomaticResponse,
} from "./layouts";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ProtectRoutes } from "./components/login/ProtectedRoutes";
import { connectSocket, disconnectSocket } from "./redux/actions/actionSocket";
import { UseIsHydrated } from "./components/utils/UseIsHidrated";
import Spinner from "./components/utils/spinners/Spinner";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isHydrated = UseIsHydrated(); // Hook con Redux
  const [appReady, setAppReady] = useState(false);

  // Estado de Redux para verificar si afecta estilos
  const messagesReceived = useSelector((state) => state.messagesReceived || []);

  useEffect(() => {
    // Solo cuando esté hidratado, marca la app como lista
    if (isHydrated) {
      console.log("✅ App lista para renderizar");
      setAppReady(true);
    }
  }, [isHydrated]);

  useEffect(() => {
    // Solo ejecuta la lógica del socket después de que todo esté listo
    if (!appReady) return;

    console.log("🔌 App montada - conectando socket...");
    dispatch(connectSocket());

    const handleBeforeUnload = () => {
      console.log("🔌 Cerrando aplicación - desconectando socket...");
      dispatch(disconnectSocket());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      console.log("🔌 App desmontada - desconectando socket...");
      dispatch(disconnectSocket());
    };
  }, [dispatch, appReady]); // 🔥 Cambió dependencia a appReady

  // 🔥 Renderiza loading mientras no esté completamente listo
  if (!appReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <Spinner text={"cargando aplicacion..."} />
          <p className="mt-2 text-gray-500 text-sm">
            Mensajes: {messagesReceived.length} | Estado:{" "}
            {isHydrated ? "Hidratado" : "Hidratando"}
          </p>
        </div>
      </div>
    );
  }

  // 🔥 Tu aplicación normal una vez hidratada
  return (
    <div>
      {location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/loginAdmi" ||
      location.pathname === "/dashboardAdmi/profile/edit" ||
      location.pathname === "/dashboardAdmi/profile/edit-business" ||
      location.pathname === "/dashboardAdmi/profile/edit-socialMedia" ||
      location.pathname === "/dashboardAdmi/profile/add-automaticResponse" ||
      location.pathname === "/dashboardAdmi/usersManagement/addUser" ||
      location.pathname.includes("/dashboardAdmi/usersManagement/edit/") ||
      location.pathname.includes("/MeLi_auth") ? null : (
        <div>
          <NavBar />
        </div>
      )}

      {/* RUTAS PROTEGIDAS */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<BusinessLogin />} />
        <Route path="/MeLi_auth" element={<MercadoLibreAuth />} />
        <Route element={<ProtectRoutes type={"business"} />}>
          <Route path="/inbox" element={<InboxUser />} />
          <Route path="/loginAdmi" element={<LoginAdmi />} />
          <Route element={<ProtectRoutes type={"admi"} />}>
            <Route path="/dashboardAdmi/homeAdmi" element={<HomeAdmi />} />
            <Route path="/dashboardAdmi/profile" element={<Profile />} />
            <Route
              path="/dashboardAdmi/profile/edit"
              element={<EditProfile />}
            />
            <Route
              path="/dashboardAdmi/profile/edit-business"
              element={<EditBusiness />}
            />
            <Route
              path="/dashboardAdmi/profile/edit-socialMedia"
              element={<EditSocialMedia />}
            />
            <Route
              path="/dashboardAdmi/profile/add-automaticResponse"
              element={<AddAutomaticResponse />}
            />
            <Route path="/dashboardAdmi/inboxAdmi" element={<InboxAdmi />} />
            <Route
              path="/dashboardAdmi/inboxAdmi/detail/:contactId"
              element={<InboxDetailAdmi />}
            />
            <Route
              path="/dashboardAdmi/usersManagement"
              element={<UsersManagement />}
            />
            <Route
              path="/dashboardAdmi/usersManagement/addUser"
              element={<AddUser />}
            />
            <Route
              path="/dashboardAdmi/usersManagement/edit/:userId"
              element={<EditUser />}
            />
            <Route
              path="/dashboardAdmi/metrics"
              element={<MetricsAnalysis />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
