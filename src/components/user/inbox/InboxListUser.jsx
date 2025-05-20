import InboxCardUser from "./InboxCardUser";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FilterText from "../../utils/filters/FilterText";
import Spinner from "../../utils/spinners/Spinner";

const InboxListUser = () => {
  const allMessagesReceived = useSelector((state) => state.messagesReceived);
  //console.log("mensajes", allMessagesReceived);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (allMessagesReceived.length) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 7000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId); // Limpia el timeout si el componente se desmonta
    };
  }, [allMessagesReceived]);

  const notArchivedMessages = allMessagesReceived.filter(message => message.state !== 'Archivados')
  //const sortedMessages = allMessagesReceived
  const sortedMessages = notArchivedMessages
    .slice()
    .sort((a, b) => b.timestamp - a.timestamp);

  const messagesByContact = []; //array para almacenar mensajes de contactos únicos.
  const seenContactIds = new Set(); //conjunto (Set) es una colección de valores únicos, no puede contener elementos duplicados.
  //itero sobre cada mensaje de array sortedMessages
  for (const message of sortedMessages) {
    if (!seenContactIds.has(message.ContactId)) {
      // este id de contacto  NO existe en el conjunto?
      messagesByContact.push(message); // ==> pusheo el mensaje en messagesByContact
      seenContactIds.add(message.ContactId); // ==> agrego el contacto en el conjunto
    }
  }

  return (
    <div className="sticky w-64 h-screen overflow-y-auto overflow-x-hidden bg-green-400">
      {loading ? (
        <Spinner text={'loading...'}/>
      ) : allMessagesReceived.length ? (
        messagesByContact.map((message, index) => {
          const { id, name, timestamp, state, SocialMedium, ContactId } =
            message;
          return (
            <div key={index}>
              <InboxCardUser
                id={id}
                name={name}
                timestamp={timestamp}
                state={state}
                SocialMedium={SocialMedium}
                ContactId={ContactId}
                messagesReceived={allMessagesReceived}
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
