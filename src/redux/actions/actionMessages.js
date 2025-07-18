import axios from "axios";
import { URL_API } from "../../config.js";
import {
  //sweetAlertsSuccessfully,
  sweetAlertsError,
  sweetAlertsSuccessfully,
} from "../../components/utils/alerts/alerts.jsx";
import {
  GET_ALL_MESSAGES_RECIVED,
  //UPDATE_ACTIVE_MESSAGE_RECEIVED,
  GET_MESSAGE_RECIVED_BY_ID,
  UPDATE_STATE_TO_READ_MESSAGE_RECEIVED,
  UPDATE_STATE_TO_ANSWERED_MESSAGE_RECEIVED,
  CREATE_MESSAGE_SEND,
  NEW_MESSAGE_RECEIVED,
  GET_ALL_MESSAGES_SENT,
  SET_ACTIVE_MESSAGE,
  SET_UPLOAD_FILE,
  UPDATE_ARCHIVED_MESSAGE_RECEIVED,
} from "../types";

//LOCALHOST
//const URL = 'http://localhost:3000';
//SERVER DESARROLLO
//const URL = 'https://electrica-mosconi-backend.onrender.com';
//SERVER PRODUCCION
//const URL ='https://electrica-mosconi-backend-main.onrender.com'

export const getAllMessagesReceivedAction = () => {
  //console.log("URL_API en getAllMessagesReceived ", URL_API);

  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${URL_API}/message/received`);
      //console.log("respusta del back en action getAllMessages", response);
      const messages = response.data;
      //console.log("despacho la action getALlMessages con Payload", messages);
      dispatch({ type: GET_ALL_MESSAGES_RECIVED, payload: messages });

      const { socket } = getState(); // socket desde el estado global
      // esucha nuevos mensajes a través del socket
      if (socket) {
        socket.on("NEW_MESSAGE_RECEIVED", (newMessage) => {
          dispatch({
            type: NEW_MESSAGE_RECEIVED,
            payload: newMessage,
          });
        });
      }
    } catch (error) {
      //console.log(error);
      if (error.response.status !== 400) {
        sweetAlertsError(
          "Intenta de nuevo",
          "No podemos mostrar tus mensajes recibidos",
          "Ok"
        );
      }
    }
  };
};

export const getMessageReceivedByIdAction = (messageId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL_API}/message/received/${messageId}`
      );
      const message = response.data;
      dispatch({ type: GET_MESSAGE_RECIVED_BY_ID, payload: message });
    } catch (error) {
      sweetAlertsError(
        "Intenta de nuevo",
        `No podemos mostrar el mensaje con ID ${messageId}`,
        "Ok"
      );
    }
  };
};
//***UPDATE PARA CAMBIAR LA CONVERSACION A ARCHIVADA-DESARCHIVADA */
export const updateArchivedMessageReceivedAction = (messageId) => {
  try {
    return async (dispatch) => {
      const responseMessage = await axios.get(
        `${URL_API}/message/received/${messageId}`
      );
      const message = responseMessage.data;
      const contactId = message.ContactId;

      const responseContact = await axios.get(
        `${URL_API}/contact/${contactId}`
      );
      const contact = responseContact.data;
      const messagesByContact = contact.MsgReceiveds;

      const areAllArchived = messagesByContact.every((msg) => msg.archived);

      if (messagesByContact.length === 1) {
        const response = await axios.put(
          `${URL_API}/message/received/archived/${messageId}`
        );
        const updated = response.data.message;
        dispatch({ type: UPDATE_ARCHIVED_MESSAGE_RECEIVED, payload: updated });
      } else {
        for (const msg of messagesByContact) {
          const response = await axios.put(
            `${URL_API}/message/received/archived/${msg.id}`
          );
          const updated = response.data.message;
          dispatch({
            type: UPDATE_ARCHIVED_MESSAGE_RECEIVED,
            payload: updated,
          });
        }
      }

      areAllArchived
        ? sweetAlertsSuccessfully(
            "Éxito",
            "La conversación ha sido desarchivada correctamente",
            "Ok"
          )
        : sweetAlertsSuccessfully(
            "Éxito",
            "La conversación ha sido archivada correctamente",
            "Ok"
          );
    };
  } catch (error) {
    areAllArchived
      ? sweetAlertsError(
          "Intenta de nuevo",
          "No podemos desarchivar la conversacion seleccionada",
          "Ok"
        )
      : sweetAlertsError(
          "Intenta de nuevo",
          "No podemos archivar la conversacion seleccionada",
          "Ok"
        );
  }
};

//*** PARA CAMBIAR ESTILOS DE CONVERSACION ABIERTA */
export const setActiveMessageAction = (messageId) => {
  return {
    type: SET_ACTIVE_MESSAGE,
    payload: messageId,
  };
};

//***UPDATE PARA PASAR EL MENSAJE A LEIDO */
export const updateStateToReadMessageReceivedAction = (messageId) => {
  //console.log("entro en la action de cambio estado a leido:", messageId);
  try {
    return async (dispatch) => {
      const response = await axios.put(
        `${URL_API}/message/received/state/read/${messageId}`
      );
      //console.log("update to Read: Respuesta del backend:", response.data);
      const message = response.data.message || null;
      dispatch({
        type: UPDATE_STATE_TO_READ_MESSAGE_RECEIVED,
        payload: message,
      });
    };
  } catch (error) {
    sweetAlertsError(
      "Intenta de nuevo",
      "No podemos cambiar el estado del mensaje seleccionado",
      "Ok"
    );
  }
};
//**UPDATE PARA PASAR MENSAJE A RESPONDIDO */
export const updateStateToAnsweredMessageReceivedAction = (messageId) => {
  try {
    return async (dispatch) => {
      const response = await axios.put(
        `${URL_API}/message/received/state/answered/${messageId}`
      );
      const message = response.data.message ? response.data.message : null;
      dispatch({
        type: UPDATE_STATE_TO_ANSWERED_MESSAGE_RECEIVED,
        payload: message,
      });
    };
  } catch (error) {
    sweetAlertsError(
      "Intenta de nuevo",
      "No podemos cambiar el estado del mensaje seleccionado",
      "Ok"
    );
  }
};

// export const deactivateAllMessagesReceivedAction = () => {
//   return {
//     type: "DESACTIVATE_ALL_MESSAGES_RECEIVED",
//   };
// };

export const createMessageSentAction = (input) => {
  //console.log('input en action', input);

  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL_API}/messageSend`, input);
      //console.log('respusta telegram', response);
      const message = response.data;
      //console.log('mensaje en action', message);
      //console.log("status", response.status);
      dispatch({ type: CREATE_MESSAGE_SEND, payload: message });

      if (response.status === 200) {
        const messagesUnresponded = await axios.get(
          `${URL_API}/message/received/unresponded/${input.contactId}`
        );
        //console.log("mensajes no respondidos", messagesUnresponded.data);
        const messages = messagesUnresponded.data;

        messages.length &&
          messages.forEach((message) =>
            dispatch(updateStateToAnsweredMessageReceivedAction(message.id))
          );
      }
    } catch (error) {
      //console.log("error de action", error);
      sweetAlertsError(
        "Intenta de nuevo",
        "No podemos enviar tu respuesta",
        "Ok"
      );
    }
  };
};

export const getAllMessagesSentAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_API}/message/sent`);
      const messages = response.data;
      dispatch({ type: GET_ALL_MESSAGES_SENT, payload: messages });
    } catch (error) {
      //console.log("messageSent", error);
    }
  };
};

export const setUploadFileAction = (file) => {
  //console.log("entro en la action setUploadFile con data:", file);

  return {
    type: SET_UPLOAD_FILE,
    payload: file,
  };
};

//**ARCHIVAR-DESARCHIVAR MENSAJES */
