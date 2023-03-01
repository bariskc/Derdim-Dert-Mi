import axios from "axios";



export const signup = (body) => {
   return axios.post('http://34.132.186.111/api/1.0/users/api/1.0/users', body);
}
export const login = (body) => {
   return axios.post('http://34.132.186.111/api/1.0/users/api/1.0/auth', body);
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
   return axios.get(`http://34.132.186.111/api/1.0/users/api/1.0/users/${username}`);
}
export const updateUser = (username, body) => {
   return axios.put(`http://34.132.186.111/api/1.0/users/api/1.0/users/${username}`, body);
}
export const postDert = (body) => {
   return axios.post('http://34.132.186.111/api/1.0/users/api/1.0/dertler', body);
}
export const getDertler = (username, page = 0) => {
   const path = username ? `http://34.132.186.111/api/1.0/users/api/1.0/users/${username}/dertler?currentPage=` : 'http://34.132.186.111/api/1.0/users/api/1.0/dertler?currentPage=';
   return axios.get(path + page);
}
export const getDert = (id) => {
   return axios.get(`http://34.132.186.111/api/1.0/users/api/1.0/dertler/info/${id}`);
}
export const getOldDertler = (id, username) => {
   const path = username ? `http://34.132.186.111/api/1.0/users/api/1.0/dertler/${username}/dertler/${id}` : `http://34.132.186.111/api/1.0/users/api/1.0/dertler/${id}`;
   return axios.get(path);
}
export const getNewDertlerCount = (id, username) => {
   const path = username ? `http://34.132.186.111/api/1.0/users/api/1.0/dertler/${username}/dertler/${id}?count=true` : `http://34.132.186.111/api/1.0/users/api/1.0/dertler/${id}?count=true`;
   return axios.get(path);
 };
 export const getNewDertler = (id, username) => {
   const path = username ? `http://34.132.186.111/api/1.0/users/api/1.0/dertler/${username}/dertler/${id}?direction=after` : `http://34.132.186.111/api/1.0/users/api/1.0/dertler/${id}?direction=after`;
   return axios.get(path);
 };