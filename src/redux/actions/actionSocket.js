import { io } from "socket.io-client";
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
const URL ='https://electrica-mosconi-backend-main.onrender.com'

export const connectSocket = () => (dispatch) => {
  try {
    // conexión del socket y despacho el socket como payload
    const socket = io(URL);
    //console.log('action me conecto con socket', socket);
    dispatch({
      type: CONNECT_SOCKET,
      payload: socket,
    });
  } catch (error) {
    sweetAlertsError(
      "Intenta de nuevo",
      "No pudimos entablar la conexión",
      "Ok"
    );
  }
};

export const disconnectSocket = () => (dispatch) => {
  try {
    socket.disconnect();
    console.log("desconexion socket por action");

    dispatch({
      type: DISCONNECT_SOCKET,
    });
  } catch (error) {
    sweetAlertsError(
      "Intenta de nuevo",
      "No pudimos detener la conexión",
      "Ok"
    );
  }
};

export const addNewMessageReceivedAction = (message) => {
  try {
    console.log("Mensaje agregado a la store:", message);

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
