import * as actionTypes from '../Actions/ActionsTypes'

const initialState = {
    url: null,
    error: null,
};

const LinkReducer = (state = initialState, action) => {
    switch (action.type) {
        // Url
        case actionTypes.LINK_SET_URL:
            return {
                ...state,
                sharedMindmapsList: action.payload,
            };
        case actionTypes.LINK_RESET_URL:
            return {
                ...state,
                sharedMindmapsList: [],
            };

        // Link error
        case actionTypes.LINK_SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case actionTypes.LINK_RESET_ERROR:
            return {
                ...state,
                error: null,
            };

        // Clear state
        case actionTypes.LINK_CLEAR_STATE:
        case actionTypes.CLEAR_ALL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default LinkReducer;