import React from "react";
import SideBarA from "../../components/admi/SideBarA";
import MenuMetrics from "../../components/admi/metrics/MenuMetrics";
import Metrics from "../../components/admi/metrics/Metrics";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBusinessByIdAction } from "../../redux/actions/actionBusiness";
import {
  getUserByIdAction,
  getAllUsersAction,
} from "../../redux/actions/actionsUsers";
import { getAllContactsByBusinessIdAction } from "../../redux/actions/actionContact";
import { getAllSocialMediaByBusinessAction } from "../../redux/actions/actionSocialMedia";
import { getAllMessagesReceivedAction } from "../../redux/actions/actionMessages";

const MetricsAnalysis = () => {
  const dispatch = useDispatch();
  const businessRedux = useSelector((state) => state.business.id);
  const businessId = businessRedux || sessionStorage.getItem("businessId");
  const userRedux = useSelector((state) => state.user.id);
  const userId = userRedux || sessionStorage.getItem("userId");

  useEffect(() => {
    if (businessId) {
      dispatch(getBusinessByIdAction(businessId));
      dispatch(getAllContactsByBusinessIdAction(businessId));
      dispatch(getAllSocialMediaByBusinessAction(businessId));
      dispatch(getAllUsersAction());
      dispatch(getAllMessagesReceivedAction());
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
        <MenuMetrics />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Metrics />
      </div>
    </div>
  );
};
export default MetricsAnalysis;
