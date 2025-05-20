import { useState } from "react";
import { useSelector } from "react-redux";
import IconUser from "../selectUser/IconUser";
import FormattedTimestamp from "../FormatedTimeStamp";

const MsgSent = (props) => {
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === props.props.UserId);
  //console.log('usuario en msgSent', user);
  
  const message = props.props.message;
  const firstCharMsg = message.slice(0, 4);
  const [isPDF, setIsPDF] = useState(false);

  const userName = user ? user.name : null;

  return (
    <div className="w-full flex justify-end">
      <div className="w-[26rem] h-auto bg-stone-300 rounded-tr-[40px] rounded-bl-[40px] rounded-br-[40px] p-4 flex flex-col justify-between m-4 self-end mr-10">
        <div className="text-center mb-4">
          {firstCharMsg === "http" ? (
            <div>
              <img
                src={message}
                alt="archivo enviado"
                className="w-52 h-auto mx-auto"
                onError={(e) => {
                  e.target.src = "/public/pdf.svg";
                  setIsPDF(true); // Cambia a imagen de PDF si no se puede cargar
                }}
              />
              {isPDF && (
                <a
                  href={message}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[0.5] text-blue-500 underline break-words"
                >
                  {message}
                </a>
              )}
            </div>
          ) : (
            <h2 className="w-[26rem] h-auto text-black text-sm font-normal font-['Inter']">
              {message}
            </h2>
          )}
        </div>
        <div className="flex items-center justify-end gap-4">
          <div className="w-[4.25rem] h-4 text-black text-[0.65rem] font-normal font-['Oswald'] capitalize">
            <FormattedTimestamp timestamp={props.props.timestamp} />
          </div>
          <IconUser name={userName} />
        </div>
      </div>
    </div>
  );
};

export default MsgSent;
