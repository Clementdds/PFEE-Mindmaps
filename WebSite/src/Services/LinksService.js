import {API_AUTHENTICATION_ENDPOINT_HTTP} from "../config";
import requestHeader from "../Helpers/AuthHeaders";
import callHandler from "../Helpers/HandleResponse";
import store from "../Store/ConfigureStore";
import * as actionTypes from "../Actions/ActionsTypes";

const API_POST_CREATE_LINKS_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/links/postLink";

/*
 * Add a link to mindmap
 */

const callCreateLink = ({idMindmap, nodeid}) => {
    const requestOptions = {
        method: 'POST',
        headers: requestHeader.AuthPostHeader(),
        body: JSON.stringify({idMindmap: idMindmap, nodeid: nodeid})
    };
    console.log(requestOptions);

    return fetch(API_POST_CREATE_LINKS_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const createLink = ({idMindmap, nodeid}) => {
    console.log("Create link service");

    store.dispatch({type: actionTypes.LINK_CLEAR_STATE});

    callCreateLink({idMindmap, nodeid})
        .then((data) => {
                if (data) {
                    store.dispatch({type: actionTypes.LINK_SET_URL, payload: data.url});
                }
            },
            () => {
                store.dispatch({type: actionTypes.LINK_RESET_ERROR, payload: "Could not create url."})
            }
        );
};

const linkService = {
    createLink,
};

export default linkService;