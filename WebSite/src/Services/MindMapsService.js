import {API_AUTHENTICATION_ENDPOINT_HTTP} from "../config";
import requestHeader from "../Helpers/AuthHeaders";
import * as actionTypes from '../Actions/ActionsTypes'
import store from "../Store/ConfigureStore";
import callHandler from "../Helpers/HandleResponse";

const API_GET_MINDMAPS_OWNED_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/getowned";
const API_GET_MINDMAPS_SHARED_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/getshared";
const API_GET_MINDMAPS_BY_ID_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/getMindmapFromId";
const API_DELETE_MINDMAPS_BY_ID_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/";
const API_GET_LINKS_MINDMAPS_BY_URL_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/links/getMindmapFromUrl";

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
            () => {
                store.dispatch({type: actionTypes.MINDMAPS_ERROR, payload: "Could not get owned mindmaps."})
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
            () => {
                store.dispatch({type: actionTypes.MINDMAPS_ERROR, payload: "Could not get shared mindmaps."})
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
                store.dispatch({type: actionTypes.VIEWER_SET_NAME, payload: data.name});
            },
            () => {
                store.dispatch({type: actionTypes.VIEWER_ERROR, payload: "Mindmap does not exist or you do not have the right to access it."})
            }
        )
        .finally(mindmapStopLoading);
};

/*
 * Get Mindmaps by url
 */

const callGetMindmapsByUrl = ({url}) => {
    const requestOptions = {
        method: 'GET',
        headers: requestHeader.AuthHeader(),
        body: JSON.stringify({url: url})
    };

    console.log(requestOptions);
    return fetch(API_GET_LINKS_MINDMAPS_BY_URL_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const getMindmapsByUrl = ({url}) => {
    console.log("Get Mindmaps by url service");

    mindmapStartLoading();
    store.dispatch({type: actionTypes.VIEWER_CLEAR_STATE});

    callGetMindmapsByUrl({url})
        .then((data) => {
                console.log(data);
                store.dispatch({type: actionTypes.VIEWER_SET_INPUT_FILE, payload: data.fullmap});
                store.dispatch({type: actionTypes.VIEWER_SET_NAME, payload: data.name});
                store.dispatch({type: actionTypes.VIEWER_SET_NODE_ID, payload: data.nodeid});
            },
            () => {
                store.dispatch({type: actionTypes.VIEWER_ERROR, payload: "Mindmap does not exist or you do not have the right to access it."});
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
            () => {
                store.dispatch({type: actionTypes.MINDMAPS_ERROR, payload: "Could not delete mindmap."})
            }
        )
        .finally(() => {
            mindmapStopLoading();
            window.location.reload(false);
        });
};

const mindmapsService = {
    getOwnedMindmaps,
    getSharedMindmaps,
    getMindmapsById,
    getMindmapsByUrl,
    deleteMindmapsById,
};

export default mindmapsService;