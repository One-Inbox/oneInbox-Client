import InboxCardUser from "./InboxCardUser";
import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import FilterText from "../../utils/filters/FilterText";
import Spinner from "../../utils/spinners/Spinner";
import timeStampToISO from "../../utils/timeStampToISO";

// const InboxListUser = () => {
//   const allMessagesReceived = useSelector((state) => state.messagesReceived);
//   console.log("mensajes", allMessagesReceived.length);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let timeoutId;
//     if (allMessagesReceived.length) {
//       console.log(
//         "📥 Efecto: mensajes actualizados",
//         allMessagesReceived.length
//       );
//       setLoading(false);
//     } else {
//       setTimeout(() => {
//         setLoading(false);
//       }, 7000);
//     }
//     return () => {
//       if (timeoutId) clearTimeout(timeoutId); // Limpia el timeout si el componente se desmonta
//     };
//   }, [allMessagesReceived]);

//   const notArchivedMessages = allMessagesReceived.filter(
//     (message) => message.archived === false
//   );
//   //const sortedMessages = allMessagesReceived
//   const sortedMessages = notArchivedMessages
//     .slice()
//     .sort((a, b) => b.timestamp - a.timestamp);

//   const messagesByContact = []; //array para almacenar mensajes de contactos únicos.
//   const seenContactIds = new Set(); //conjunto (Set) es una colección de valores únicos, no puede contener elementos duplicados.
//   //itero sobre cada mensaje de array sortedMessages
//   for (const message of sortedMessages) {
//     if (!seenContactIds.has(message.ContactId)) {
//       // este id de contacto  NO existe en el conjunto?
//       messagesByContact.push(message); // ==> pusheo el mensaje en messagesByContact
//       seenContactIds.add(message.ContactId); // ==> agrego el contacto en el conjunto
//     }
//   }

//   return (
//     <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-green-400">
//       {loading ? (
//         <Spinner text={"loading..."} />
//       ) : allMessagesReceived.length ? (
//         messagesByContact.map((message, index) => {
//           const { id, name, timestamp, state, SocialMedium, ContactId } =
//             message;
//           return (
//             <div key={index}>
//               <InboxCardUser
//                 id={id}
//                 name={name}
//                 timestamp={timestamp}
//                 state={state}
//                 SocialMedium={SocialMedium}
//                 ContactId={ContactId}
//                 messagesReceived={allMessagesReceived}
//               />
//             </div>
//           );
//         })
//       ) : (
//         <div className="flex justify-center items-center mt-64">
//           <FilterText />
//         </div>
//       )}
//     </div>
//   );
// };

// export default InboxListUser;
// InboxListUser.js - Tu código con optimizaciones mínimas

const InboxListUser = () => {
  // Tu selector actual - sin cambios
  const allMessagesReceived = useSelector((state) => state.messagesReceived);
  console.log("mensajes", allMessagesReceived.length);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (allMessagesReceived.length) {
      console.log(
        "📥 Efecto: mensajes actualizados",
        allMessagesReceived.length
      );
      setLoading(false);
    } else {
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 7000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [allMessagesReceived.length]); // Dependencia más específica
  useEffect(() => {
    console.log("🔍 InboxListUser re-render:", {
      messagesLength: allMessagesReceived?.length,
      messages: allMessagesReceived,
    });
  }, [allMessagesReceived]);

  useEffect(() => {
    console.log("🔄 COMPONENTE: messagesReceived cambió", {
      length: allMessagesReceived?.length,
      ultimoMensaje: allMessagesReceived?.slice(-1)[0],
      messagesByContactLength: messagesByContact.length,
    });
  }, [allMessagesReceived, messagesByContact]);

  // Optimización con useMemo - evita recalcular en cada render
  const messagesByContact = useMemo(() => {
    const notArchivedMessages = allMessagesReceived.filter(
      (message) => message.archived === false
    );

    const sortedMessages = notArchivedMessages.slice().sort((a, b) => {
      const timeA = timeStampToISO(a.timestamp);
      const timeB = timeStampToISO(b.timestamp);
      return timeB.localeCompare(timeA);
    });

    const messagesByContact = [];
    const seenContactIds = new Set();

    for (const message of sortedMessages) {
      if (!seenContactIds.has(message.ContactId)) {
        messagesByContact.push(message);
        seenContactIds.add(message.ContactId);
      }
    }

    return messagesByContact;
  }, [allMessagesReceived]); // Solo recalcula cuando cambian los mensajes

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-green-400">
      {loading ? (
        <Spinner text={"loading..."} />
      ) : allMessagesReceived.length ? (
        messagesByContact.map((message, index) => {
          const { id, name, timestamp, state, SocialMedium, ContactId } =
            message;
          return (
            <div key={`${ContactId}-${id}-${index}`}>
              {" "}
              {/* Key más específica */}
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
