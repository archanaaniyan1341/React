import axios from "axios";
import { API } from "../actions/types";
//import { accessDenied, apiError, apiStart, apiEnd } from "../actions/api";

const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);
  if (action.type !== API) return;

  const {
    ///url,
    //method,
    //data,
    accessToken, 
    //onSuccess,
    //onFailure,
    //label,
    //headers
  } = action.payload;
  //const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  // axios default configs
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;  
};

export default apiMiddleware;