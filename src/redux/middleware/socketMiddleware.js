import { io } from "socket.io-client";
import { URL_API } from "../../config";
import {
  ADD_NEW_MESSAGE_RECEIVED,
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
  ADD_NEW_MESSAGE_SENT,
} from "../types";

const socketMiddleware = (store) => {
  //console.log("URL_API en socketMiddleware", URL_API);
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
          });

          socket.on("NEW_MESSAGE_RECEIVED", (message) => {
            console.log("🔥 Nuevo mensaje recibido vía socket:", message);
            store.dispatch({
              type: ADD_NEW_MESSAGE_RECEIVED,
              payload: message,
            });
          });

          socket.on("ADD_NEW_MESSAGE_SENT", (message) => {
            store.dispatch({
              type: ADD_NEW_MESSAGE_SENT,
              payload: message,
            });
          });

          socket.on("disconnect", (reason) => {
            console.warn("🔌 Socket desconectado:", reason);
          });

          socket.on("connect_error", (error) => {
            console.error("❌ Error al conectar el socket:", error.message);
          });
        } else {
          console.log("🔁 Ya hay un socket conectado:", socket.id);
        }
        break;

      case DISCONNECT_SOCKET:
        if (socket) {
          socket.disconnect();
        }
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default socketMiddleware;
