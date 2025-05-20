import React from "react";
import { useSelector } from "react-redux";

const MessagesCounter = () => {
  const messages = useSelector((state) => state.messagesReceived);
  const socialMediaFilter = useSelector((state) => state.socialMediaFilter);
  const stateFilter = useSelector((state) => state.stateFilter);
  const inputContact = useSelector((state) => state.inputContact);

  const counter = messages ? messages.length : 0;

  return (
    <div>
      {messages &&
      inputContact === "" &&
      socialMediaFilter === "TODOS" &&
      stateFilter !== "TODOS" ? (
        <span className="text-black text-xs font-normal font-['Oswald'] uppercase">
          Ud tiene {counter} mensajes {stateFilter}
        </span>
      ) : messages &&
        inputContact === "" &&
        socialMediaFilter !== "TODOS" &&
        stateFilter === "TODOS" ? (
        <span className="text-black text-xs font-normal font-['Oswald'] uppercase">
          Ud tiene {counter} mensajes en {socialMediaFilter}
        </span>
      ) : messages &&
        inputContact === "" &&
        socialMediaFilter !== "TODOS" &&
        stateFilter !== "TODOS" ? (
        <span className="text-black text-xs font-normal font-['Oswald'] uppercase">
          Ud tiene {counter} mensajes {stateFilter} en {socialMediaFilter}
        </span>
      ) : messages &&
        inputContact !== "" &&
        socialMediaFilter === "TODOS" &&
        stateFilter === "TODOS" ? (
        <span className="text-black text-xs font-normal font-['Oswald'] uppercase">
          Ud tiene {counter} mensajes de {inputContact}
        </span>
      ) : messages &&
        inputContact !== "" &&
        socialMediaFilter !== "TODOS" &&
        stateFilter === "TODOS" ? (
        <span className="text-black text-xs font-normal font-['Oswald'] uppercase">
          Ud tiene {counter} mensajes de {inputContact} en {socialMediaFilter}
        </span>
      ) : messages &&
        inputContact !== "" &&
        socialMediaFilter === "TODOS" &&
        stateFilter !== "TODOS" ? (
        <span className="text-black text-xs font-normal font-['Oswald'] uppercase">
          Ud tiene {counter} mensajes {stateFilter} de {inputContact}
        </span>
      ) : messages &&
        inputContact !== "" &&
        socialMediaFilter !== "TODOS" &&
        stateFilter !== "TODOS" ? (
        <span className="text-black text-xs font-normal font-['Oswald'] uppercase">
          Ud tiene {counter} mensajes {stateFilter} de {inputContact} en{" "}
          {socialMediaFilter}
        </span>
      ) : (
        <span className="text-black text-xs font-normal font-['Oswald'] uppercase">
          Ud tiene {counter} mensajes en total
        </span>
      )}
    </div>
  );
};

export default MessagesCounter;
