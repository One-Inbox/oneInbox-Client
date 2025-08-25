// import getYearAndMonth from "../utilsMetrics/getYearAndMonth";
// import getTotalMinutes from "../utilsMetrics/getTotalMinutes";

// const processResponseTimes = (conversation) => {
//   const idealTimeToResponse = { min: 60, max: 90 };
//   let beforeTime = 0;
//   let onTime = 0;
//   let afterTime = 0;

//   // Función auxiliar para verificar si un día es el último del mes
//   const isLastDayOfMonth = (year, month, day) => {
//     const nextDay = new Date(year, month - 1, day + 1);
//     return nextDay.getMonth() !== month - 1;
//   };

//   // Encontrar pares de received=true seguido de received=false
//   for (let i = 0; i < conversation.length - 1; i++) {
//     const currentMsg = conversation[i];

//     // Si el mensaje actual es received=true, buscar el siguiente received=false
//     if (currentMsg.received === true) {
//       // Buscar el siguiente mensaje con received=false
//       for (let j = i + 1; j < conversation.length; j++) {
//         const nextMsg = conversation[j];

//         if (nextMsg.received === false) {
//           // Calcular la diferencia de tiempo
//           const receivedDate = getYearAndMonth(currentMsg.timestamp);
//           const sentDate = getYearAndMonth(nextMsg.timestamp);

//           // Caso 1: Meses diferentes
//           if (receivedDate.month !== sentDate.month) {
//             // Si el día del primer parámetro no es el último del mes, suma a afterTime
//             if (
//               !isLastDayOfMonth(
//                 receivedDate.year,
//                 receivedDate.month,
//                 receivedDate.day
//               )
//             ) {
//               afterTime++;
//             } else {
//               // Es el último día del mes, procesar normalmente
//               const receivedMinutes = getTotalMinutes(currentMsg.timestamp);
//               const minutesUntilMidnight = 24 * 60 - receivedMinutes;
//               const sentMinutes = getTotalMinutes(nextMsg.timestamp);
//               const totalTimeDifference = minutesUntilMidnight + sentMinutes;

//               if (totalTimeDifference < idealTimeToResponse.min) {
//                 beforeTime++;
//               } else if (totalTimeDifference > idealTimeToResponse.max) {
//                 afterTime++;
//               } else {
//                 onTime++;
//               }
//             }
//           }
//           // Caso 2: Mismo mes, días diferentes
//           else if (receivedDate.day !== sentDate.day) {
//             const dayDifference = sentDate.day - receivedDate.day;

//             // Si no son días consecutivos (diferencia != 1)
//             if (dayDifference !== 1) {
//               afterTime++;
//             } else {
//               // Son días consecutivos, verificar la hora del primer mensaje
//               const receivedMinutes = getTotalMinutes(currentMsg.timestamp);
//               const cutoffTime = 22 * 60 + 30; // 22:30 en minutos

//               if (receivedMinutes < cutoffTime) {
//                 afterTime++;
//               } else {
//                 // Calcular minutos hasta cambio de día + minutos del día siguiente
//                 const minutesUntilMidnight = 24 * 60 - receivedMinutes;
//                 const sentMinutes = getTotalMinutes(nextMsg.timestamp);
//                 const totalTimeDifference = minutesUntilMidnight + sentMinutes;

//                 if (totalTimeDifference < idealTimeToResponse.min) {
//                   beforeTime++;
//                 } else if (totalTimeDifference > idealTimeToResponse.max) {
//                   afterTime++;
//                 } else {
//                   onTime++;
//                 }
//               }
//             }
//           }
//           // Caso 3: Mismo día
//           else {
//             const receivedMinutes = getTotalMinutes(currentMsg.timestamp);
//             const sentMinutes = getTotalMinutes(nextMsg.timestamp);
//             const timeDifference = sentMinutes - receivedMinutes;

//             // Clasificar según el tiempo de respuesta
//             if (timeDifference < idealTimeToResponse.min) {
//               beforeTime++;
//             } else if (timeDifference > idealTimeToResponse.max) {
//               afterTime++;
//             } else {
//               onTime++;
//             }
//           }

//           // Romper el bucle interno ya que encontramos el received=false correspondiente
//           break;
//         }
//       }
//     }
//   }

//   return {
//     beforeTime,
//     onTime,
//     afterTime,
//   };
// };

// export default processResponseTimes;

import getYearAndMonth from "../utilsMetrics/getYearAndMonth";
import getTotalMinutes from "../utilsMetrics/getTotalMinutes";

const processResponseTimes = (conversation) => {
  const idealTimeToResponse = { min: 60, max: 90 };
  let beforeTime = 0;
  let onTime = 0;
  let afterTime = 0;

  // Función auxiliar para verificar si un día es el último del mes
  const isLastDayOfMonth = (year, month, day) => {
    const nextDay = new Date(year, month - 1, day + 1);
    return nextDay.getMonth() !== month - 1;
  };

  // Encontrar pares de received=true seguido de received=false
  for (let i = 0; i < conversation.length; i++) {
    const currentMsg = conversation[i];

    // Si el mensaje actual es received=true, buscar el siguiente received=false
    if (currentMsg.received === true) {
      let foundResponse = false; // Variable para rastrear si se encontró respuesta

      // Buscar el siguiente mensaje con received=false
      for (let j = i + 1; j < conversation.length; j++) {
        const nextMsg = conversation[j];

        if (nextMsg.received === false) {
          foundResponse = true; // Se encontró una respuesta

          // Calcular la diferencia de tiempo
          const receivedDate = getYearAndMonth(currentMsg.timestamp);
          const sentDate = getYearAndMonth(nextMsg.timestamp);

          // Caso 1: Meses diferentes
          if (receivedDate.month !== sentDate.month) {
            // Si el día del primer parámetro no es el último del mes, suma a afterTime
            if (
              !isLastDayOfMonth(
                receivedDate.year,
                receivedDate.month,
                receivedDate.day
              )
            ) {
              afterTime++;
            } else {
              // Es el último día del mes, procesar normalmente
              const receivedMinutes = getTotalMinutes(currentMsg.timestamp);
              const minutesUntilMidnight = 24 * 60 - receivedMinutes;
              const sentMinutes = getTotalMinutes(nextMsg.timestamp);
              const totalTimeDifference = minutesUntilMidnight + sentMinutes;

              if (totalTimeDifference < idealTimeToResponse.min) {
                beforeTime++;
              } else if (totalTimeDifference > idealTimeToResponse.max) {
                afterTime++;
              } else {
                onTime++;
              }
            }
          }
          // Caso 2: Mismo mes, días diferentes
          else if (receivedDate.day !== sentDate.day) {
            const dayDifference = sentDate.day - receivedDate.day;

            // Si no son días consecutivos (diferencia != 1)
            if (dayDifference !== 1) {
              afterTime++;
            } else {
              // Son días consecutivos, verificar la hora del primer mensaje
              const receivedMinutes = getTotalMinutes(currentMsg.timestamp);
              const cutoffTime = 22 * 60 + 30; // 22:30 en minutos

              if (receivedMinutes < cutoffTime) {
                afterTime++;
              } else {
                // Calcular minutos hasta cambio de día + minutos del día siguiente
                const minutesUntilMidnight = 24 * 60 - receivedMinutes;
                const sentMinutes = getTotalMinutes(nextMsg.timestamp);
                const totalTimeDifference = minutesUntilMidnight + sentMinutes;

                if (totalTimeDifference < idealTimeToResponse.min) {
                  beforeTime++;
                } else if (totalTimeDifference > idealTimeToResponse.max) {
                  afterTime++;
                } else {
                  onTime++;
                }
              }
            }
          }
          // Caso 3: Mismo día
          else {
            const receivedMinutes = getTotalMinutes(currentMsg.timestamp);
            const sentMinutes = getTotalMinutes(nextMsg.timestamp);
            const timeDifference = sentMinutes - receivedMinutes;

            // Clasificar según el tiempo de respuesta
            if (timeDifference < idealTimeToResponse.min) {
              beforeTime++;
            } else if (timeDifference > idealTimeToResponse.max) {
              afterTime++;
            } else {
              onTime++;
            }
          }

          // Romper el bucle interno ya que encontramos el received=false correspondiente
          break;
        }
      }

      // Si no se encontró ninguna respuesta (received=false), sumar a afterTime
      if (!foundResponse) {
        afterTime++;
      }
    }
  }
  console.log("agrego para pushear");
  return {
    beforeTime,
    onTime,
    afterTime,
  };
};

export default processResponseTimes;
