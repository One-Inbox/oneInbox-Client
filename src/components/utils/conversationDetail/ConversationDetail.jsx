import { useEffect, useRef, useState } from "react";
import MsgRecived from "./MsgRecived";
import MsgSent from "./MsgSent";
import ClouseConversationButton from "../buttons/ClouseConversationButton";
import { timestampToISO } from "../timeStampToISO";

const ConversationDetail = ({ contact, path }) => {
  // console.log("conversation detail contact", contact);

  const [messages, setMessages] = useState([
    ...contact.MsgReceiveds,
    ...contact.MsgSents,
  ]);

  // Auto scroll
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!contact) {
    return null;
  }
  //termina el auto scroll

  const concatMessages = [...contact.MsgReceiveds, ...contact.MsgSents];

  const formattedMessages = concatMessages.map((message) => {
    return {
      ...message,
      timestamp: timestampToISO(message.timestamp),
    };
  });

  const sortedMessages = formattedMessages.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );
  //console.log("mensajes ordenados", sortedMessages);

  return (
    <div className="w-full h-full relative flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="fixed top-24 right-10 mt-2">
        <ClouseConversationButton path={path}/>
      </div>
      <div className="flex-grow">
        {sortedMessages &&
          sortedMessages.map((message) =>
            message.received ? (
              <div key={message.id}>
                <MsgRecived props={message} contact={contact} />
              </div>
            ) : (
              <div key={message.id}>
                <MsgSent props={message} />
              </div>
            )
          )}
      </div>
      {/* referencia para auto scroll */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationDetail;
