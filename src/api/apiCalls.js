import axios from "axios";
import { URL } from "../shared/System";

export const signup = (body) => {
   return axios.post(URL + '/api/1.0/users', body);
}
export const login = (body) => {
   return axios.post(URL + '/api/1.0/auth', body);
}
export const getUser = (username) => {
   return axios.post(URL + `/api/1.0/users/${username}`);
}
export const updateEmail = (username, body) => {
   return axios.post(URL + `/api/1.0/users/${username}/updateEmail`, body);
}