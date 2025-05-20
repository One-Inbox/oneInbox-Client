import { useSelector } from "react-redux";
import Spinner from "../../utils/spinners/Spinner";
import StateMessagesIcons from "../../utils/icons/StateMessagesIcons";
import SocialMediaIcons from "../../utils/icons/socialMediaIcons";
import FormattedTimestamp from "../../utils/FormatedTimeStamp";
import ArchivedButton from "./ArchivedButton";
import IconUser from "../../utils/selectUser/IconUser";

const DetailTable = ({ state }) => {
  const contact = useSelector((state) => state.contact);
  console.log("contacto", contact);
  const sortMsgReceiveds = contact.MsgReceiveds.sort(
    (a, b) => b.timestamp - b.timestamp
  );
  const lastMsgReceived = sortMsgReceiveds[0];
  console.log("ultimo mensaje recibido", lastMsgReceived);

  const sortMsgSents = contact.MsgSents.sort(
    (a, b) => b.timestamp - b.timestamp
  );
  const lastMsgSent = sortMsgSents[0];
  console.log("ultimo mensaje enviado", lastMsgSent);
  console.log("estado", state);

  return (
    <div>
      <table className="min-w-full table-auto bg-white ">
        <thead className="bg-stone-200 shadow-md relative z-10">
          <tr>
            <th className=" px-4 py-2 text-xs text-center text-normal font-['Oswald']">
              ESTADO
            </th>
            <th className="px-4 py-2 text-xs text-center text-normal font-['Oswald']">
              INICIO
            </th>
            <th className="px-4 py-2 text-xs text-center text-normal font-['Oswald'] whitespace-nowrap">
              RED SOCIAL
            </th>
            <th className="px-4 py-2 text-xs text-center text-normal font-['Oswald']">
              DATOS DEL CONTACTO
            </th>
            <th className="px-4 py-2 text-xs text-center text-normal font-['Oswald']">
              USUARIO
            </th>
            <th className="px-4 py-2 text-xs text-center text-normal font-['Oswald']">
              RESPUESTA
            </th>
            <th className="px-4 py-2 text-xs text-center text-normal font-['Oswald']">
              ARCHIVAR
            </th>
          </tr>
        </thead>
        <tbody className="overflow-x-auto">
          {!contact ? (
            <Spinner />
          ) : (
            //<tr className="odd:bg-white even:bg-stone-300 ">
            <tr className={`${!state ? "bg-white" : "bg-stone-300"}`}>
              <td className="pl-6 pr-4 py-2 text-center">
                <StateMessagesIcons
                  state={lastMsgReceived && lastMsgReceived.state}
                />
              </td>
              <td className="px-4 py-2 text-center text-[0.65rem] font-normal font-['Inter'] capitalize">
                <FormattedTimestamp
                  timestamp={lastMsgReceived && lastMsgReceived.timestamp}
                />
              </td>
              <td className="px-[1.75rem] py-2 text-center w-5 h-5">
                <SocialMediaIcons
                  socialMedia={
                    contact.SocialMedium && contact.SocialMedium.name
                      ? contact.SocialMedium.name
                      : null
                  }
                />
              </td>
              <td className="px-4 py-2 text-center text-xs font-normal font-['Inter'] capitalize">
                {contact.name}
              </td>
              <td className="pl-6 pr-4 py-2 text-center w-6 h-6 ">
                <IconUser
                  name={
                    lastMsgSent && lastMsgSent.User
                      ? lastMsgSent.User.name
                      : null
                  }
                  customSize="w-8 h-8 text-base"
                />
              </td>
              <td className="px-4 py-2 text-center text-[0.65rem] font-normal font-['Inter'] capitalize">
                <FormattedTimestamp
                  timestamp={lastMsgSent ? lastMsgSent.timestamp : null}
                />
              </td>
              <td className="pl-8 pr-4 py-2 text-center ">
                <ArchivedButton />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default DetailTable;
