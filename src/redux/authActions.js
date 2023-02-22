import * as ACTIONS from './constants';
import { login, signup } from '../api/apiCalls';

export const logoutSuccess = () => {
	return {
		type: ACTIONS.LOGOUT_SUCCESS
	};
}

export const loginSuccess = authState => {
	return {
		type: ACTIONS.LOGIN_SUCCESS,
		payload: authState
	};
}

export const updateSuccess = ({ email }) => {
	return {
		type: ACTIONS.UPDATE_SUCCESS,
		payload: {
			email
			// image
		}
	};
}

export const loginHandler = (credentials) => {
	return async function (dispatch) {
		const response = await login(credentials);
		console.log(response);
		const authState = {
			...response.data.user,
			password: credentials.password,
			username: response.data.user.username,
			token: response.data.token
		}

		dispatch(loginSuccess(authState));
		return response;
	}
}

export const signupHandler = (user) => {
	return async function (dispatch) {
		const response = await signup(user);
		await dispatch(loginHandler(user))
		return response;
	}

}