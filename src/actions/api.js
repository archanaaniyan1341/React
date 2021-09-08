import axios from 'axios';

//const API_HOST = "http://localhost:8100";
//const BASE_URL = API_HOST + URI_ENDPOINT;
//const GET_LAYOUTS = "layouts"
const instance = axios.create({
    headers: {
        'content-type':'text/plain'
    },
});
export default {
    getData: (url, params, callback) =>
    instance({
        'method':'GET',
        'url': url,
        'params': params || {},
        transformResponse: callback ? [callback] : [],
    }),
    postData: (url, data) =>
    instance({
        'method': 'POST',
        'url': url,
        'data': data
    })
}