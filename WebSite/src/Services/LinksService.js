import {API_BackEnd} from "../config";
import requestHeader from "../Helpers/AuthHeaders";
import callHandler from "../Helpers/HandleResponse";
import store from "../Store/ConfigureStore";
import * as actionTypes from "../Actions/ActionsTypes";

const API_POST_CREATE_LINKS_ENDPOINT = API_BackEnd + "/links/postLink";

/*
 * Open link in new tab
 */

const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
};

/*
 * Add a link to mindmap
 */

const callCreateLink = ({idMindmap, nodeid}) => {
    const requestOptions = {
        method: 'POST',
        headers: requestHeader.AuthPostHeader(),
        body: JSON.stringify({idMindmap: idMindmap, nodeid: nodeid})
    };
    return fetch(API_POST_CREATE_LINKS_ENDPOINT, requestOptions)
        .then(callHandler.handleResponse);
};

const createLink = ({idMindmap, nodeid}) => {

    store.dispatch({type: actionTypes.LINK_CLEAR_STATE});

    callCreateLink({idMindmap, nodeid})
        .then((data) => {
                if (data) {
                    const ownedMap = store.getState().Mindmaps.ownedMindmapsList.find(map => map.id.toString() === idMindmap.toString());
                    const sharedMap = store.getState().Mindmaps.sharedMindmapsList.find(map => map.id.toString() === idMindmap.toString());
                    let url = "";
                    if (ownedMap){
                        if (ownedMap.isPublic){
                            url = '/links/public/';
                        }
                        else {
                            url = '/links/private/';
                        }
                    }
                    else if (sharedMap){
                        if (ownedMap.isPublic){
                            url = '/links/public/';
                        }
                        else {
                            url = '/links/private/';
                        }
                    }
                    store.dispatch({type: actionTypes.LINK_SET_URL, payload: url + data.url});
                    openInNewTab(url + data.url);
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