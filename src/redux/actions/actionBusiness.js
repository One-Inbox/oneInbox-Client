import axios from "axios";
import { URL_API } from "../../config.js";
import {
  sweetAlertsSuccessfully,
  sweetAlertsError,
} from "../../components/utils/alerts/alerts.jsx";
import {
  GET_BUSINESS_BY_ID,
  LOGIN_BUSINESS,
  UPDATE_BUSINESS,
  LOGOUT_BUSINESS,
  AUTH_BUSINESS_BY_ALL_SOCIAL_MEDIA,
} from "../types.js";

//LOCALHOST
//const URL = 'http://localhost:3000';
//SERVER DESARROLLO
//const URL = 'https://electrica-mosconi-backend.onrender.com';
//SERVER PRODUCCION
//const URL ='https://electrica-mosconi-backend-main.onrender.com'

export const getBusinessByIdAction = (businessId, businessName) => {
  const idBusiness = businessId || sessionStorage.getItem("businessId");
  //console.log("empresa: ", idBusiness);
  //console.log("URL_API en getBusinessById ", URL_API);

  try {
    return async (dispatch) => {
      const response = await axios.get(`${URL_API}/business/${idBusiness}`);
      const business = response.data;
      dispatch({ type: GET_BUSINESS_BY_ID, payload: business });
    };
  } catch (error) {
    sweetAlertsError(
      "Intenta de nuevo",
      `No podemos encontrar a ${businessName}`,
      "Ok"
    );
  }
};

export const updateBusnisessAction = (busnisessId, input) => {
  return async (dispatch) => {
    try {
      await axios.put(`${URL_API}/business/update/${busnisessId}`, input);
      dispatch({ type: UPDATE_BUSINESS });
    } catch (error) {
      //console.log(error.message);
    }
  };
};

export const loginBusinessAction = (input) => {
  //console.log('input en action', input);
  //console.log("URL_API en loginBusiness ", URL_API);
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL_API}/auth/login`, input, {
        withCredentials: true,
      });
      //console.log("business en action", response.data.business);

      dispatch({ type: LOGIN_BUSINESS, payload: response.data.business });
      //getBusinessByIdAction(busnisessId, input.businessname)
    } catch (error) {
      //console.log(error);

      sweetAlertsError(
        `${input.businessName} no puede acceder a OneInbox`,
        "comprueba que el nombre y la contraseña sean los correctos",
        "Ok"
      );
    }
  };
};

export const logoutBusinessAction = () => {
  return async (dispatch) => {
    await axios.post(
      `${URL_API}/business/logout`,
      {},
      { withCredentials: true }
    );
    dispatch({ type: LOGOUT_BUSINESS });
  };
};

export const authBusinessByAllSocialMediaAction = (businessId) => {
  //console.log("URL_API en authBusinessByAllSocialMedia ", URL_API);
  return async (dispatch) => {
    const meli = await axios.get(`${URL_API}/mercadolibre/auth`, businessId);
    if (meli) {
      await axios.get(`${URL_API}/auth/facebook`, businessId);
    }
    dispatch({ type: AUTH_BUSINESS_BY_ALL_SOCIAL_MEDIA });
  };
};
