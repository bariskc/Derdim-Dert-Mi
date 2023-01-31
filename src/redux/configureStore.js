import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';

const secureLs = new SecureLS();
const getStateFromStorage = () => {
	const dAuth = secureLs.get('d-auth');
	let stateInLocalStorage = {
		isLoggedIn: false,
		username: undefined,
		email: undefined,
		image: undefined,
		password: undefined
	}
	if (dAuth) {
		return dAuth;
	}
	return stateInLocalStorage;
}
const updateStateInStorage = newState => {
	secureLs.set('d-auth', newState)

}
const configureStore = () => {

	const store = createStore(authReducer, getStateFromStorage(), applyMiddleware(thunk));
	store.subscribe(() => {
		updateStateInStorage(store.getState());
	})
	return store;
}

export default configureStore;