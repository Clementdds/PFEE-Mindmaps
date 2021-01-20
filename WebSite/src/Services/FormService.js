import {API_BackEnd} from "../config";
import requestHeader from "../Helpers/AuthHeaders";
import * as actionTypes from '../Actions/ActionsTypes'
import store from "../Store/ConfigureStore";
import callHandler from "../Helpers/HandleResponse";

const API_POST_MINDMAPS_CREATE_ENDPOINT = API_BackEnd + "/mindmaps/create";

/*
 * Function called to set loading to true/false and reset error since (new error / no error) is supposed to be set
 */


const formStartLoading = () => {
    store.dispatch({type: actionTypes.FORM_LOADING});
    store.dispatch({type: actionTypes.FORM_RESET_RESULT});
    store.dispatch({type: actionTypes.FORM_RESET_ERROR});
};

const formStopLoading = () => {
    store.dispatch({type: actionTypes.FORM_RESET_LOADING});
};

/*
 * Post Mindmaps
 */

const callPostCreateMindmaps = ({file, name, isPublic, emails}) => {
    const requestOptions = {
        method: 'POST',
        headers: requestHeader.AuthPostHeader(),
        body: JSON.stringify({text: file, name: name, isPublic: isPublic, emails: emails})
    };

    return fetch(API_POST_MINDMAPS_CREATE_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const postCreateMindmaps = ({file, name, isPublic, emails}) => {

    formStartLoading();

    callPostCreateMindmaps({file, name, isPublic, emails})
        .then((data) => {
                if (data) {
                    const result = "Mindmap '" + name + "' successfully created.";
                    store.dispatch({type: actionTypes.FORM_RESULT, payload: result});
                }
            },
            () => {
                store.dispatch({type: actionTypes.FORM_ERROR, payload: "Could not create mindmap."})
            }
        )
        .finally(formStopLoading);
};

const formService = {
    postCreateMindmaps,
};

export default formService;