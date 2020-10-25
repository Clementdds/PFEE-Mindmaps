import {API_AUTHENTICATION_ENDPOINT_HTTP} from "../config";
import requestHeader from "../Helpers/AuthHeaders";
import * as actionTypes from '../Actions/ActionsTypes'
import store from "../Store/ConfigureStore";
import callHandler from "../Helpers/HandleResponse";

const API_GET_LIST_MINDMAPS_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/getowned";
const API_GET_MINDMAPS_BY_ID_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/getMindmap";
const API_POST_MINDMAPS_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/create";

/*
 * Get list Mindmaps based on the Header token
 */

const callGetListMindmaps = () => {
    const requestOptions = {
        method: 'GET',
        headers: requestHeader.AuthHeader(),
    };

    return fetch(API_GET_LIST_MINDMAPS_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const getListMindmaps = () => {
    console.log("Get list Mindmaps service");

    store.dispatch({type: actionTypes.MINDMAPS_LOADING});

    callGetListMindmaps()
        .then(
            (data) => {
                if (Array.isArray(data.mindmapsList) && data.mindmapsList.length) {
                    // Dispatch to state
                    store.dispatch({type: actionTypes.MINDMAPS_SET_LIST, payload: data.mindmapsList});
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
        body: JSON.stringify({id: id})
    };

    return fetch(API_GET_MINDMAPS_BY_ID_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const getMindmapsById = (id) => {
    console.log("Get Mindmaps by id service");

    store.dispatch({type: actionTypes.MINDMAPS_LOADING});

    callGetMindmapsById(id)
        .then((data) => {
                if (data.mindmapsList) {
                    // Dispatch to state
                    store.dispatch({type: actionTypes.SET_TREE, payload: data});
                }
            },
            (error) => {
                store.dispatch({type: actionTypes.MINDMAPS_ERROR, payload: error})
            }
        );
};

/*
 * Post Mindmaps
 */

const callPostMindmaps = ({tree, name}) => {
    const requestOptions = {
        method: 'POST',
        headers: requestHeader.AuthPostHeader(),
        body: JSON.stringify({text: tree, name: name})
    };

    return fetch(API_POST_MINDMAPS_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const postMindmaps = ({tree, name}) => {
    console.log("Post Mindmaps");

    callPostMindmaps({tree, name})
        .then((data) => {
                if (data) {
                    console.log(data);
                }
            },
            (error) => {
                store.dispatch({type: actionTypes.MINDMAPS_ERROR, payload: error})
            }
        );
};

const mindmapsService = {
    getListMindmaps,
    getMindmapsById,
    postMindmaps,
};

export default mindmapsService;