import {API_AUTHENTICATION_ENDPOINT_HTTP} from "../config";
import requestHeader from "../Helpers/AuthHeaders";
import callHandler from "../Helpers/HandleResponse";
import store from "../Store/ConfigureStore";
import * as actionTypes from "../Actions/ActionsTypes";

const API_POST_LINKS_ADD_PUBLIC_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/links/addPublicLink";
const API_GET_LINKS_MINDMAPS_BY_URL_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/links/getMindmapFromUrl";

/*
 * Add a link to mindmap
 */

const callPostAddPublicLink = ({idMindmap, nodeid, isPublic, emails}) => {
    const requestOptions = {
        method: 'POST',
        headers: requestHeader.AuthPostHeader(),
        body: JSON.stringify({idMindmap: idMindmap, nodeid: nodeid, isPublic: isPublic, emails: emails})
    };
    console.log(requestOptions);

    return fetch(API_POST_LINKS_ADD_PUBLIC_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const postAddPublicLink = ({idMindmap, nodeid, isPublic, emails}) => {
    console.log("Post public link service");

    callPostAddPublicLink({idMindmap, nodeid, isPublic, emails})
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

    callGetMindmapsByUrl({url})
        .then((data) => {
                console.log(data);
                store.dispatch({type: actionTypes.VIEWER_SET_INPUT_FILE, payload: data.fullmap});
                store.dispatch({type: actionTypes.VIEWER_SET_NODE_ID, payload: data.nodeid});
            },
            (error) => {
                console.log(error);
                store.dispatch({type: actionTypes.VIEWER_ERROR, payload: error});
            }
        );
};

const linkService = {
    postAddPublicLink,
    getMindmapsByUrl,
};

export default linkService;