import {API_AUTHENTICATION_ENDPOINT_HTTP} from "../config";
import requestHeader from "../Helpers/AuthHeaders";
import callHandler from "../Helpers/HandleResponse";
import store from "../Store/ConfigureStore";
import * as actionTypes from "../Actions/ActionsTypes";

const API_POST_LINKS_ADD_PUBLIC_ENDPOINT = API_AUTHENTICATION_ENDPOINT_HTTP + "/links/addPublicLink";


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

const linkService = {
    postAddPublicLink,
};

export default linkService;