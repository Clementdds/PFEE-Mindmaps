import * as actionTypes from '../Actions/ActionsTypes'

const initialState = {
    isSignedIn: !!localStorage.getItem('AuthToken'),
    isLoggingIn: false,
    token: localStorage.getItem('AuthToken') || null,
    error: null,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGGING_IN:
            return {
                ...state,
                isLoggingIn: true
            };
        case actionTypes.USER_RESET_LOGGING_IN:
            return {
                ...state,
                isLoggingIn: false
            };
        case actionTypes.USER_SIGN_UP:
            return {
                ...state,
                isSignedIn: true,
                isLoggingIn: false,
                token: action.payload.token,
                error: null,
            };
        case actionTypes.USER_SIGN_IN:
            return {
                ...state,
                isSignedIn: true,
                isLoggingIn: false,
                token: action.payload.token,
                error: null,
            };
        case actionTypes.USER_SIGN_OUT:
            return {
                ...state,
                isSignedIn: false,
                isLoggingIn: false,
                token: null,
                error: null,
            };
        case actionTypes.USER_ERROR:
            return {
                ...state,
                isLoggingIn: false,
                error: action.payload,
            };
        case actionTypes.USER_RESET_ERROR:
            return {
                ...state,
                isLoggingIn: false,
                error: null
            };
        default:
            return state;
    }
};

export default UserReducer;