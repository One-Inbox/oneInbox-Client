import { io } from "socket.io-client";
import { URL_API } from "../../config";
import {
  ADD_NEW_MESSAGE_RECEIVED,
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
  ADD_NEW_MESSAGE_SENT,
  SOCKET_CONNECTED, // ← AGREGAR ESTE IMPORT
  SOCKET_DISCONNECTED, // ← AGREGAR ESTE IMPORT
  SOCKET_ERROR,
} from "../types";

// // socketMiddleware.js
const socketMiddleware = (store) => {
  let socket = null;

  return (next) => (action) => {
    switch (action.type) {
      case CONNECT_SOCKET:
        if (!socket || socket.disconnected) {
          socket = io(URL_API, {
            transports: ["websocket"],
            secure: true,
            withCredentials: true,
          });

          socket.on("connect", () => {
            console.log("✅ Socket conectado:", socket.id);
            // Dispatch successful connection
            store.dispatch({
              type: SOCKET_CONNECTED,
              payload: socket.id,
            });
          });

          socket.on("NEW_MESSAGE_RECEIVED", (message) => {
            console.log("🔥 Nuevo mensaje recibido vía socket:", message);
            store.dispatch({
              type: ADD_NEW_MESSAGE_RECEIVED,
              payload: message,
            });

            setTimeout(() => {
              const currentState = store.getState();
              console.log("📊 Estado Redux después del dispatch:", {
                messagesReceived: currentState.messagesReceived?.length,
                allMessagesReceived: currentState.allMessagesReceived?.length,
                ultimoMensaje: currentState.messagesReceived?.slice(-1)[0],
              });
            }, 100);
          });

          socket.on("ADD_NEW_MESSAGE_SENT", (message) => {
            store.dispatch({
              type: ADD_NEW_MESSAGE_SENT,
              payload: message,
            });
          });

          socket.on("disconnect", (reason) => {
            console.warn("🔌 Socket desconectado:", reason);
            store.dispatch({
              type: SOCKET_DISCONNECTED,
            });
          });

          socket.on("connect_error", (error) => {
            console.error("❌ Error al conectar el socket:", error.message);
            store.dispatch({
              type: SOCKET_ERROR,
              payload: error.message,
            });
          });
        }
        break;

      case DISCONNECT_SOCKET:
        if (socket) {
          socket.disconnect();
          socket = null;
        }
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default socketMiddleware;
