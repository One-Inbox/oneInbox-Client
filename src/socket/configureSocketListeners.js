import { getAllMessagesReceivedAction } from '../redux/actions/actionMessages'

const configureSocketListeners = (socket, dispatch, contactId) => {
    // Listener para mensajes recibidos
    socket.on("NEW_MESSAGE_RECEIVED", (message) => {
        if (message.ContactId === contactId) {
            dispatch(getAllMessagesReceivedAction()); // Actualiza los mensajes
        }
    });

    // Listener para mensajes enviados
    socket.on("NEW_MESSAGE_SENT", (message) => {
        if (message.ContactId === contactId) {
            dispatch(getAllMessagesReceivedAction()); // Actualiza los mensajes
        }
    });

    return () => {
        // Limpiar listeners cuando ya no sean necesariosnew
        socket.off("NEW_MESSAGE_RECEIVED");
        socket.off("NEW_MESSAGE_SENT");
    };
};

export default configureSocketListeners;
