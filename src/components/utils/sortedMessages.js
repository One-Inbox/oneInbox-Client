export const sortedMessagesByTime = (messages, type) => {
  let sortedMessages = [];
  if (Array.isArray(messages)) {
    if (!messages || messages.length === 0) {
      sortedMessages = [];
    } else if (messages.length === 1) {
      sortedMessages = messages;
    } else {
      if (type === "lastFirst") {
        sortedMessages = [...messages].sort(
          (a, b) => b.timestamp - a.timestamp
        );
      } else {
        sortedMessages = [...messages].sort(
          (a, b) => a.timestamp - b.timestamp
        );
      }
    }
    return sortedMessages;
  }
};

export const selectMessage = (messages, type) => {
  console.log("en select message", messages, type);

  const sortedMessages = sortedMessagesByTime(messages, type);
  console.log("sortedMessages", sortedMessages);
  const lastMessage =
    sortedMessages && sortedMessages.length > 0 ? sortedMessages[0] : null;
  return lastMessage;
};
