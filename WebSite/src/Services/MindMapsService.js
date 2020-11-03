import {API_AUTHENTICATION_ENDPOINT_HTTP} from "../config";
import requestHeader from "../Helpers/AuthHeaders";
import * as actionTypes from '../Actions/ActionsTypes'
import store from "../Store/ConfigureStore";
import callHandler from "../Helpers/HandleResponse";
import linkService from "./LinksService";

const API_GET_MINDMAPS_OWNED_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/getowned";
const API_GET_MINDMAPS_BY_ID_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/getMindmapFromId";
const API_POST_MINDMAPS_CREATE_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/mindmaps/create";

/*
 * Get list Mindmaps based on the Header token
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
    console.log("Get list Mindmaps service");

    store.dispatch({type: actionTypes.MINDMAPS_LOADING});

    callGetOwnedMindmaps()
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
    };

    return fetch(API_GET_MINDMAPS_BY_ID_ENDPOINT + "?mapId=" + id, requestOptions)
        .then(callHandler.handleResponse);
};

const getMindmapsById = ({id}) => {
    console.log("Get Mindmaps by id service");

    store.dispatch({type: actionTypes.MINDMAPS_LOADING});

    callGetMindmapsById({id})
        .then((data) => {
                if (data.mindmap) {
                    // Dispatch to state
                    store.dispatch({type: actionTypes.VIEWER_SET_INPUT_FILE, payload: data.mindmap});
                    store.dispatch({type: actionTypes.VIEWER_DELETE_NODE_ID});
                }
            },
            (error) => {
                store.dispatch({type: actionTypes.VIEWER_ERROR, payload: error})
            }
        );
};

/*
 * Post Mindmaps
 */

const callPostCreateMindmaps = ({file, name, isPublic}) => {
    const requestOptions = {
        method: 'POST',
        headers: requestHeader.AuthPostHeader(),
        body: JSON.stringify({text: file, name: name, isPublic: isPublic})
    };
    console.log(requestOptions);

    return fetch(API_POST_MINDMAPS_CREATE_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const postCreateMindmaps = ({file, name, isPublic, emails}) => {
    console.log("Post Mindmaps");

    callPostCreateMindmaps({file, name, isPublic})
        .then((data) => {
                if (data) {
                    console.log(data);
                    linkService.postAddPublicLink({
                        idMindmap: data.id,
                        nodeid: null,
                        isPublic: isPublic,
                        emails: emails
                    })
                }
            },
            (error) => {
                store.dispatch({type: actionTypes.FORM_ERROR, payload: error})
            }
        );
};

const mindmapsService = {
    getOwnedMindmaps,
    getMindmapsById,
    postCreateMindmaps,
};

export default mindmapsService;