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
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${URL_API}/message/received`);
      const messages = response.data;
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
// export const updateArchivedMessageReceivedAction = (messageId) => {
//   try {
//     return async (dispatch) => {
//       const responseMessage = await axios.get(
//         `${URL_API}/message/received/${messageId}`
//       );
//       const message = responseMessage.data;
//       const contactId = message.ContactId;

//       const responseContact = await axios.get(
//         `${URL_API}/contact/${contactId}`
//       );
//       const contact = responseContact.data;
//       const messagesByContact = contact.MsgReceiveds;

//       const areAllArchived = messagesByContact.every((msg) => msg.archived);

//       if (messagesByContact.length === 1) {
//         const response = await axios.put(
//           `${URL_API}/message/received/archived/${messageId}`
//         );
//         const updated = response.data.message;
//         dispatch({ type: UPDATE_ARCHIVED_MESSAGE_RECEIVED, payload: updated });
//       } else {
//         // for (const msg of messagesByContact) {
//         //   const response = await axios.put(
//         //     `${URL_API}/message/received/archived/${msg.id}`
//         //   );
//         //   const updated = response.data.message;
//         //   dispatch({
//         //     type: UPDATE_ARCHIVED_MESSAGE_RECEIVED,
//         //     payload: updated,
//         //   });
//         // }
//         const updates = await Promise.all(
//           messagesByContact.map((msg) =>
//             axios.put(`${URL_API}/message/received/archived/${msg.id}`)
//           )
//         );

//         updates.forEach((res) => {
//           dispatch({
//             type: UPDATE_ARCHIVED_MESSAGE_RECEIVED,
//             payload: res.data.message,
//           });
//         });
//       }
//       console.log("Despachado updatedMessages:", payload);
//       areAllArchived
//         ? sweetAlertsSuccessfully(
//             "Éxito",
//             "La conversación ha sido desarchivada correctamente",
//             "Ok"
//           )
//         : sweetAlertsSuccessfully(
//             "Éxito",
//             "La conversación ha sido archivada correctamente",
//             "Ok"
//           );
//     };
//   } catch (error) {
//     areAllArchived
//       ? sweetAlertsError(
//           "Intenta de nuevo",
//           "No podemos desarchivar la conversacion seleccionada",
//           "Ok"
//         )
//       : sweetAlertsError(
//           "Intenta de nuevo",
//           "No podemos archivar la conversacion seleccionada",
//           "Ok"
//         );
//   }
// };
export const updateArchivedMessageReceivedAction = (messageId) => {
  return async (dispatch) => {
    try {
      // ✅ Una sola llamada que maneja toda la conversación
      const response = await axios.put(
        `${URL_API}/message/received/archived/${messageId}`
      );

      const { messages, newState, conversationId } = response.data;

      // ✅ Despachar TODOS los mensajes de la conversación de una vez
      dispatch({
        type: UPDATE_ARCHIVED_MESSAGE_RECEIVED,
        payload: messages, // 👈 Array completo, no mensaje por mensaje
      });

      // ✅ Mensaje de éxito basado en el nuevo estado
      if (newState) {
        sweetAlertsSuccessfully(
          "Éxito",
          "La conversación ha sido archivada correctamente",
          "Ok"
        );
      } else {
        sweetAlertsSuccessfully(
          "Éxito",
          "La conversación ha sido desarchivada correctamente",
          "Ok"
        );
      }
    } catch (error) {
      console.error("Error en updateArchivedMessageReceivedAction:", error);

      sweetAlertsError(
        "Intenta de nuevo",
        "No podemos procesar la conversación seleccionada",
        "Ok"
      );
    }
  };
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
  try {
    return async (dispatch) => {
      const response = await axios.put(
        `${URL_API}/message/received/state/read/${messageId}`
      );
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
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL_API}/messageSend`, input);
      const message = response.data;
      dispatch({ type: CREATE_MESSAGE_SEND, payload: message });

      if (response.status === 200) {
        const messagesUnresponded = await axios.get(
          `${URL_API}/message/received/unresponded/${input.contactId}`
        );
        const messages = messagesUnresponded.data;

        messages.length &&
          messages.forEach((message) =>
            dispatch(updateStateToAnsweredMessageReceivedAction(message.id))
          );
      }
    } catch (error) {
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
    } catch (error) {}
  };
};

export const setUploadFileAction = (file) => {
  return {
    type: SET_UPLOAD_FILE,
    payload: file,
  };
};

//**ARCHIVAR-DESARCHIVAR MENSAJES */
