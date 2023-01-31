import axios from "axios";
export const signup = (body) => {
   return axios.post('https://ac37-94-54-232-254.eu.ngrok.io/api/1.0/users', body);
}
export const login = (body) => {
    return axios.post('https://ac37-94-54-232-254.eu.ngrok.io/api/1.0/auth', body);
 }
