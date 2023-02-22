import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import { setAuthorizationHeader } from '../api/apiCalls';

const secureLs = new SecureLS();
const getStateFromStorage = () => {
	const dAuth = secureLs.get('d-auth');
	let stateInLocalStorage = {
		isLoggedIn: false,
		username: undefined,
		email: undefined,
		image: undefined,
		password: undefined,
		gender: 2,
		city: undefined,
		country: undefined,
		birthDate: undefined,
		token: undefined
	}
	if (dAuth) {
		return dAuth;
	}
	return stateInLocalStorage;
}
const updateStateInStorage = newState => {
	secureLs.set('d-auth', newState)
	console.log(newState);

}
const configureStore = () => {
const initialState = getStateFromStorage();
setAuthorizationHeader(initialState);
	const store = createStore(authReducer, initialState, applyMiddleware(thunk));
	store.subscribe(() => {
		updateStateInStorage(store.getState());
		setAuthorizationHeader(store.getState());
	})
	return store;
}

export default configureStore;