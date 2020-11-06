import {API_AUTHENTICATION_ENDPOINT_HTTP} from "../config";
import requestHeader from "../Helpers/AuthHeaders";
import * as actionTypes from '../Actions/ActionsTypes'
import store from "../Store/ConfigureStore";
import callHandler from "../Helpers/HandleResponse";

const API_GET_MINDMAPS_OWNED_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/getowned";
const API_GET_MINDMAPS_SHARED_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/getshared";
const API_GET_MINDMAPS_BY_ID_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/getMindmapFromId";
const API_POST_MINDMAPS_CREATE_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/create";

/*
 * Get owned Mindmaps based on the Header token
 */

const callGetOwnedMindmaps = () => {
    const requestOptions = {
        method: 'GET',
        headers: requestHeader.AuthHeader(),
    };

    return fetch(API_GET_MINDMAPS_OWNED_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const getOwnedMindmaps = () => {
    console.log("Get owned Mindmaps service");

    store.dispatch({type: actionTypes.MINDMAPS_LOADING});

    callGetOwnedMindmaps()
        .then(
            (data) => {
                if (Array.isArray(data.mindmapsList)) {
                    // Dispatch to state
                    store.dispatch({type: actionTypes.MINDMAPS_OWNED_SET_LIST, payload: data.mindmapsList});
                }
            },
            (error) => {
                store.dispatch({type: actionTypes.MINDMAPS_ERROR, payload: error})
            }
        );
};

/*
 * Get shared Mindmaps based on the Header token
 */

const callGetSharedMindmaps = () => {
    const requestOptions = {
        method: 'GET',
        headers: requestHeader.AuthHeader(),
    };

    return fetch(API_GET_MINDMAPS_SHARED_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const getSharedMindmaps = () => {
    console.log("Get shared Mindmaps service");

    store.dispatch({type: actionTypes.MINDMAPS_LOADING});

    callGetSharedMindmaps()
        .then(
            (data) => {
                if (Array.isArray(data.mindmapsList)) {
                    // Dispatch to state
                    store.dispatch({type: actionTypes.MINDMAPS_SHARED_SET_LIST, payload: data.mindmapsList});
                }
            },
            (error) => {
                store.dispatch({type: actionTypes.MINDMAPS_ERROR, payload: error})
            }
        );
};

/*
 * Get Mindmaps by id
 */

const callGetMindmapsById = ({id}) => {
    const requestOptions = {
        method: 'GET',
        headers: requestHeader.AuthHeader(),
    };

    return fetch(API_GET_MINDMAPS_BY_ID_ENDPOINT + "?mapId=" + id, requestOptions)
        .then(callHandler.handleResponse);
};

const getMindmapsById = ({id}) => {
    console.log("Get Mindmaps by id service");

    store.dispatch({type: actionTypes.MINDMAPS_LOADING});

    callGetMindmapsById({id})
        .then((data) => {
                store.dispatch({type: actionTypes.VIEWER_SET_INPUT_FILE, payload: data.mindmap});
                store.dispatch({type: actionTypes.VIEWER_DELETE_NODE_ID});
            },
            (error) => {
                store.dispatch({type: actionTypes.VIEWER_ERROR, payload: error})
            }
        );
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
    console.log("Create Mindmaps");

    callPostCreateMindmaps({file, name, isPublic, emails})
        .then((data) => {
                if (data) {
                    console.log(data);
                }
            },
            (error) => {
                store.dispatch({type: actionTypes.FORM_ERROR, payload: error})
            }
        );
};

const mindmapsService = {
    getOwnedMindmaps,
    getSharedMindmaps,
    getMindmapsById,
    postCreateMindmaps,
};

export default mindmapsService;