import React from "react";
import SideBarU from "../../components/user/SideBarU";
import InboxListUser from "../../components/user/inbox/InboxListUser";
import ConversationActive from "../../components/user/conversation/ConversationActive";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersAction,
  getUserByIdAction,
} from "../../redux/actions/actionsUsers";
import { getBusinessByIdAction } from "../../redux/actions/actionBusiness";
import { getAllMessagesReceivedAction } from "../../redux/actions/actionMessages";
import { getContactByMessageReceivedAction } from "../../redux/actions/actionContact";
import { CONNECT_SOCKET, DISCONNECT_SOCKET } from "../../redux/types";
import { getAllSocialMediaByBusinessAction } from "../../redux/actions/actionSocialMedia.js";

const InboxUser = () => {
  //console.log("InboxUser render");
  const dispatch = useDispatch();

  //traigo data de local storage
  const businessBySessionStorage = sessionStorage.getItem("businessId");
  const userBySessionStorage = sessionStorage.getItem("userId");
  // const messagesBysessionStorage = sessionStorage.getItem("lengthMessages");
  //businees
  const business = useSelector((state) => state.business);
  const businessId = businessBySessionStorage || business.id;
  //user
  const user = useSelector((state) => state.user);
  const userId = userBySessionStorage || user.id;
  //socket
  const socket = useSelector((state) => state.socket);
  //mensajes
  const messageActive = useSelector((state) => state.messageActive);
  const msgSent = useSelector((state) => state.messagesSent);
  const msgReceived = useSelector((state) => state.messagesReceived)

  useEffect(() => {
    if (businessId) {
      dispatch(getBusinessByIdAction(businessId));
      dispatch(getAllMessagesReceivedAction());
      dispatch(getAllUsersAction());
      //console.log("despacho getAllUsersAction");
      dispatch(getAllSocialMediaByBusinessAction());
    }
  }, [dispatch, businessId]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserByIdAction(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (messageActive) {
      //dispatch(getAllMessagesReceivedAction());
      dispatch(getContactByMessageReceivedAction(messageActive));
    }
  }, [dispatch, messageActive, msgSent, msgReceived]);

  useEffect(() => {
    if (!socket) {
      dispatch({ type: CONNECT_SOCKET });
    }
    return () => {
      if (socket) {
        dispatch({ type: DISCONNECT_SOCKET });
      }
    };
  }, [dispatch, socket]);

  return (
    <div className="w-screen h-screen-minus-navbar flex overflow-hidden">
      <div className="w-48 flex-shrink-0">
        <SideBarU />
      </div>
      <div className="flex flex-1 h-full overflow-hidden">
        <div className="w-64 h-full overflow-y-auto  overflow-x-hidden flex-shrink-0">
          <InboxListUser />
        </div>
        <div className="flex flex-1 h-full overflow-x-hidden">
          {!messageActive ? (
            <div className="flex items-center justify-center w-full h-full">
              <img
                src="/imagenFondoCAInactiva.svg"
                className="-mt-10"
                alt="imagen de fondo"
              />
            </div>
          ) : (
            <div className=" h-full overflow-y-auto w-full">
              <ConversationActive />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxUser;
