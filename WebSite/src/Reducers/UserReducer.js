import * as actionTypes from '../Actions/ActionsTypes'

const initialState = {
    isSignedIn: !!localStorage.getItem('AuthToken'),
    isLoggingIn: false,
    token: localStorage.getItem('AuthToken') || null,
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
                isLoggingIn: false,
                token: action.payload.token,
                error: null,
            };

        // Sign in
        case actionTypes.USER_SIGN_IN:
            return {
                ...state,
                isSignedIn: true,
                isLoggingIn: false,
                token: action.payload.token,
                error: null,
            };

        // User error
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

        // Logout + clear state
        case actionTypes.CLEAR_ALL_STATE:
        case actionTypes.USER_SIGN_OUT:
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