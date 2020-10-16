import {API_AUTHENTICATION_ENDPOINT_HTTP} from "../config";
import AuthHeaders from "../Helpers/AuthHeaders";
import history from "../Helpers/History";
import * as actionTypes from '../Actions/ActionsTypes'
import store from "../Store/ConfigureStore";

const API_SIGN_IN_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/users/login";
const API_SIGN_UP_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/users/signup";
const API_SIGN_OUT_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/users/logout";

const callLogin = ({email, password}) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password})
    };

    return fetch(API_SIGN_IN_ENDPOINT, requestOptions)
        .then(handleResponse);
};

const callSignUP = ({email, password}) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password})
    };
    console.log(requestOptions);

    return fetch(API_SIGN_UP_ENDPOINT, requestOptions)
        .then(handleResponse);
};

const callLogout = () => {
    const requestOptions = {
        method: 'GET',
        headers: AuthHeaders()
    };
    console.log(requestOptions);

    return fetch(API_SIGN_OUT_ENDPOINT, requestOptions)
        .then(handleResponse);
};

const handleResponse = (response) => {
    return response.json().then(data => {
        if (!response.ok || data.error) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.removeItem('AuthToken');

                // Dispatch to state
                store.dispatch({type: actionTypes.USER_SIGN_OUT});
            }

            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
};

const login = ({email, password}) => {
    console.log("Login service");
    console.log(email, password);

    callLogin({email, password})
        .then(
            (data) => {
                // login successful if there's a jwt token in the response
                if (data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('AuthToken', JSON.stringify(data.token));

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

const signUP = ({email, password}) => {
    console.log("Sign up service");
    console.log(email, password);

    callSignUP({email, password})
        .then((data) => {
                if (data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('AuthToken', JSON.stringify(data.token));

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

const logout = () => {
    console.log("Logout service");

    callLogout()
        .then(() => {
            // remove user from local storage to log user out
            localStorage.removeItem('AuthToken');

            // Dispatch to state
            store.dispatch({type: actionTypes.USER_SIGN_OUT});
        })
};

const userService = {
    login,
    signUP,
    logout,
};

export default userService;