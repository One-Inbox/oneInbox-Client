import { useMemo } from "react";
import { useSelector } from "react-redux";
import groupDaysByContent from "./groupDaysByContent.js";
import SocialMediaIcons from "../../../../../utils/icons/socialMediaIcons";
//import EditAtomaticResponseButton from "./EditAutomaticResponseButton.jsx";
import DeleteAutomaticResponseButton from "./DeleteAutomaticResponseButton.jsx";
import GetDayOfWeek from "../../../GetDayOfWeek.js";

const AutomaticMessagesData = () => {
  const business = useSelector((state) => state.business);
  const socialMedia = useSelector((state) => state.socialMediaActive);
  console.log("socialmedia", socialMedia);

  // const automaticResponseActive =
  //   socialMedia &&
  //   socialMedia.filter((sm) => sm.automaticResponse.active === true);

  // const groupsByDay =
  //   automaticResponseActive && automaticResponseActive.length
  //     ? groupDaysByContent(automaticResponseActive)
  //     : [];
  // Usar useMemo para recalcular cuando socialMedia cambie
  const automaticResponseActive = useMemo(() => {
    return (
      socialMedia &&
      socialMedia.filter((sm) => sm.automaticResponse.active === true)
    );
  }, [socialMedia]);

  const groupsByDay = useMemo(() => {
    return automaticResponseActive && automaticResponseActive.length
      ? groupDaysByContent(automaticResponseActive)
      : [];
  }, [automaticResponseActive]);
  console.log("groupsByDay", groupsByDay);

  return (
    <div className="w-[48.5rem] h-auto bg-neutral-200 rounded-tr-[50px] rounded-bl-[50px] rounded-br-[50px] relative">
      <div className="flex flex-col items-center pt-4 mt-2">
        <h1 className="text-base font-normal font-['Oswald'] uppercase">
          Respuestas automáticas
        </h1>
        <p className="text-xs font-normal font-['Inter'] text-center">
          Asignadas Para Enviarse Fuera Del Horario De Atención
        </p>
      </div>

      {!groupsByDay.length ? (
        <div className="flex flex-col items-center my-6 pb-6">
          <p className="text-sm font-normal font-['Inter']">
            Aún no hay Respuestas Automáticas activas en {business.name}
          </p>
        </div>
      ) : (
        <div>
          {groupsByDay.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Iconos de redes sociales */}
              <div className="flex flex-row mt-2 px-4">
                {group.socialMedia &&
                  group.socialMedia.map((sm, index) => (
                    <div key={index} className="mr-2 w-8">
                      <SocialMediaIcons socialMedia={sm} />
                    </div>
                  ))}
              </div>

              {/* Subgrupos */}
              {group.subgroups &&
                group.subgroups.map((sg, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex flex-row justify-between px-12 mt-4 mx-4 ">
                      {/* Días */}
                      <div className="flex flex-row">
                        <h3 className="text-sm font-normal font-['Oswald'] uppercase">
                          días:
                        </h3>
                        <span className="text-sm font-normal font-['Inter'] ml-2">
                          {sg.days &&
                            sg.days.map((d) => GetDayOfWeek(d)).join(", ")}
                        </span>
                      </div>

                      {/* Horarios */}
                      <div className="flex flex-row ">
                        <h3 className="text-sm font-normal font-['Oswald'] uppercase">
                          horario atención:
                        </h3>
                        <span className="text-sm font-normal font-['Inter'] ml-2">
                          {sg.pattern.startHour && sg.pattern.endHour
                            ? `${sg.pattern.startHour} - ${sg.pattern.endHour}`
                            : " - "}
                        </span>
                      </div>

                      {/* Botón de eliminar */}
                      <div>
                        <DeleteAutomaticResponseButton
                          socialMediaActiveIds={sg.socialMediaActiveIds}
                          days={sg.days}
                        />
                      </div>
                    </div>

                    {/* Respuesta automática */}
                    <div className="px-12 pb-4 mx-4 ">
                      <div className="flex flex-row">
                        <h3 className="text-sm font-normal font-['Oswald'] uppercase">
                          respuesta automática asignada:
                        </h3>
                        <span className="text-sm font-normal font-['Inter'] ml-2">
                          {sg.pattern.message}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutomaticMessagesData;
