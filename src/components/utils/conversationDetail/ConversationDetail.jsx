import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MsgRecived from "./MsgRecived";
import MsgSent from "./MsgSent";
import ClouseConversationButton from "../buttons/ClouseConversationButton";
import { timestampToISO } from "../timeStampToISO";
import { sortedMessagesByTime } from "../sortedMessages";
import Spinner from "../spinners/Spinner";

const ConversationDetail = ({ contact, path }) => {
  //console.log("conversation detail contact", contact);
  const [loading, setLoading] = useState(false);
  const msgReceiveds =
    contact && contact.MsgReceiveds && contact.MsgReceiveds.length
      ? contact.MsgReceiveds
      : [];
  const msgSents =
    contact && contact.MsgSents && contact.MsgSents.length
      ? contact.MsgSents
      : [];
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  // Auto scroll
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let timeoutId = null;
    if (!contact || !msgReceiveds || msgReceiveds.length === 0) {
      setLoading(true);
      timeoutId = setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 5000);
    } else {
      if (!msgSents || msgSents.length === 0) {
        setMessages([...msgReceiveds]);
      } else {
        setMessages([...msgReceiveds, ...msgSents]);
      }
    }
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      setLoading(false);
    };
  }, [contact]);

  // if (!contact) {
  //   return null;
  // }
  // //termina el auto scroll

  // const concatMessages = [...contact.MsgReceiveds, ...contact.MsgSents];

  // const sortedMessages = sortedMessagesByTime(concatMessages, "firstFirst");
  const sortedMessages = sortedMessagesByTime(messages, "firstFirst");

  // const formattedMessages = concatMessages.map((message) => {
  //   return {
  //     ...message,
  //     timestamp: timestampToISO(message.timestamp),
  //   };
  // });

  // const sortedMessages = formattedMessages.sort((a, b) =>
  //   a.timestamp.localeCompare(b.timestamp)
  // );
  // console.log("mensajes ordenados", sortedMessages);

  return (
    <div className="w-full h-full relative flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="fixed top-36 right-14 mt-2">
        <ClouseConversationButton path={path} />
      </div>
      <div className="flex-grow mt-6">
        {loading ? (
          <Spinner />
        ) : (
          sortedMessages &&
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
          )
        )}
      </div>
      {/* referencia para auto scroll */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationDetail;
