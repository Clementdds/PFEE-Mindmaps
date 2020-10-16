import * as actionTypes from '../Actions/ActionsTypes'

const initialState = {
    isSignedIn: !!localStorage.getItem('AuthToken'),
    token: localStorage.getItem('AuthToken') || null,
    error: null,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_SIGN_UP:
            return {
                ...state,
                isSignedIn: true,
                token: action.payload.token,
                error: null,
            };
        case actionTypes.USER_SIGN_IN:
            return {
                ...state,
                isSignedIn: true,
                token: action.payload.token,
                error: null,
            };
        case actionTypes.USER_SIGN_OUT:
            return {
                ...state,
                isSignedIn: false,
                token: null,
                error: null,
            };
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
        default:
            return state;
    }
};

export default UserReducer;