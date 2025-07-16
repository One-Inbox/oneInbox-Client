import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateArchivedMessageReceivedAction,
  getMessageReceivedByIdAction,
} from "../../../redux/actions/actionMessages";

const ArchivedButton = ({ messageId }) => {
  const dispatch = useDispatch();
  const message = useSelector((state) =>
    state.messagesReceived.find((msg) => msg.id === messageId)
  );
  const isArchived = message && message.archived;
  useEffect(() => {
    dispatch(getMessageReceivedByIdAction(messageId));
  }, [isArchived, messageId, dispatch]);

  const handlerOnClick = () => {
    dispatch(updateArchivedMessageReceivedAction(messageId));
    console.log("me archivo");
  };

  return (
    <div>
      {isArchived ? (
        <img
          src={"/managmentIcons/unarchive-icon.svg"}
          className="w-8 h-auto"
          onClick={handlerOnClick}
          alt="desarchivar"
        />
      ) : (
        <img
          src={"/managmentIcons/archive-icon.svg"}
          className="w-8 h-auto"
          onClick={handlerOnClick}
          alt="archivar"
        />
      )}
    </div>
  );
};

export default ArchivedButton;
