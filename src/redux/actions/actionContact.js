import axios from "axios";
import {
  sweetAlertsSuccessfully,
  sweetAlertsError,
} from "../../components/utils/alerts/alerts.jsx";
import { GET_CONTACT_BY_ID, GET_CONTACT_BY_MESSAGE_RECEIVED } from "../types";

//LOCALHOST
//const URL = 'http://localhost:3000';
//SERVER DESARROLLO
//const URL = 'https://electrica-mosconi-backend.onrender.com';
//SERVER PRODUCCION
const URL ='https://electrica-mosconi-backend-main.onrender.com'


export const getContactByIdAction = (contactId) => {
  try {
    return async (dispatch) => {
      const response = await axios.get(`${URL}/contact/${contactId}`);
      const contact = response.data;
      dispatch({ type: GET_CONTACT_BY_ID, payload: contact });
    };
  } catch (error) {
    sweetAlertsError(
      "Intenta de nuevo",
      `No podemos mostrar al contacto con ID ${contactId}`,
      "Ok"
    );
  }
};
export const getContactByMessageReceivedAction = (messageId) => {
  try {
    return async (dispatch) => {
      const res = await axios.get(`${URL}/message/received/${messageId}`);
      const message = res.data;
      const contactId = message.Contact.id;
      const response = await axios.get(`${URL}/contact/${contactId}`);
      const contact = response.data;
      dispatch({
        type: GET_CONTACT_BY_MESSAGE_RECEIVED,
        payload: { message, contact },
      });
    };
  } catch (error) {
    sweetAlertsError(
      "Intenta de nuevo",
      `No podemos mostrar el contacto asociado al mensaje con ID ${messageId}`,
      "Ok"
    );
  }
};
