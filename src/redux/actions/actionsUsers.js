import axios from "axios";
import { URL_API } from "../../config.js";
import {
  sweetAlertsSuccessfully,
  sweetAlertsError,
} from "../../components/utils/alerts/alerts.jsx";
import {
  CLEAN_USER_BY_ID,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  UPDATE_USER,
  ADMI_LOGIN,
  GET_USER_BY_ADMI,
  CREATE_USER,
} from "../types.js";

//LOCALHOST
//const URL = 'http://localhost:3000';
//SERVER DESARROLLO
//const URL = 'https://electrica-mosconi-backend.onrender.com';
//SERVER PRODUCCION
//const URL ='https://electrica-mosconi-backend-main.onrender.com'

export const getAllUsersAction = () => {
  //console.log("URL_API en getAllUsers ", URL_API);
  return async (dispatch) => {
    // console.log("entro en la action GetAllUsersAction");
    try {
      const response = await axios.get(`${URL_API}/user`);
      //console.log("repuesta en action de getAllUsers", response);
      const users = response.data;
      dispatch({ type: GET_ALL_USERS, payload: users });
      //console.log("voy al reducer de getAllUsers");
    } catch (error) {
      throw error;
    }
  };
};

export const getUserByIdAction = (userId) => {
  //console.log('2A- entro en getUserByIdAction con ID', userId);
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_API}/user/${userId}`);
      const user = response.data;
      dispatch({ type: GET_USER_BY_ID, payload: user });
    } catch (error) {
      throw error;
    }
  };
};

export const cleanUserByIdAction = () => {
  return {
    type: CLEAN_USER_BY_ID,
  };
};

export const updateUserAction = (userId, input) => {
  return async (dispatch) => {
    //console.log("entro a la action del", userId, "con data", input);

    try {
      await axios.put(`${URL_API}/user/update/${userId}`, input);
      dispatch({ type: UPDATE_USER });
      //console.log("salgo al reducer");
    } catch (error) {
      throw error;
    }
  };
};
export const admiLoginAction = (boolean) => {
  return {
    type: ADMI_LOGIN,
    payload: boolean,
  };
};

export const getUserByAdmiAction = (userId) => {
  //console.log('2A- entro en getUserByIdAction con ID', userId);
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_API}/user/${userId}`);
      const user = response.data;
      dispatch({ type: GET_USER_BY_ADMI, payload: user });
    } catch (error) {
      throw error;
    }
  };
};

export const createUser = (input) => {
  return async (dispatch) => {
    try {
      console.log("ENVIANDO A BACKEND:", input);
      const response = await axios.post(`${URL_API}/user/create`, input);
      console.log("RESPUESTA BACKEND:", response.data);
      const user = response.data;
      dispatch({ type: CREATE_USER, payload: user });
    } catch (error) {
      throw error;
    }
  };
};
