import store from "../Store/ConfigureStore";
import * as actionTypes from "../Actions/ActionsTypes";

const handleSignResponse = (response) => {
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

const handleResponse = (response) => {
    return response.json().then(data => {
        if (!response.ok || data.error) {

            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
};

const callHandler = {
    handleSignResponse,
    handleResponse,
};

export default callHandler;