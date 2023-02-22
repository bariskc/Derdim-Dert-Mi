import * as ACTIONS from './constants';

const defaultState = {
    isLoggedIn: false,
    username: undefined,
    email: undefined,
    image: undefined,
    password: undefined,
    gender: 2,
    city: undefined,
    country: undefined,
    birthDate: undefined
}
const authReducer = (state, action) => {
    if (action.type === ACTIONS.LOGOUT_SUCCESS) {
        return defaultState;
    } else if (action.type === ACTIONS.LOGIN_SUCCESS) {
        return {
            ...action.payload,
            isLoggedIn: true
        }
    } else if (action.type === ACTIONS.UPDATE_SUCCESS) {
        return {
            ...state,
            ...action.payload
        }
    }
    return state;
}

export default authReducer;