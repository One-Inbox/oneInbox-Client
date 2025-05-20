import React from "react";
import SideBarA from "../../components/admi/SideBarA";
import MenuInboxAdmi from "../../components/admi/inbox/MenuInboxAdmi";
import DetailTable from "../../components/admi/inbox/DetailTable";
import ConversationDetail from "../../components/utils/conversationDetail/ConversationDetail"
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getContactByIdAction } from "../../redux/actions/actionContact";



const InboxDetailAdmi = () => {
  const dispatch = useDispatch();
  const {contactId} = useParams();
  console.log('contacto por params', contactId);
  //chequeo que la ubicacion del link sea impar
  const location = useLocation();
  const isOdd = location.state?.isOdd;
  
  const contact = useSelector((state) => state.contact)
   const user = useSelector((state) => state.user);

  useEffect(() => {
      dispatch(getContactByIdAction(contactId))
  }, [contactId])

  return (
    <div className="w-screen h-screen-minus-navbar flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-48 flex-shrink-0">
        <SideBarA user={user} />
      </div>

      {/* Contenedor del menú y tabla */}
      <div className="flex flex-row flex-grow overflow-hidden">
        {/* Menu fijo */}
        <div className="w-56 flex-shrink-0 bg-white shadow-md h-full relative z-20 top-14">
          <MenuInboxAdmi />
        </div>

        {/* Tabla que ocupa el resto del espacio */}
        <div className="flex-grow overflow-auto">
          <DetailTable state={isOdd}/>
          <ConversationDetail contact={contact} path={-1}/> 
       
        </div>
      </div>
    </div>
  );
};

export default InboxDetailAdmi;
