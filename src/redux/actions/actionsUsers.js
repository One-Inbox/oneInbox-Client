import axios from "axios";
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
} from "../types.js";

//LOCALHOST
//const URL = 'http://localhost:3000';
//SERVER DESARROLLO
//const URL = 'https://electrica-mosconi-backend.onrender.com';
//SERVER PRODUCCION
const URL ='https://electrica-mosconi-backend-main.onrender.com'

export const getAllUsersAction = () => {
  return async (dispatch) => {
   // console.log("entro en la action GetAllUsersAction");
    try {
      const response = await axios.get(`${URL}/user`);
      //console.log("repuesta en action de getAllUsers", response);
      const users = response.data;
      dispatch({ type: GET_ALL_USERS, payload: users });
      //console.log("voy al reducer de getAllUsers");
    } catch (error) {
      sweetAlertsError(
        "Intenta de nuevo",
        "No podemos mostrar a los miembros de tu equipo",
        "Ok"
      );
    }
  };
};

export const getUserByIdAction = (userId) => {
  //console.log('2A- entro en getUserByIdAction con ID', userId);
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/user/${userId}`);
      const user = response.data;
      dispatch({ type: GET_USER_BY_ID, payload: user });
    } catch (error) {
      if (!userId) {
        sweetAlertsError(
          "Intenta de nuevo",
          "No encontramos el usuario solicitado",
          "Ok"
        );
      }
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
    console.log("entro a la action del", userId, "con data", input);

    try {
      await axios.put(`${URL}/user/update/${userId}`, input);
      dispatch({ type: UPDATE_USER });
      console.log("salgo al reducer");
    } catch (error) {
      console.log(error.message);
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
      const response = await axios.get(`${URL}/user/${userId}`);
      const user = response.data;
      dispatch({ type: GET_USER_BY_ADMI, payload: user });
    } catch (error) {
      sweetAlertsError(
        "Intenta de nuevo",
        "No encontramos el usuario solicitado",
        "Ok"
      );
    }
  };
};
