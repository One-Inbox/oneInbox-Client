import React from "react";
import { useSelector } from "react-redux";

const FilterText = () => {
  const socialMedia = useSelector((state) => state.socialMediaFilter);
  const socialMediaFilter =
    socialMedia === "Messenger" ? "Facebook" : socialMedia;
  const stateFilter = useSelector((state) => state.stateFilter);

  return (
    <div>
      {socialMediaFilter === "TODOS" && stateFilter !== "TODOS" ? (
        <span className="text-black text-sm font-normal font-['Oswald']">
          No hay mensajes {stateFilter.toUpperCase()} en su <br /> OneInbox
        </span>
      ) : socialMediaFilter !== "TODOS" && stateFilter === "TODOS" ? (
        <span className="text-black text-sm font-normal font-['Oswald']">
          No hay mensajes de {socialMediaFilter.toUpperCase()} en su <br />{" "}
          OneInbox
        </span>
      ) : socialMediaFilter !== "TODOS" && stateFilter !== "TODOS" ? (
        <span className="text-black text-sm font-normal font-['Oswald']">
          No hay mensajes {stateFilter.toUpperCase()} de <br />
          {socialMediaFilter.toUpperCase()} en su <br /> OneInbox
        </span>
      ) : (
        <span className="text-black text-sm font-normal font-['Oswald']">
          No hay mensajes en su OneInbox
        </span>
      )}
    </div>
  );
};

export default FilterText;
