import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../utils/spinners/Spinner";
import StateMessagesIcons from "../../utils/icons/StateMessagesIcons";
import SocialMediaIcons from "../../utils/icons/socialMediaIcons";
import FormattedTimestamp from "../../utils/FormatedTimeStamp";
import ArchivedButton from "./ArchivedButton";
import IconUser from "../../utils/selectUser/IconUser";
import {
  clearContactAction,
  getContactByIdAction,
} from "../../../redux/actions/actionContact";
import { selectMessage } from "../../utils/sortedMessages";

const DetailTable = ({ state }) => {
  const { contactId } = useParams();
  const dispatch = useDispatch();
  //console.log("contactId", contactId);
  const contact = useSelector((state) => state.contact);
  console.log("contact", contact);
  const msgReceiveds =
    contact && contact.MsgReceiveds && contact.MsgReceiveds.length
      ? contact.MsgReceiveds
      : [];
  console.log("msgReceiveds", msgReceiveds);
  const msgSents =
    contact && contact.MsgSents && contact.MsgSents.length
      ? contact.MsgSents
      : [];
  console.log("msgSents", msgSents);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getContactByIdAction(contactId));
    let timeoutId = null;
    if (!contact) {
      setLoading(true);
      timeoutId = setTimeout(() => {
        setLoading(false);
        navigate(-1); // Redirige a la página anterior si no se encuentra el contacto
      }, 5000); // Espera 5 segundos antes de redirigir
    }
    return () => {
      // 🧹 Limpieza al desmontar o al cambiar contact/msgReceiveds
      if (timeoutId) clearTimeout(timeoutId);
      setLoading(false);
      dispatch(clearContactAction()); // Limpia el contacto del estado
    };
  }, [contactId]);
  const lastMsgReceived = selectMessage(msgReceiveds, "lastFirst");
  console.log("ultimo mensaje recibido", lastMsgReceived);
  const firstMsgReceived = selectMessage(msgReceiveds, "firstFirst");
  console.log("primer mensaje recibido", firstMsgReceived);
  const lastMsgSent = selectMessage(msgSents, "lastFirst");
  // const sortMsgReceiveds =
  //   msgReceiveds && msgReceiveds.length > 1
  //     ? [...msgReceiveds].sort((a, b) => b.timestamp - a.timestamp)
  //     : msgReceiveds;
  // const lastMsgReceived = sortMsgReceiveds ? sortMsgReceiveds[0] : null;
  // console.log("ultimo mensaje recibido", lastMsgReceived);
  // const msgSents = contact && contact.MsgSents ? contact.MsgSents : [];
  // const sortMsgSents =
  //   msgSents && msgSents.length > 1
  //     ? [...msgSents].sort((a, b) => b.timestamp - a.timestamp)
  //     : msgSents;
  // const lastMsgSent = sortMsgSents ? sortMsgSents[0] : null;
  // console.log("ultimo mensaje enviado", lastMsgSent);
  // console.log("estado", state);

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
          {loading ? (
            <Spinner className="mx-auto" />
          ) : (
            //<tr className="odd:bg-white even:bg-stone-300 ">
            <tr className={`${!state ? "bg-white" : "bg-stone-300"}`}>
              <td className="pl-6 pr-4 py-2 text-center">
                <StateMessagesIcons
                  state={lastMsgReceived && lastMsgReceived.state}
                  archived={lastMsgReceived && lastMsgReceived.archived}
                />
              </td>
              <td className="px-4 py-2 text-center text-[0.65rem] font-normal font-['Inter'] capitalize">
                {firstMsgReceived && firstMsgReceived.timestamp ? (
                  <FormattedTimestamp timestamp={firstMsgReceived.timestamp} />
                ) : (
                  <span>sin fecha</span>
                )}
              </td>
              <td className="px-[1.75rem] py-2 text-center w-5 h-5">
                <SocialMediaIcons
                  socialMedia={
                    contact.SocialMedium && contact.SocialMedium.name
                      ? contact.SocialMedium.name.toUpperCase()
                      : "RED SOCIAL"
                  }
                />
              </td>
              <td className="px-4 py-2 text-center text-xs font-normal font-['Inter'] capitalize">
                {firstMsgReceived && firstMsgReceived.name}
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
                {lastMsgSent && lastMsgSent.timestamp ? (
                  <FormattedTimestamp timestamp={lastMsgSent.timestamp} />
                ) : (
                  <span>sin fecha</span>
                )}
              </td>
              <td className="pl-8 pr-4 py-2 text-center ">
                <ArchivedButton
                  messageId={lastMsgReceived && lastMsgReceived.id}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default DetailTable;
