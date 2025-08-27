// // hooks/useIsHydrated.js
//import { useState, useEffect } from "react";

// export const UseIsHydrated = () => {
//   const [isHydrated, setIsHydrated] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
//   }, []);

//   return isHydrated;
// };

// export const UseIsHydrated = () => {
//   const [isHydrated, setIsHydrated] = useState(false);

//   useEffect(() => {
//     const checkHydration = () => {
//       // Verifica si ya hay datos en localStorage para confirmar que persist funcionó
//       try {
//         const persistedData = localStorage.getItem("persist:root");
//         if (persistedData) {
//           // Si hay datos persistidos, confirma que Redux los ha cargado
//           setIsHydrated(true);
//         } else {
//           // Si no hay datos persistidos (primera vez), también está "hidratado"
//           setIsHydrated(true);
//         }
//       } catch (error) {
//         // En caso de error con localStorage, procede normalmente
//         console.warn("Error accessing localStorage:", error);
//         setIsHydrated(true);
//       }
//     };

//     // Ejecuta inmediatamente
//     checkHydration();

//     // Fallback timer por si acaso
//     const timer = setTimeout(() => {
//       setIsHydrated(true);
//     }, 200);

//     return () => clearTimeout(timer);
//   }, []);

//   return isHydrated;
// };
// hooks/useIsHydrated.js

import { useState, useEffect } from "react";

// Opción 1: Hook simple (recomendado para empezar)
export const UseIsHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Pequeño delay para asegurar que Redux haya terminado la hidratación
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100); // 100ms suele ser suficiente

    return () => clearTimeout(timer);
  }, []);

  return isHydrated;
};

// Opción 2: Hook más robusto (si la opción 1 no funciona completamente)
export const useIsHydratedRobust = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    console.log("🔍 Iniciando verificación de hidratación...");

    const checkHydration = () => {
      try {
        const persistedData = localStorage.getItem("persist:root");
        console.log("🔍 Datos persistidos encontrados:", !!persistedData);

        if (persistedData) {
          const parsed = JSON.parse(persistedData);
          console.log("🔍 Estado persistido:", parsed);
          setIsHydrated(true);
        } else {
          console.log("🔍 No hay datos persistidos - primera vez");
          setIsHydrated(true);
        }
      } catch (error) {
        console.warn("❌ Error accessing localStorage:", error);
        setIsHydrated(true);
      }
    };

    checkHydration();

    const timer = setTimeout(() => {
      console.log("⏰ Fallback timer ejecutado - forzando hidratación");
      setIsHydrated(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  console.log("🔍 Hook estado:", { isHydrated });
  return isHydrated;
};

// Opción 3: Hook con verificación de estado de Redux
export const useIsHydratedWithRedux = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    console.log("🔍 Verificando hidratación con Redux...");

    // Espera a que Redux esté completamente inicializado
    const timer = setTimeout(() => {
      setIsHydrated(true);
      console.log("✅ Hidratación completada");
    }, 300); // Tiempo más largo para asegurar

    return () => clearTimeout(timer);
  }, []);

  return isHydrated;
};
