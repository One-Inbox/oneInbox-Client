import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import socketMiddleware from './middleware/socketMiddleware'; // middleware de socket.io
//import { composeWithDevTools } from 'redux-devtools-extension';
//import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { composeWithDevTools } from '@redux-devtools/extension';


const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunkMiddleware, socketMiddleware),
));

export default store;

// Configuración para usar Redux DevTools vieja
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// // middlewares de thunk y socket.io
// const store = createStore(
//     rootReducer,
//     composeEnhancer(applyMiddleware(thunkMiddleware, socketMiddleware))
// );