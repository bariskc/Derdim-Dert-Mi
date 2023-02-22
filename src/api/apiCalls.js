import axios from "axios";

export const signup = (body) => {
   return axios.post('/api/1.0/users', body);
}
export const login = (body) => {
   return axios.post('/api/1.0/auth', body);
}
export const setAuthorizationHeader = ({ isLoggedIn, token }) => {
   if (isLoggedIn) {
      const authorizationHeaderValue = `Bearer ${token}`;
      axios.defaults.headers['Authorization'] = authorizationHeaderValue;
   } else {
      delete axios.defaults.headers['Authorization'];
   }
};
export const getUser = (username) => {
   return axios.get(`/api/1.0/users/${username}`);
}
export const updateUser = (username, body) => {
   return axios.put(`/api/1.0/users/${username}`, body);
}
export const postDert = (body) => {
   return axios.post('/api/1.0/dertler', body);
}
export const getDertler = (username, page = 0) => {
   const path = username ? `/api/1.0/users/${username}/dertler?currentPage=` : '/api/1.0/dertler?currentPage=';
   return axios.get(path + page);
}
export const getDert = (id) => {
   return axios.get(`/api/1.0/dertler/info/${id}`);
}
export const getOldDertler = (id, username) => {
   const path = username ? `/api/1.0/dertler/${username}/dertler/${id}` : `/api/1.0/dertler/${id}`;
   return axios.get(path);
}
export const getNewDertlerCount = (id, username) => {
   const path = username ? `/api/1.0/dertler/${username}/dertler/${id}?count=true` : `/api/1.0/dertler/${id}?count=true`;
   return axios.get(path);
 };
 export const getNewDertler = (id, username) => {
   const path = username ? `/api/1.0/dertler/${username}/dertler/${id}?direction=after` : `/api/1.0/dertler/${id}?direction=after`;
   return axios.get(path);
 };