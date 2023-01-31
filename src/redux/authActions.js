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

export const loginHandler = (credentials) => {
	return async function (dispatch) {
		const response = await login(credentials);
		const authState = {
			...response.data,
			password: credentials.password,
			username: response.data.user.username
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