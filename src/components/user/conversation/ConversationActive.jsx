import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputConversation from "./InputConversation";
import ConversationDetail from "../../utils/conversationDetail/ConversationDetail";
import Spinner from "../../utils/spinners/Spinner";
import CounterInConversation from "../../utils/CounterInConversation";

const ConversationActive = () => {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const contact = useSelector((state) => state.contact);
  //console.log("contacto", contact);

  useEffect(() => {
    if (contact.id) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [contact.id]);

  // return (
  //   <div className="w-full h-full flex flex-col overflow-hidden">
  //     <div className="flex-grow overflow-y-auto">
  //       {loading ? (
  //         <Spinner text={'loading...'}/>
  //       ) : (
  //         <div>
  //           <div className="w-3/5 h-5 fixed top-16 z-40  ml-6 mt-2">
  //             <CounterInConversation contact={contact} />
  //           </div>
  //           <ConversationDetail
  //             isActive={isActive}
  //             setIsActive={setIsActive}
  //             contact={{
  //               ...contact,
  //               id: Number(contact.id), // Convertimos contact.id a número para evitar el warning
  //             }}
  //           />
  //         </div>
  //       )}
  //     </div>
  //     <div className="w-full">
  //       <InputConversation />
  //     </div>
  //   </div>
  // );

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Contenedor de la conversación */}
      <div className="flex-grow overflow-y-auto">
        {loading ? (
          <Spinner text={'loading...'}/>
        ) : (
          <div className="flex flex-col h-full relative">
            {/* Contador en la conversación */}
            <div className="w-3/5 h-5 fixed top-16 z-40 ml-6 mt-2">
              <CounterInConversation contact={contact} />
            </div>

            {/* Contenido de la conversación */}
            <div className="flex-grow overflow-y-auto">
              <ConversationDetail
                isActive={isActive}
                setIsActive={setIsActive}
                contact={{
                  ...contact,
                  id: Number(contact.id), // Convertimos contact.id a número para evitar el warning
                }}
                path={'/inbox'}
              />
            </div>
          </div>
        )}
      </div>

      {/* Input de conversación */}
      <div className="w-full flex-shrink-0">
        <InputConversation />
      </div>
    </div>
  );
};

export default ConversationActive;
