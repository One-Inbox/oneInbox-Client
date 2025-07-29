import { io } from "socket.io-client";
import { URL_API } from "../../config"; // Quita el .js
import {
  ADD_NEW_MESSAGE_RECEIVED,
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
  ADD_NEW_MESSAGE_SENT,
  SOCKET_CONNECTED, // Agrega estos
  SOCKET_DISCONNECTED, // Agrega estos
  SOCKET_ERROR, // Agrega estos
} from "../types";
import {
  sweetAlertsError,
  sweetAlertsWarning,
} from "../../components/utils/alerts/alerts";

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
