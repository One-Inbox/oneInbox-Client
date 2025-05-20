import { io } from "socket.io-client";
import {
  ADD_NEW_MESSAGE_RECEIVED,
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
  ADD_NEW_MESSAGE_SENT,
} from "../types";

//LOCALHOST
//const URL = 'http://localhost:3000';
//SERVER DESARROLLO
//const URL = 'https://electrica-mosconi-backend.onrender.com';
//SERVER PRODUCCION
const URL ='https://electrica-mosconi-backend-main.onrender.com'

const socketMiddleware = (store) => {
  let socket = null;

  return (next) => (action) => {
    switch (action.type) {
      case CONNECT_SOCKET:
        if (socket) {
          socket.disconnect();
        }
        socket = io(URL, {
          transports: ["websocket"],
        });

        // Conectar con el servidor WebSocket
        socket.on("connect", () => {
          //console.log("Socket conectado");
        });
        // socket.on("SE_EMITEN_OTRAS_COSAS", (mensaje) => {
        //   console.log("Se emiten otras cosas:", mensaje);
        // });
        socket.on("NEW_MESSAGE_RECEIVED", (message) => {
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
