import {API_AUTHENTICATION_ENDPOINT_HTTP} from "../config";
import requestHeader from "../Helpers/AuthHeaders";
import * as actionTypes from '../Actions/ActionsTypes'
import store from "../Store/ConfigureStore";
import callHandler from "../Helpers/HandleResponse";

const API_GET_MINDMAPS_OWNED_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/getowned";
const API_GET_MINDMAPS_SHARED_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/getshared";
const API_GET_MINDMAPS_BY_ID_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/getMindmapFromId";
const API_DELETE_MINDMAPS_BY_ID_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/";

/*
 * Function called to set loading to true/false and reset error since (new error / no error) is supposed to be set
 */

const mindmapStartLoading = () => {
    store.dispatch({type: actionTypes.MINDMAPS_LOADING});
    store.dispatch({type: actionTypes.MINDMAPS_RESET_ERROR});
};

const mindmapStopLoading = () => {
    store.dispatch({type: actionTypes.MINDMAPS_RESET_LOADING});
};

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

    mindmapStartLoading();

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
        )
        .finally(mindmapStopLoading);
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

    mindmapStartLoading();

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
        )
        .finally(mindmapStopLoading);
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

    mindmapStartLoading();
    store.dispatch({type: actionTypes.VIEWER_CLEAR_STATE});

    callGetMindmapsById({id})
        .then((data) => {
                store.dispatch({type: actionTypes.VIEWER_SET_INPUT_FILE, payload: data.mindmap});
            },
            (error) => {
                store.dispatch({type: actionTypes.VIEWER_ERROR, payload: error})
            }
        )
        .finally(mindmapStopLoading);
};

/*
 * Delete Mindmaps by id
 */

const callDeleteMindmapsById = ({id}) => {
    const requestOptions = {
        method: 'DELETE',
        headers: requestHeader.AuthHeader(),
    };

    console.log(requestOptions);

    return fetch(API_DELETE_MINDMAPS_BY_ID_ENDPOINT + id, requestOptions)
        .then(callHandler.handleResponse);
};

const deleteMindmapsById = ({id}) => {
    console.log("Delete Mindmaps by id service");

    mindmapStartLoading();

    callDeleteMindmapsById({id})
        .then((data) => {
                console.log(data)
            },
            (error) => {
                store.dispatch({type: actionTypes.MINDMAPS_ERROR, payload: error})
            }
        )
        .finally(mindmapStopLoading);
};

const mindmapsService = {
    getOwnedMindmaps,
    getSharedMindmaps,
    getMindmapsById,
    deleteMindmapsById,
};

export default mindmapsService;