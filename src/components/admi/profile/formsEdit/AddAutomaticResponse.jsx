import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import FormExitButton from "../../../utils/buttons/FormExitButton";
import GetDayOfWeek from "../GetDayOfWeek";
import SocialMediaIcons from "../../../utils/icons/socialMediaIcons";
import {
  getAllSocialMediaByBusinessAction,
  updateAutomaticResponseAction,
} from "../../../../redux/actions/actionSocialMedia";
import {
  sweetAlertsError,
  sweetAlertsSuccessfully,
  sweetAlertsMessage,
} from "../../../utils/alerts/alerts";

// const AddAutomaticResponse = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const socialMediaActive = useSelector((state) => state.socialMediaActive);
//   const business = useSelector((state) => state.business);
//   const businessId = business.id || sessionStorage.getItem("businessId");
//   const dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
//   const socialMediaSorted = socialMediaActive.sort((a, b) =>
//     a.SocialMedia[0].name.localeCompare(b.SocialMedia[0].name)
//   );
//   const [socialMediaToUpdate, setSocialMediaToUpdate] = useState([]);
//   const [dayToUpdate, setDayToUpdate] = useState([]);
//   const [input, setInput] = useState({
//     startHour: "",
//     endHour: "",
//     message: "",
//   });

//   const onChangeCheckboxSocialM = (e) => {
//     if (e.target.checked) {
//       setSocialMediaToUpdate((prev) => [...prev, e.target.value]);
//     } else {
//       setSocialMediaToUpdate((prev) =>
//         prev.filter((d) => d !== e.target.value)
//       );
//     }
//   };

//   const onChangeCheckboxDay = (e) => {
//     if (e.target.checked) {
//       setDayToUpdate((prev) => [...prev, e.target.value]);
//     } else {
//       setDayToUpdate((prev) => prev.filter((d) => d !== e.target.value));
//     }
//   };

//   const handlerInputChange = (e) => {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (!socialMediaToUpdate.length)
//       throw new Error("Debe seleccionar al menos una red social");
//     if (!dayToUpdate.length)
//       throw new Error("Debe seleccionar al menos un día de la semana");
//     if (!input.message.trim())
//       throw new Error("El mensaje no puede estar vacío");
//     try {
//       const allData = [];
//       const daysSorted = dayToUpdate.sort((a, b) => a - b);
//       await daysSorted.forEach((day) => {
//         let newAutomaticResponse = { day: Number(day), ...input };
//         allData.push(newAutomaticResponse);
//       });
//       // await socialMediaToUpdate.forEach((sm) => {
//       //   console.log("actualizo respuesta automatica para:", sm, allData);

//       //   dispatch(updateAutomaticResponseAction(sm, allData));
//       // });
//       for (const sm of socialMediaToUpdate) {
//         console.log("actualizo respuesta automatica para:", sm, allData);
//         await dispatch(updateAutomaticResponseAction(sm, allData));
//       }
//       sweetAlertsSuccessfully(
//         "Exito",
//         "Respuesta automática creada correctamente",
//         "Ok"
//       );
//       await dispatch(getAllSocialMediaByBusinessAction(business.id));
//     } catch (error) {
//       sweetAlertsError("Error", `${error.message}. Intente nuevamente`, "Ok");
//     } finally {
//       setInput({
//         startHour: "",
//         endHour: "",
//         message: "",
//       });
//       setSocialMediaToUpdate([]);
//       setDayToUpdate([]);
//       navigate(-1);
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex flex-col items-center justify-center bg-stone-300">
//       <div className="w-[48.5rem] h-auto bg-sky-950 rounded-[50px] relative">
//         <form onSubmit={submitHandler} className="px-12 py-10">
//           {/* Botón de salida */}
//           <div className="absolute top-6 right-10">
//             <FormExitButton path={"/dashboardAdmi/profile"} />
//           </div>

//           {/* Título */}
//           <div className="flex flex-col items-center mb-8">
//             <h4 className="text-white font-normal font-['Oswald'] uppercase">
//               agregar nueva respuesta automática
//             </h4>
//           </div>

//           {/* Redes sociales */}
//           {!socialMediaActive || !socialMediaActive.length ? (
//             <p className="text-white text-sm">
//               No hay redes sociales activas a las cuales asociar respuestas
//               automáticas
//             </p>
//           ) : (
//             <>
//               <fieldset className="mb-6">
//                 <legend className="text-white text-sm font-normal font-['Oswald'] uppercase mb-2">
//                   redes sociales:
//                 </legend>
//                 <div className="flex flex-wrap gap-x-10 gap-y-4">
//                   {socialMediaSorted.map((sm) => (
//                     <label
//                       key={sm.id}
//                       className="flex items-center gap-2 cursor-pointer"
//                     >
//                       <input
//                         className="w-4 h-4 accent-amber-400"
//                         id={sm.id}
//                         type="checkbox"
//                         value={sm.id}
//                         name="redes sociales"
//                         onChange={onChangeCheckboxSocialM}
//                         checked={socialMediaToUpdate.some(
//                           (id) => String(id) === String(sm.id)
//                         )}
//                       />
//                       <span className="w-8 h-8 flex items-center justify-center">
//                         <SocialMediaIcons
//                           socialMedia={sm.SocialMedia[0].name}
//                         />
//                       </span>
//                       <span className="text-white text-sm font-normal font-['Inter'] lowercase">
//                         {sm.SocialMedia[0].name}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>

//               {/* Días de la semana */}
//               <fieldset className="mb-8">
//                 <legend className="text-white text-sm font-normal font-['Oswald'] uppercase mb-2">
//                   días de la semana:
//                 </legend>
//                 <div className="flex gap-4 flex-wrap">
//                   {dayOfWeek.map((day) => (
//                     <label
//                       key={day}
//                       className="flex items-center gap-4 cursor-pointer mt-2"
//                     >
//                       <input
//                         className="w-4 h-4 accent-amber-400"
//                         id={day}
//                         type="checkbox"
//                         value={day}
//                         name="dias de la semana"
//                         onChange={onChangeCheckboxDay}
//                         checked={dayToUpdate.some(
//                           (d) => Number(d) === Number(day)
//                         )}
//                       />
//                       <span className="text-white text-sm font-normal font-['Inter']">
//                         {GetDayOfWeek(day)}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>

//               {/* Horario laboral */}
//               <div className="mb-8">
//                 <h3 className="text-white text-sm font-normal font-['Oswald'] uppercase mb-3">
//                   horario laboral
//                 </h3>
//                 <div className="flex gap-52">
//                   <div className="flex items-center gap-3 ml-6">
//                     <label
//                       htmlFor="startHour"
//                       className="text-white text-sm font-normal font-['Oswald'] uppercase"
//                     >
//                       Hora de inicio:
//                     </label>
//                     <input
//                       className="w-28 h-8 bg-white rounded-full shadow-inner px-3 text-sm font-normal font-['Inter']"
//                       id="startHour"
//                       type="time"
//                       value={input.startHour}
//                       name="startHour"
//                       onChange={handlerInputChange}
//                       min="00:00"
//                       max="23:59"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <label
//                       htmlFor="endHour"
//                       className="text-white text-sm font-normal font-['Oswald'] uppercase"
//                     >
//                       Hora de cierre:
//                     </label>
//                     <input
//                       className="w-28 h-8 bg-white rounded-full shadow-inner px-3 text-sm font-normal font-['Inter']"
//                       id="endHour"
//                       type="time"
//                       value={input.endHour}
//                       name="endHour"
//                       onChange={handlerInputChange}
//                       min="00:00"
//                       max="23:59"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Respuesta automática */}
//               <div className="mb-8">
//                 <label
//                   htmlFor="message"
//                   className="text-white text-sm font-normal font-['Oswald'] uppercase block mb-2"
//                 >
//                   respuesta automática:
//                 </label>
//                 <textarea
//                   placeholder="Ingrese mensaje para respuesta automática"
//                   className="w-full h-20 bg-white rounded-2xl shadow-inner px-3 py-2 text-sm font-normal font-['Inter'] resize-none"
//                   id="message"
//                   value={input.message}
//                   name="message"
//                   onChange={handlerInputChange}
//                   required
//                 />
//               </div>
//             </>
//           )}

//           {/* Botón submit */}
//           <div className="flex justify-center mb-8">
//             <button
//               type="submit"
//               className="bg-transparent border-none outline-none"
//             >
//               <img
//                 src={"/actionIcons/next icon.svg"}
//                 className="w-8 h-auto"
//                 onMouseOver={(e) =>
//                   (e.currentTarget.src = "/actionIcons/next hover icon.svg")
//                 }
//                 onMouseOut={(e) =>
//                   (e.currentTarget.src = "/actionIcons/next icon.svg")
//                 }
//                 alt="next"
//               />
//             </button>
//           </div>
//         </form>

//         {/* Logo */}
//         <img
//           src="/logos/logo.svg"
//           className="w-24 h-auto absolute bottom-10 right-10"
//         />
//       </div>
//     </div>
//   );
// };

// export default AddAutomaticResponse;

const AddAutomaticResponse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socialMediaActive = useSelector((state) => state.socialMediaActive);
  const business = useSelector((state) => state.business);
  const businessId = business.id || sessionStorage.getItem("businessId");
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
  const [socialMediaToUpdate, setSocialMediaToUpdate] = useState([]);
  const [dayToUpdate, setDayToUpdate] = useState([]);
  const [input, setInput] = useState({
    startHour: "",
    endHour: "",
    message: "",
  });

  // Efecto para cargar datos al montar el componente o cuando se refresca la página
  useEffect(() => {
    const loadData = async () => {
      if (businessId) {
        try {
          await dispatch(getAllSocialMediaByBusinessAction(businessId));
          setHasLoaded(true);
        } catch (error) {
          console.error("Error loading social media:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    // Si no hay socialMediaActive o está vacío y no se ha cargado antes, cargar datos
    if (!hasLoaded && (!socialMediaActive || socialMediaActive.length === 0)) {
      loadData();
    } else if (socialMediaActive) {
      // Si ya hay datos, no está cargando
      setIsLoading(false);
      setHasLoaded(true);
    }
  }, [dispatch, businessId, socialMediaActive, hasLoaded]);

  // Crear socialMediaSorted solo cuando hay datos
  const socialMediaSorted = useMemo(() => {
    return socialMediaActive && socialMediaActive.length > 0
      ? socialMediaActive.sort((a, b) =>
          a.SocialMedia[0].name.localeCompare(b.SocialMedia[0].name)
        )
      : [];
  }, [socialMediaActive]);

  const onChangeCheckboxSocialM = (e) => {
    if (e.target.checked) {
      setSocialMediaToUpdate((prev) => [...prev, e.target.value]);
    } else {
      setSocialMediaToUpdate((prev) =>
        prev.filter((d) => d !== e.target.value)
      );
    }
  };

  const onChangeCheckboxDay = (e) => {
    if (e.target.checked) {
      setDayToUpdate((prev) => [...prev, e.target.value]);
    } else {
      setDayToUpdate((prev) => prev.filter((d) => d !== e.target.value));
    }
  };

  const handlerInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!socialMediaToUpdate.length)
      throw new Error("Debe seleccionar al menos una red social");
    if (!dayToUpdate.length)
      throw new Error("Debe seleccionar al menos un día de la semana");
    if (!input.message.trim())
      throw new Error("El mensaje no puede estar vacío");
    try {
      const allData = [];
      const daysSorted = dayToUpdate.sort((a, b) => a - b);
      daysSorted.forEach((day) => {
        let newAutomaticResponse = { day: Number(day), ...input };
        allData.push(newAutomaticResponse);
      });

      for (const sm of socialMediaToUpdate) {
        console.log("actualizo respuesta automatica para:", sm, allData);
        await dispatch(updateAutomaticResponseAction(sm, allData));
      }

      sweetAlertsSuccessfully(
        "Exito",
        "Respuesta automática creada correctamente",
        "Ok"
      );
      await dispatch(getAllSocialMediaByBusinessAction(businessId));
    } catch (error) {
      sweetAlertsError("Error", `${error.message}. Intente nuevamente`, "Ok");
    } finally {
      setInput({
        startHour: "",
        endHour: "",
        message: "",
      });
      setSocialMediaToUpdate([]);
      setDayToUpdate([]);
      navigate(-1);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-stone-300">
      <div className="w-[48.5rem] h-auto bg-sky-950 rounded-[50px] relative">
        <form onSubmit={submitHandler} className="px-12 py-10">
          {/* Botón de salida */}
          <div className="absolute top-6 right-10">
            <FormExitButton path={"/dashboardAdmi/profile"} />
          </div>

          {/* Título */}
          <div className="flex flex-col items-center mb-8">
            <h4 className="text-white font-normal font-['Oswald'] uppercase">
              agregar nueva respuesta automática
            </h4>
          </div>

          {/* Contenido condicionado por loading */}
          {isLoading ? (
            <div className="flex flex-col items-center my-8">
              <p className="text-white text-sm">Cargando redes sociales...</p>
            </div>
          ) : !socialMediaSorted.length ? (
            <div className="flex flex-col items-center my-8">
              <p className="text-white text-sm">
                No hay redes sociales activas a las cuales asociar respuestas
                automáticas
              </p>
            </div>
          ) : (
            <>
              <fieldset className="mb-6">
                <legend className="text-white text-sm font-normal font-['Oswald'] uppercase mb-2">
                  redes sociales:
                </legend>
                <div className="flex flex-wrap gap-x-10 gap-y-4">
                  {socialMediaSorted.map((sm) => (
                    <label
                      key={sm.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        className="w-4 h-4 accent-amber-400"
                        id={sm.id}
                        type="checkbox"
                        value={sm.id}
                        name="redes sociales"
                        onChange={onChangeCheckboxSocialM}
                        checked={socialMediaToUpdate.some(
                          (id) => String(id) === String(sm.id)
                        )}
                      />
                      <span className="w-8 h-8 flex items-center justify-center">
                        <SocialMediaIcons
                          socialMedia={sm.SocialMedia[0].name}
                        />
                      </span>
                      <span className="text-white text-sm font-normal font-['Inter'] lowercase">
                        {sm.SocialMedia[0].name}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Días de la semana */}
              <fieldset className="mb-8">
                <legend className="text-white text-sm font-normal font-['Oswald'] uppercase mb-2">
                  días de la semana:
                </legend>
                <div className="flex gap-4 flex-wrap">
                  {dayOfWeek.map((day) => (
                    <label
                      key={day}
                      className="flex items-center gap-4 cursor-pointer mt-2"
                    >
                      <input
                        className="w-4 h-4 accent-amber-400"
                        id={day}
                        type="checkbox"
                        value={day}
                        name="dias de la semana"
                        onChange={onChangeCheckboxDay}
                        checked={dayToUpdate.some(
                          (d) => Number(d) === Number(day)
                        )}
                      />
                      <span className="text-white text-sm font-normal font-['Inter']">
                        {GetDayOfWeek(day)}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Horario laboral */}
              <div className="mb-8">
                <h3 className="text-white text-sm font-normal font-['Oswald'] uppercase mb-3">
                  horario laboral
                </h3>
                <div className="flex gap-52">
                  <div className="flex items-center gap-3 ml-6">
                    <label
                      htmlFor="startHour"
                      className="text-white text-sm font-normal font-['Oswald'] uppercase"
                    >
                      Hora de inicio:
                    </label>
                    <input
                      className="w-28 h-8 bg-white rounded-full shadow-inner px-3 text-sm font-normal font-['Inter']"
                      id="startHour"
                      type="time"
                      value={input.startHour}
                      name="startHour"
                      onChange={handlerInputChange}
                      min="00:00"
                      max="23:59"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="endHour"
                      className="text-white text-sm font-normal font-['Oswald'] uppercase"
                    >
                      Hora de cierre:
                    </label>
                    <input
                      className="w-28 h-8 bg-white rounded-full shadow-inner px-3 text-sm font-normal font-['Inter']"
                      id="endHour"
                      type="time"
                      value={input.endHour}
                      name="endHour"
                      onChange={handlerInputChange}
                      min="00:00"
                      max="23:59"
                    />
                  </div>
                </div>
              </div>

              {/* Respuesta automática */}
              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="text-white text-sm font-normal font-['Oswald'] uppercase block mb-2"
                >
                  respuesta automática:
                </label>
                <textarea
                  placeholder="Ingrese mensaje para respuesta automática"
                  className="w-full h-20 bg-white rounded-2xl shadow-inner px-3 py-2 text-sm font-normal font-['Inter'] resize-none"
                  id="message"
                  value={input.message}
                  name="message"
                  onChange={handlerInputChange}
                  required
                />
              </div>
            </>
          )}

          {/* Botón submit - solo mostrar si hay redes sociales */}
          {!isLoading && socialMediaSorted.length > 0 && (
            <div className="flex justify-center mb-8">
              <button
                type="submit"
                className="bg-transparent border-none outline-none"
              >
                <img
                  src={"/actionIcons/next icon.svg"}
                  className="w-8 h-auto"
                  onMouseOver={(e) =>
                    (e.currentTarget.src = "/actionIcons/next hover icon.svg")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.src = "/actionIcons/next icon.svg")
                  }
                  alt="next"
                />
              </button>
            </div>
          )}
        </form>

        {/* Logo */}
        <img
          src="/logos/logo.svg"
          className="w-24 h-auto absolute bottom-10 right-10"
        />
      </div>
    </div>
  );
};
export default AddAutomaticResponse;
