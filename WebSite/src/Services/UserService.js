import {API_AUTHENTICATION_ENDPOINT_HTTP} from "../config";
import AuthHeaders from "../Helpers/AuthHeaders";
import history from "../Helpers/History";
import * as actionTypes from '../Actions/ActionsTypes'
import store from "../Store/ConfigureStore";

const API_SIGN_IN_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/login";
const API_SIGN_UP_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/signup";
const API_SIGN_OUT_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/logout";

const callLogin = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    };

    return fetch(API_SIGN_IN_ENDPOINT, requestOptions)
        .then(handleResponse)
        .then(data => {
            // login successful if there's a jwt token in the response
            if (data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('AuthToken', JSON.stringify(data.token));
            }

            return data;
        });
};

const callSignUP = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    };

    return fetch(API_SIGN_UP_ENDPOINT, requestOptions)
        .then(handleResponse)
        .then(data => {
            // login successful if there's a jwt token in the response
            if (data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('AuthToken', JSON.stringify(data.token));
            }

            return data;
        });
};

const callLogout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('AuthToken');

    const requestOptions = {
        method: 'GET',
        headers: AuthHeaders()
    };

    return fetch(API_SIGN_OUT_ENDPOINT, requestOptions)
        .then(handleResponse);
};

const handleResponse = (response) => {
    return response.json().then(data => {
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.removeItem('AuthToken');
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
};

const login = (username, password) => {
    console.log("Login service");
    console.log(username, password);

    store.dispatch({type: actionTypes.USER_SIGN_IN});
    history.push('/');

    /* Future code once controller is up
    callLogin(username, password)
            .then(
                data => {
                    store.dispatch({type: actionTypes.USER_SIGN_IN, payload: data});
                    history.push('/');
                },
                error => {
                    store.dispatch({type: actionTypes.USER_ERROR, payload: error});
                }
            );
     */
};

const signUP = (username, password) => {
    console.log("Sign up service");
    console.log(username, password);

    store.dispatch({type: actionTypes.USER_SIGN_UP});
    history.push('/');

    /* Future code once controller is up
    callSignUP(username, password)
            .then(
                data => {
                    store.dispatch({type: actionTypes.USER_SIGN_UP, payload: data});
                    history.push('/');
                },
                error => {
                    store.dispatch({type: actionTypes.USER_ERROR, payload: error});
                }
            );
     */
};

const logout = () => {
    console.log("Logout service");
    store.dispatch({type: actionTypes.USER_SIGN_OUT});

    /* Future code once controller is up
    callLogout()
            .then(store.dispatch({type: actionTypes.USER_SIGN_OUT}))
     */
};

const userService = {
    login,
    signUP,
    logout,
};

export default userService;