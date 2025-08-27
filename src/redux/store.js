// // import { createStore, applyMiddleware, compose } from 'redux';
// // import rootReducer from './reducer';
// // import thunkMiddleware from 'redux-thunk';
// // import socketMiddleware from './middleware/socketMiddleware'; // middleware de socket.io
// // //import { composeWithDevTools } from 'redux-devtools-extension';
// // //import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
// // import { composeWithDevTools } from '@redux-devtools/extension';
// import { createStore, applyMiddleware, compose } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // usa localStorage
// import rootReducer from "./reducer";
// import thunkMiddleware from "redux-thunk";
// import socketMiddleware from "./middleware/socketMiddleware";
// import { composeWithDevTools } from "@redux-devtools/extension";

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunkMiddleware, socketMiddleware))
// );

// export default store;

// // Configuración para usar Redux DevTools vieja
// // const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// // // middlewares de thunk y socket.io
// // const store = createStore(
// //     rootReducer,
// //     composeEnhancer(applyMiddleware(thunkMiddleware, socketMiddleware))
// // );
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage por defecto
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";
import socketMiddleware from "./middleware/socketMiddleware";

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["messagesReceived"], // Solo persistimos el slice que contiene los mensajes
};

// Reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Creación del store con middlewares
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, socketMiddleware))
);

// Persistor (para PersistGate)
export const persistor = persistStore(store);

export default store;
