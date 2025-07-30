import InboxCardUser from "./InboxCardUser";
import { useSelector } from "react-redux";
import { useState, useEffect, useMemo, useRef } from "react";
import FilterText from "../../utils/filters/FilterText";
import Spinner from "../../utils/spinners/Spinner";
import timeStampToISO from "../../utils/timeStampToISO";

const InboxListUser = () => {
  const allMessagesReceived = useSelector((state) => state.messagesReceived);

  const [renderKey, setRenderKey] = useState(0);

  // 🔥 FORZAR RE-RENDER cuando cambien los mensajes
  useEffect(() => {
    setRenderKey((prev) => prev + 1);
  }, [allMessagesReceived.length]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (allMessagesReceived.length) {
      setLoading(false);
    } else {
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 10000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [allMessagesReceived.length]);

  const finalMessages = useMemo(() => {
    const notArchived = allMessagesReceived.filter(
      (msg) => msg.archived === false
    );

    const sorted = notArchived.slice().sort((a, b) => {
      const timeA = timeStampToISO(a.timestamp);
      const timeB = timeStampToISO(b.timestamp);
      return timeB.localeCompare(timeA);
    });

    const grouped = {};
    for (const msg of sorted) {
      const contactId = msg.ContactId;
      if (
        !grouped[contactId] ||
        timeStampToISO(msg.timestamp) >
          timeStampToISO(grouped[contactId].timestamp)
      ) {
        grouped[contactId] = msg;
      }
    }

    return Object.values(grouped);
  }, [allMessagesReceived, renderKey]);

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-green-400">
      {loading ? (
        <Spinner text={"loading..."} />
      ) : allMessagesReceived.length ? (
        finalMessages.map((message) => {
          const {
            id,
            name,
            timestamp,
            state,
            SocialMedium,
            ContactId,
            archived,
          } = message;
          return (
            <div key={`${ContactId}-${id}-${state}-${renderKey}`}>
              <InboxCardUser
                id={id}
                name={name}
                timestamp={timestamp}
                state={state}
                SocialMedium={SocialMedium}
                ContactId={ContactId}
                messagesReceived={allMessagesReceived}
                messagesCount={allMessagesReceived.length} // 👈 Prop adicional para forzar cambio
                renderKey={renderKey}
                archived={archived}
              />
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center mt-64">
          <FilterText />
        </div>
      )}
    </div>
  );
};

export default InboxListUser;
