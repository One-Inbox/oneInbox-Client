import axios from "axios";
import {
  sweetAlertsSuccessfully,
  sweetAlertsError,
} from "../../components/utils/alerts/alerts.jsx";
import {
    GET_ALL_SOCIAL_MEDIA_BY_BUSINESS, 
    UPDATE_SOCIAL_MEDIA,
    POST_CODE_TO_AUTH_MELI,
    POST_CODE_TO_AUTH_MELI_ERROR
} from '../types.js';

//LOCALHOST
//const URL = 'http://localhost:3000';
//SERVER DESARROLLO
//const URL = 'https://electrica-mosconi-backend.onrender.com';
//SERVER PRODUCCION
const URL ='https://electrica-mosconi-backend-main.onrender.com'

export const getAllSocialMediaByBusinessAction = () => {
    return async (dispatch) => {
                try {
                const response = await axios.get(`${URL}/socialMedia/active`);
                const socialMedia = response.data; 
                //console.log('socialMedia:', socialMedia);
                dispatch({type: GET_ALL_SOCIAL_MEDIA_BY_BUSINESS, payload: socialMedia})
            } catch (error) {
                console.log(error.message);
                 
            }
        }
    };

    export const updateSocialMediaAction = (socialMediaId, input) => {
        return async(dispatch) => {
            try {
                await axios.put(`${URL}/socialMedia/active/update/${socialMediaId}`, input);
                dispatch({type: UPDATE_SOCIAL_MEDIA})  
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    export const postCodeToAuthMeLiAction = (code, navigate) => {
        return async(dispatch) => {
            try {
                const response = await axios.post(`${URL}/mercadolibre/auth/callback`, code)
                console.log("MELI-AUTH: Tokens guardados con éxito", response.data);
                dispatch({type: POST_CODE_TO_AUTH_MELI, payload: response.data})
                setTimeout(() => {
                    navigate('/')   
                }, 2000);
            } catch (error) {
                console.error("MELI-AUTH: Error al enviar el código de autorización", error);  
                dispatch({ type: "POST_CODE_TO_AUTH_MELI_ERROR", payload:`MELI-AUTH: Error al enviar el código de autorización: ${error.message}` });
            }
        }
    };


