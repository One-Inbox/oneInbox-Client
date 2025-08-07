// export const sortedMessagesByTime = (messages, type) => {
//   let sortedMessages = [];
//   if (Array.isArray(messages)) {
//     if (!messages || messages.length === 0) {
//       sortedMessages = [];
//     } else if (messages.length === 1) {
//       sortedMessages = messages;
//     } else {
//       if (type === "lastFirst") {
//         sortedMessages = [...messages].sort(
//           (a, b) => b.timestamp - a.timestamp
//         );
//       } else {
//         sortedMessages = [...messages].sort(
//           (a, b) => a.timestamp - b.timestamp
//         );
//       }
//     }
//     return sortedMessages;
//   }
// };
// export const sortedMessagesByTime = (messages, type = "firstFirst") => {
//   if (!Array.isArray(messages) || messages.length === 0) return [];

//   return [...messages].sort((a, b) => {
//     const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
//     const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;

//     return type === "lastFirst" ? timeB - timeA : timeA - timeB;
//   });
// };
import timeStampToISO from "./timeStampToISO";

export const sortedMessagesByTime = (messages, type) => {
  if (!Array.isArray(messages)) return [];

  if (messages.length <= 1) return messages;

  // Normalizar timestamps a ISO antes de ordenar
  const messagesNormalized = messages.map((msg) => ({
    ...msg,
    timestampISO: timeStampToISO(msg.timestamp),
  }));

  if (type === "lastFirst") {
    return messagesNormalized.sort((a, b) =>
      b.timestampISO.localeCompare(a.timestampISO)
    );
  } else {
    return messagesNormalized.sort((a, b) =>
      a.timestampISO.localeCompare(b.timestampISO)
    );
  }
};

export const selectMessage = (messages, type) => {
  const sortedMessages = sortedMessagesByTime(messages, type);
  const lastMessage =
    sortedMessages && sortedMessages.length > 0 ? sortedMessages[0] : null;
  return lastMessage;
};
