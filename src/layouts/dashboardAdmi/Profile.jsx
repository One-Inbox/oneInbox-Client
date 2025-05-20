import React from "react";
import SideBarA from "../../components/admi/SideBarA";
import MenuProfile from "../../components/admi/profile/MenuProfile";
import Data from "../../components/admi/profile/data/Data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBusinessByIdAction } from "../../redux/actions/actionBusiness";
import { getUserByIdAction } from "../../redux/actions/actionsUsers";

const Profile = () => {
  const dispatch = useDispatch();
  const businessRedux = useSelector((state) => state.business.id);
  const businessId = businessRedux || sessionStorage.getItem("businessId");
  const userRedux = useSelector((state) => state.user.id);
  const userId = userRedux || sessionStorage.getItem("Admi");
 

  useEffect(() => {
    if (businessId) {
      dispatch(getBusinessByIdAction(businessId));
      if (userId) {
        dispatch(getUserByIdAction(userId));
      }
    }
  }, [dispatch, businessId, userId]);

  const user = useSelector((state) => state.user);

  return (
    <div className="w-screen h-screen-minus-navbar flex overflow-hidden">
      <div className="w-48 flex-shrink-0">
        <SideBarA user={user} />
      </div>
      <div className="flex flex-col">
        <MenuProfile />
      </div>
      <div className="flex flex-1 items-center justify-center overflow-y-auto overflow-x-hidden">
        <Data />
      </div>
    </div>
  );
};

export default Profile;
