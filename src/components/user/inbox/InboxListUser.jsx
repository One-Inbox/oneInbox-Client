import InboxCardUser from "./InboxCardUser";
import { useSelector } from "react-redux";
import { useState, useEffect, useMemo, useRef } from "react";
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
  // 🧠 DEBUG 1: detectar cambio de referencia
  const prevRef = useRef();

  useEffect(() => {
    console.log(
      "📦 ¿Cambio de referencia en messagesReceived?",
      prevRef.current !== allMessagesReceived
    );
    prevRef.current = allMessagesReceived;
  }, [allMessagesReceived]);

  // 🧠 DEBUG 2: loguear contenido completo
  useEffect(() => {
    console.log("📥 Nuevo contenido en messagesReceived:", allMessagesReceived);
    console.log("📏 Cantidad:", allMessagesReceived.length);
  }, [allMessagesReceived]);
  const [renderKey, setRenderKey] = useState(0);

  // 🔥 FORZAR RE-RENDER cuando cambien los mensajes
  useEffect(() => {
    console.log("🔄 Forzando re-render por cambio en mensajes");
    setRenderKey((prev) => prev + 1);
  }, [allMessagesReceived.length]);

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

  // 🔥 SOLO ESTE LOG SIMPLE PARA DEBUG
  useEffect(() => {
    console.log("🔍 Mensajes actuales:", allMessagesReceived.length);
  }, [allMessagesReceived]);

  const finalMessages = useMemo(() => {
    const notArchived = allMessagesReceived.filter(
      (msg) => msg.archived === false
    );

    const sorted = notArchived.slice().sort((a, b) => {
      const timeA = timeStampToISO(a.timestamp);
      const timeB = timeStampToISO(b.timestamp);
      return timeB.localeCompare(timeA); // Más reciente primero
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

  // Optimización con useMemo - evita recalcular en cada render
  // const messagesByContact = useMemo(() => {
  //   const notArchivedMessages = allMessagesReceived.filter(
  //     (message) => message.archived === false
  //   );

  //   const sortedMessages = notArchivedMessages.slice().sort((a, b) => {
  //     const timeA = timeStampToISO(a.timestamp);
  //     const timeB = timeStampToISO(b.timestamp);
  //     return timeB.localeCompare(timeA);
  //   });

  //   const messagesByContact = [];
  //   const seenContactIds = new Set();

  //   for (const message of sortedMessages) {
  //     if (!seenContactIds.has(message.ContactId)) {
  //       messagesByContact.push(message);
  //       seenContactIds.add(message.ContactId);
  //     }
  //   }

  //   return messagesByContact;
  // }, [allMessagesReceived]); // Solo recalcula cuando cambian los mensajes
  // const notArchivedMessages = allMessagesReceived.filter(
  //   (message) => message.archived === false
  // );

  // const sortedMessages = notArchivedMessages.slice().sort((a, b) => {
  //   const timeA = timeStampToISO(a.timestamp);
  //   const timeB = timeStampToISO(b.timestamp);
  //   return timeB.localeCompare(timeA); // más recientes arriba
  // });

  // // const messagesByContact = [];
  // // const seenContactIds = new Set();

  // // for (const message of sortedMessages) {
  // //   if (!seenContactIds.has(message.ContactId)) {
  // //     messagesByContact.push(message);
  // //     seenContactIds.add(message.ContactId);
  // //   }
  // // }
  // const messagesByContact = {};

  // for (const message of sortedMessages) {
  //   const contactId = message.ContactId;
  //   // Solo guarda el mensaje si es el primero o más reciente
  //   if (
  //     !messagesByContact[contactId] ||
  //     timeStampToISO(message.timestamp) >
  //       timeStampToISO(messagesByContact[contactId].timestamp)
  //   ) {
  //     messagesByContact[contactId] = message;
  //   }
  // }

  // const finalMessages = Object.values(messagesByContact);

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-green-400">
      {loading ? (
        <Spinner text={"loading..."} />
      ) : allMessagesReceived.length ? (
        finalMessages.map((message, index) => {
          // messagesByContact.map((message, index) => {
          const { id, name, timestamp, state, SocialMedium, ContactId } =
            message;
          return (
            <div key={`${ContactId}-${id}-${index}- ${renderKey}`}>
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
