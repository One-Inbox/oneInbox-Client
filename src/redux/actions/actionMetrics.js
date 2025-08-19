import { SELECT_METRICS } from "../types";
import { URL_API } from "../../config.js";

export const selectMetricsAction = (metrics) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SELECT_METRICS, payload: metrics });
    } catch (error) {
      throw error;
    }
  };
};
