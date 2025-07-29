import { io } from "socket.io-client";
import { URL_API } from "../../config.js";
import {
  ADD_NEW_MESSAGE_RECEIVED,
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
  ADD_NEW_MESSAGE_SENT,
} from "../types";
import {
  sweetAlertsError,
  sweetAlertsWarning,
} from "../../components/utils/alerts/alerts";

//LOCALHOST
//const URL = 'http://localhost:3000';
//SERVER DESARROLLO
//const URL = 'https://electrica-mosconi-backend.onrender.com';
//SERVER PRODUCCION
//const URL ='https://electrica-mosconi-backend-main.onrender.com'

// export const connectSocket = () => (dispatch) => {
//   //console.log("URL_API en connectSocket ", URL_API);
//   try {
//     // conexión del socket y despacho el socket como payload
//     const socket = io(URL_API);
//     console.log("action me conecto con socket", socket.id);
//     dispatch({
//       type: CONNECT_SOCKET,
//       payload: socket,
//     });
//   } catch (error) {
//     sweetAlertsError(
//       "Intenta de nuevo",
//       "No pudimos entablar la conexión",
//       "Ok"
//     );
//   }
// };
// // socketActions.js

// Simplificadas - solo disparan el middleware
export const connectSocket = () => ({
  type: CONNECT_SOCKET,
});

export const disconnectSocket = () => ({
  type: DISCONNECT_SOCKET,
});

export const addNewMessageReceivedAction = (message) => {
  try {
    sweetAlertsWarning("Atención", "Has recibido un nuevo mensaje", "OK");
    return {
      type: ADD_NEW_MESSAGE_RECEIVED,
      payload: message,
    };
  } catch (error) {
    sweetAlertsError(
      "Intenta de nuevo",
      "No podemos agregar el nuevo mensaje",
      "Ok"
    );
  }
};

export const addNewMessageSentAction = (message) => {
  try {
    return {
      type: ADD_NEW_MESSAGE_SENT,
      payload: message,
    };
  } catch (error) {
    sweetAlertsError(
      "Intenta de nuevo",
      "No podemos mostrar el nuevo mensaje enviado",
      "Ok"
    );
  }
};
