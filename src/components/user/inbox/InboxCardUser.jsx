import { useDispatch, useSelector } from "react-redux";
import StateMessagesIcons from "../../utils/icons/StateMessagesIcons";
import SocialMediaIcons from "../../utils/icons/socialMediaIcons";
import FormattedTimestamp from "../../utils/FormatedTimeStamp";
import {
  updateStateToReadMessageReceivedAction,
  setActiveMessageAction,
} from "../../../redux/actions/actionMessages";

const InboxCardUser = ({
  id,
  name,
  state,
  timestamp,
  SocialMedium,
  ContactId,
  messagesReceived,
}) => {
  const dispatch = useDispatch();

  const socialMediaName =
    SocialMedium && SocialMedium.name
      ? SocialMedium.name.toUpperCase()
      : "RED SOCIAL";
  //const upperSMName = socialMediaName && socialMediaName.toUpperCase();
 // console.log("inboxUser", socialMediaName);

  const msgActive = useSelector((state) => state.messageActive);

  const allMsgByContact =
    messagesReceived &&
    messagesReceived.filter((message) => message.ContactId === ContactId);
  const noReadMsg =
    allMsgByContact &&
    allMsgByContact.filter((message) => message.state === "No Leidos");
  //console.log("mensajes", allMsgByContact);

  const onClickHandler = (id) => {
    if (msgActive && msgActive !== id) {
      dispatch(setActiveMessageAction(""));
      dispatch(setActiveMessageAction(id));
    }
    dispatch(setActiveMessageAction(id));

    if (noReadMsg) {
      //console.log('depacho la action para mensajes nuevos:', noReadMsg);
      //noReadMsg.forEach((message) => message && message.status && console.log(message.status));
      noReadMsg.forEach((message) =>
       dispatch(updateStateToReadMessageReceivedAction(message.id))
      );
    }
  };

  return (
    <button
      className="bg-transparent border-none m-0 p-0"
      onClick={() => onClickHandler(id)}
    >
      {msgActive && msgActive === id ? (
        <div className="w-64 h-24 relative shadow-inner bg-white flex items-center justify-between p-2">
          <div className="w-full h-full flex items-center justify-between bg-transparent border-l-4 border-t-4 border-b-4 border-amber-500">
            <div className="flex items-center">  
              <div className="w-11 h-auto opacity-90 rounded-full border-2 border-white ml-2">
                <SocialMediaIcons socialMedia={socialMediaName} />
              </div>
              <div className="flex flex-col justify-center ">
                <span className="text-black text-base font-normal font-['Oswald'] capitalize">
                  {name}
                  <br />
                </span>
                <span className="text-black  text-[0.65rem] font-normal font-['Oswald'] capitalize">
                  <FormattedTimestamp timestamp={timestamp} />
                  <br />
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end mr-4">
              <div className="w-8 h-8 bg-white rounded-full mb-1">
                <StateMessagesIcons state={state} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-64 h-24 relative shadow-inner bg-green-400 flex items-center justify-between p-2">
          
          <div className="w-11 h-auto opacity-90 rounded-full border-2 border-white mr-2">
            <SocialMediaIcons socialMedia={socialMediaName} />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-black text-base font-normal font-['Oswald'] capitalize">
              {name}
              <br />
            </span>
            <div className="text-black text-[0.65rem] font-normal font-['Oswald'] capitalize">
              <FormattedTimestamp timestamp={timestamp} />
              <br />
            </div>
          </div>
          <div className="flex flex-col items-end mr-6">
            <div className="w-8 h-8 bg-white rounded-full mb-1">
              <StateMessagesIcons state={state} />
            </div>
          </div>
        </div>
      )}
    </button>
  );
};

export default InboxCardUser;
