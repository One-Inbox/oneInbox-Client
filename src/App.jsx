import { useEffect } from "react";
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
  MetricsAnalysis,
  MercadoLibreAuth
} from "./layouts";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ProtectRoutes } from "./components/login/ProtectedRoutes";
import { connectSocket, disconnectSocket } from "./redux/actions/actionSocket";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Conectar el socket cuando el componente se monta
    dispatch(connectSocket());
    return () => {
      // Desconectar el socket cuando el componente se desmonta
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  return (
    <div>
      {location.pathname === "/" || 
      location.pathname === "/login" ||
      location.pathname === "/loginAdmi" ||
      location.pathname === "/dashboardAdmi/profile/edit" ||
      location.pathname === "/dashboardAdmi/profile/edit-business" ||
      location.pathname === "/dashboardAdmi/profile/edit-socialMedia" ||  location.pathname.includes("/MeLi_auth")? null : (
        <div>
          <NavBar />
        </div>
      )}

      {/* RUTAS  PROTEGIDAS  */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<BusinessLogin />} />
        <Route path="/MeLi_auth" element={<MercadoLibreAuth />} />
        <Route element={<ProtectRoutes type={"business"}/>}>
          <Route path="/inbox" element={<InboxUser />} />
          <Route path="/loginAdmi" element={<LoginAdmi />} />
          <Route element={<ProtectRoutes type={"admi"} />}>
            <Route path="/dashboardAdmi/homeAdmi" element={<HomeAdmi />} />
            <Route path="/dashboardAdmi/profile" element={<Profile />} />
            <Route path="/dashboardAdmi/profile/edit" element={<EditProfile />} />
            <Route path="/dashboardAdmi/profile/edit-business" element={<EditBusiness />}/>
            <Route path="/dashboardAdmi/profile/edit-socialMedia" element={<EditSocialMedia />}/>
            <Route path="/dashboardAdmi/inboxAdmi" element={<InboxAdmi />} />
            <Route path="/inboxDetailAdmi/:contactId" element={<InboxDetailAdmi />}/>
            <Route path="/dashboardAdmi/usersManagement" element={<UsersManagement />}/>
            <Route path="/dashboardAdmi/metrics" element={<MetricsAnalysis />} />
          </Route>
        </Route>
      </Routes>

{/* RUTAS SIN PROTEGER */}
      {/* <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<BusinessLogin />} />
        <Route path="/MeLi_auth" element={<MercadoLibreAuth />} />
        <Route path="/inbox" element={<InboxUser />} />
        <Route path="/loginAdmi" element={<LoginAdmi />} />
        <Route path="/dashboardAdmi/homeAdmi" element={<HomeAdmi />} />
        <Route path="/dashboardAdmi/profile" element={<Profile />} />
        <Route path="/dashboardAdmi/profile/edit" element={<EditProfile />} />
        <Route path="/dashboardAdmi/profile/edit-business" element={<EditBusiness />}/>
        <Route path="/dashboardAdmi/profile/edit-socialMedia" element={<EditSocialMedia />}/>
        <Route path="/dashboardAdmi/inboxAdmi" element={<InboxAdmi />} />
        <Route path="/inboxDetailAdmi/:detailId" element={<InboxDetailAdmi />}/>
        <Route path="/dashboardAdmi/usersManagement" element={<UsersManagement />}/>
        <Route path="/dashboardAdmi/metrics" element={<MetricsAnalysis />} />
      </Routes> */}
    </div>
  );
};

export default App;
