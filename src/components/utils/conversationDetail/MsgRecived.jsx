import React from "react";
import FormattedTimestamp from "../FormatedTimeStamp";
import SocialMediaIcons from "../icons/socialMediaIcons";

const MsgRecived = ({ props, contact }) => {
  const socialMediaName = contact.SocialMedium.name.toUpperCase();

  return (
    <div className="w-[26rem] h-auto bg-neutral-200 rounded-tl-[40px] rounded-tr-[40px] rounded-bl-[40px] p-4 flex flex-col justify-between self-start ml-12 mt-4">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-[33.50px] shadow-xl mr-4">
          <SocialMediaIcons socialMedia={socialMediaName} />
        </div>
        <h2 className="text-black text-base font-normal font-['Oswald'] capitalize">
          {props.name}
        </h2>
      </div>
      <div className="text-center mb-4">
        <h2 className="w-[26rem] h-auto text-black text-sm font-normal font-['Inter']">
          {props.text}
        </h2>
      </div>
      <div className="flex justify-end">
        <div className="w-[4.25rem] h-4 text-black text-[0.65rem] font-normal font-['Oswald'] capitalize mb-4">
          <FormattedTimestamp timestamp={props.timestamp} />
        </div>
      </div>
    </div>
  );
};

export default MsgRecived;
