import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBusinessByIdAction } from "../../redux/actions/actionBusiness";
import {
  getUserByIdAction,
  getAllUsersAction,
} from "../../redux/actions/actionsUsers";
import SideBarA from "../../components/admi/SideBarA";
import MenuUserManagment from "../../components/admi/userManagment/MenuUserManagment";
import UsersTable from "../../components/admi/userManagment/UsersTable";

const UserManagment = () => {
  const dispatch = useDispatch();
  const businessRedux = useSelector((state) => state.business.id);
  const businessId = businessRedux || sessionStorage.getItem("businessId");
  const userRedux = useSelector((state) => state.user.id);
  const userId = userRedux || sessionStorage.getItem("userId");

  useEffect(() => {
    if (businessId) {
      dispatch(getBusinessByIdAction(businessId));
      dispatch(getAllUsersAction());
      if (userId) {
        dispatch(getUserByIdAction(userId));
      }
    }
  }, [dispatch, businessId, userId]);

  const user = useSelector((state) => state.user);

  return (
    <div className="w-screen h-screen-minus-navbar flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-48 flex-shrink-0">
        <SideBarA user={user} />
      </div>

      {/* Contenedor del menú y tabla */}
      <div className="flex flex-row flex-grow overflow-hidden">
        {/* Menu fijo */}
        <div className="w-56 flex-shrink-0 bg-white shadow-md h-full relative z-20">
          <MenuUserManagment />
        </div>

        {/* Tabla que ocupa el resto del espacio */}
        <div className="flex-grow overflow-auto">
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default UserManagment;
