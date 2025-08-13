import axios from "axios";
import { URL_API } from "../../config.js";
import {
  sweetAlertsSuccessfully,
  sweetAlertsError,
} from "../../components/utils/alerts/alerts.jsx";
import {
  GET_ALL_SOCIAL_MEDIA_BY_BUSINESS,
  UPDATE_SOCIAL_MEDIA,
  POST_CODE_TO_AUTH_MELI,
  POST_CODE_TO_AUTH_MELI_ERROR,
} from "../types.js";

//LOCALHOST
//const URL = 'http://localhost:3000';
//SERVER DESARROLLO
//const URL = 'https://electrica-mosconi-backend.onrender.com';
//SERVER PRODUCCION
//const URL ='https://electrica-mosconi-backend-main.onrender.com'

export const getAllSocialMediaByBusinessAction = (businessId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_API}/socialMedia/active`);
      const socialMedia = response.data;
      const socialMediaByBusiness = socialMedia.filter(
        (sm) => sm.Businesses[0].id === businessId
      );

      dispatch({
        type: GET_ALL_SOCIAL_MEDIA_BY_BUSINESS,
        payload: socialMediaByBusiness,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const updateSocialMediaAction = (socialMediaId, input) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `${URL_API}/socialMedia/active/update/${socialMediaId}`,
        input
      );
      dispatch({ type: UPDATE_SOCIAL_MEDIA });
    } catch (error) {
      throw error;
    }
  };
};

export const postCodeToAuthMeLiAction = (code, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL_API}/mercadolibre/auth/callback`,
        code
      );
      dispatch({ type: POST_CODE_TO_AUTH_MELI, payload: response.data });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(
        "MELI-AUTH: Error al enviar el código de autorización",
        error
      );
      dispatch({
        type: "POST_CODE_TO_AUTH_MELI_ERROR",
        payload: `MELI-AUTH: Error al enviar el código de autorización: ${error.message}`,
      });
    }
  };
};
