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
 * Login
 */

const callLogin = ({email, password}) => {
    const requestOptions = {
        method: 'POST',
        headers: requestHeader.AuthPostHeader(),
        body: JSON.stringify({email: email, password: password})
    };

    return fetch(API_SIGN_IN_ENDPOINT, requestOptions)
        .then(callHandler.handleSignResponse);
};

const login = ({email, password}) => {
    console.log("Login service");
    console.log(email, password);

    store.dispatch({type: actionTypes.USER_LOGGING_IN});

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
            (error) => {
                store.dispatch({type: actionTypes.USER_ERROR, payload: error})
            }
        );
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
        .then(callHandler.handleSignResponse);
};

const signUP = ({email, password}) => {
    console.log("Sign up service");
    console.log(email, password);

    store.dispatch({type: actionTypes.USER_LOGGING_IN});

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
            (error) => {
                store.dispatch({type: actionTypes.USER_ERROR, payload: error})
            }
        );
};

/*
 * Logout
 */

const callLogout = () => {
    const requestOptions = {
        method: 'GET',
        headers: requestHeader.AuthHeader()
    };
    console.log(requestOptions);

    return fetch(API_SIGN_OUT_ENDPOINT, requestOptions)
        .then(callHandler.handleSignResponse);
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