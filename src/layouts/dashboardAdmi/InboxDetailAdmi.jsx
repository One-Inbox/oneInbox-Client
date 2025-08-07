import React from "react";
import SideBarA from "../../components/admi/SideBarA";
import MenuInboxAdmi from "../../components/admi/inbox/MenuInboxAdmi";
import DetailTable from "../../components/admi/inbox/DetailTable";
import ConversationDetail from "../../components/utils/conversationDetail/ConversationDetail";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getContactByIdAction } from "../../redux/actions/actionContact";

const InboxDetailAdmi = () => {
  const dispatch = useDispatch();
  const { contactId } = useParams();

  //chequeo que la ubicacion del link sea impar
  const location = useLocation();
  const isOdd = location.state?.isOdd;

  const contact = useSelector((state) => state.contact);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getContactByIdAction(contactId));
  }, [contactId]);

  return (
    <div className="flex h-screen-minus-navbar w-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-48 bg-gray-800 overflow-hidden">
        <SideBarA user={user} />
      </div>

      {/* Menu fijo */}
      <div className="w-56 bg-white shadow-md overflow-hidden">
        <MenuInboxAdmi />
      </div>

      {/* Tabla que ocupa el resto del espacio */}
      <div className="flex-1 overflow-hidden pt-20">
        <DetailTable state={isOdd} />
        <ConversationDetail contact={contact} path={-1} />
      </div>
    </div>
  );
};

export default InboxDetailAdmi;
