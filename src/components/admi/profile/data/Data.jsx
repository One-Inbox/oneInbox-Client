import React from "react";
import ProfileData from "./dataCards/ProfileData";
import BusinessData from "./dataCards/BusinessData";
import SocialMediaData from "./dataCards/SocialMediaData";
import AutomaticMessagesData from "./dataCards/AutomaticResponse/AutomaticMessagesData";
import GoBackButton from "../../../utils/buttons/GoBackButton";

const Data = () => {
  return (
    <div className="relative flex flex-col ">
      <div className="fixed top-16 right-10 mt-2 z-50">
        <GoBackButton path={"/dashboardAdmi/homeAdmi"} />
      </div>
      <div className="mt-6 overflow-y-auto overflow-x-hidden">
        <ProfileData />
        <BusinessData />
        <SocialMediaData />
        <AutomaticMessagesData />
      </div>
    </div>
  );
};

export default Data;
