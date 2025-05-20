import axios from "axios";
import {
  sweetAlertsSuccessfully,
  sweetAlertsError,
} from "../../components/utils/alerts/alerts.jsx";
import {

    FILTER_BY_SOCIAL_MEDIA,
    FILTER_BY_STATE,
    CLEAN_FILTERS, 
    SEARCH_BY_CONTACT,
    FILTER_BY_USER
} from '../types.js';

//LOCALHOST
//const URL = 'http://localhost:3000';
//SERVER DESARROLLO
//const URL = 'https://electrica-mosconi-backend.onrender.com';
//SERVER PRODUCCION
const URL ='https://electrica-mosconi-backend-main.onrender.com'

export const filterBySocialMediaAction = (socialMedia) => {
  //console.log('llega a action: ', socialMedia);
  try {
    return {
      type: FILTER_BY_SOCIAL_MEDIA,
      payload: socialMedia,
    };
  } catch (error) {
    sweetAlertsError(
      "Intenta de nuevo",
      "No podemos mostrar tu selección",
      "Ok"
    );
  }
};

export const filterByStateAction = (state) => {
  try {
    return {
      type: FILTER_BY_STATE,
      payload: state,
    };
  } catch (error) {
    sweetAlertsError(
      "Intenta de nuevo",
      "No podemos mostrar tu selección",
      "Ok"
    );
  }
};

export const cleanFiltersAction = () => {
  return {
    type: "CLEAN_FILTERS",
  };
};

export const searchByContactAction = (contact) => {
  try {
    return async (dispatch) => {
      const response = await axios.get(`${URL}/contact?name=${contact}`);
      const contacts = response.data;
      dispatch({ type: SEARCH_BY_CONTACT, payload: contacts });
    };
  } catch (error) {
    sweetAlertsError(
      "Intenta de nuevo",
      "No hay mensajes asociados a ese contacto",
      "Ok"
    );
  }
};

export const filterByUserAction = (userId) => {
  try {
    return {
      type: FILTER_BY_USER,
      payload: userId,
    };
  } catch (error) {
    sweetAlertsError(
      "Intenta de nuevo",
      "No podemos mostrar tu selección",
      "Ok"
    );
  }
};
