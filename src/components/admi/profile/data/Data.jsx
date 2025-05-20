import React from "react";
import ProfileData from "./dataCards/ProfileData";
import BusinessData from "./dataCards/BusinessData";
import SocialMediaData from "./dataCards/SocialMediaData";
import GoBackButton from "../../../utils/buttons/GoBackButton";

const Data = () => {
  return (
    <div className="relative flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="mt-1">
        <div className="fixed top-16 right-10 mt-2">
          <GoBackButton path={"/dashboardAdmi/homeAdmi"} />
        </div>
        <ProfileData />
        <BusinessData />
        <SocialMediaData />
      </div>
    </div>
  );
};

export default Data;
