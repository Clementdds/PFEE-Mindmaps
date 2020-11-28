import * as actionTypes from '../Actions/ActionsTypes'
import jwt_decode from "jwt-decode";

const initialState = {
    isSignedIn: !!localStorage.getItem('AuthToken'),
    token: localStorage.getItem('AuthToken') || null,
    email: localStorage.getItem('AuthToken') ? jwt_decode(localStorage.getItem('AuthToken')).email : null,
    isLoggingIn: false,
    error: null,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        // Logging in
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

        // Sign up
        case actionTypes.USER_SIGN_UP:
            return {
                ...state,
                isSignedIn: true,
                token: action.payload.token,
                email: jwt_decode(action.payload.token).email,
            };

        // Sign in
        case actionTypes.USER_SIGN_IN:
            return {
                ...state,
                isSignedIn: true,
                token: action.payload.token,
                email: jwt_decode(action.payload.token).email,
            };

        // User error
        case actionTypes.USER_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case actionTypes.USER_RESET_ERROR:
            return {
                ...state,
                error: null
            };

        // Logout
        case actionTypes.USER_SIGN_OUT:
            return {
                ...state,
                isSignedIn: false,
                token: null,
            };

        // Clear state
        case actionTypes.CLEAR_ALL_STATE:
        case actionTypes.USER_CLEAR_STATE:
            return {
                ...state,
                isSignedIn: false,
                isLoggingIn: false,
                token: null,
                error: null,
            };
        default:
            return state;
    }
};

export default UserReducer;