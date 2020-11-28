import {API_AUTHENTICATION_ENDPOINT_HTTP} from "../config";
import requestHeader from "../Helpers/AuthHeaders";
import history from "../Helpers/History";
import * as actionTypes from '../Actions/ActionsTypes'
import store from "../Store/ConfigureStore";
import callHandler from "../Helpers/HandleResponse";

const API_SIGN_IN_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/users/login";
const API_SIGN_UP_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/users/signup";
const API_SIGN_OUT_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/users/logout";

/*
 * Function called to set logging in to true/false and reset error since (new error / no error) is supposed to be set
 */

const userIsLoggingIn = () => {
    store.dispatch({type: actionTypes.USER_LOGGING_IN});
    store.dispatch({type: actionTypes.USER_RESET_ERROR});
};

const userStopLoggingIn = () => {
    store.dispatch({type: actionTypes.USER_RESET_LOGGING_IN});
};

/*
 * Login
 */

const callLogin = ({email, password}) => {
    const requestOptions = {
        method: 'POST',
        headers: requestHeader.AuthPostHeader(),
        body: JSON.stringify({email: email, password: password})
    };

    return fetch(API_SIGN_IN_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const login = ({email, password}) => {
    console.log("Login service");
    console.log(email, password);

    userIsLoggingIn();

    callLogin({email, password})
        .then(
            (data) => {
                // login successful if there's a jwt token in the response
                if (data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('AuthToken', data.token);

                    // Dispatch to state
                    store.dispatch({type: actionTypes.USER_SIGN_IN, payload: data});
                    history.push('/');
                }
            },
            () => {
                store.dispatch({type: actionTypes.USER_ERROR, payload: "Could not login. Incorrect Email or password"})
            }
        )
        .finally(userStopLoggingIn);
};

/*
 * SignUp
 */

const callSignUP = ({email, password}) => {
    const requestOptions = {
        method: 'POST',
        headers: requestHeader.AuthPostHeader(),
        body: JSON.stringify({email: email, password: password})
    };

    return fetch(API_SIGN_UP_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const signUP = ({email, password}) => {
    console.log("Sign up service");
    console.log(email, password);

    userIsLoggingIn();

    callSignUP({email, password})
        .then((data) => {
                if (data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('AuthToken', data.token);

                    // Dispatch to state
                    store.dispatch({type: actionTypes.USER_SIGN_UP, payload: data});
                    history.push('/');
                }
            },
            () => {
                store.dispatch({type: actionTypes.USER_ERROR, payload: "Cloud not signUp."})
            }
        )
        .finally(userStopLoggingIn);
};

/*
 * Logout
 */

const callLogout = () => {
    const requestOptions = {
        method: 'GET',
        headers: requestHeader.AuthHeader()
    };

    return fetch(API_SIGN_OUT_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const logout = () => {
    console.log("Logout service");

    callLogout()
        .finally(() => {
            // remove user from local storage to log user out
            localStorage.removeItem('AuthToken');

            // Dispatch to state
            store.dispatch({type: actionTypes.USER_SIGN_OUT});
            store.dispatch({type: actionTypes.CLEAR_ALL_STATE});
        })
};

const userService = {
    login,
    signUP,
    logout,
};

export default userService;