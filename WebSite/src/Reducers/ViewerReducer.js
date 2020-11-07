import * as actionTypes from '../Actions/ActionsTypes'

const initialState = {
    file: null,
    nodeId: null,
    error: null,
};

const ViewerReducer = (state = initialState, action) => {
    switch (action.type) {
        // Input File
        case actionTypes.VIEWER_SET_INPUT_FILE:
            return {
                ...state,
                file: action.payload
            };
        case actionTypes.VIEWER_DELETE_INPUT_FILE:
            return {
                ...state,
                file: null,
            };

        // nodeId
        case actionTypes.VIEWER_SET_NODE_ID:
            return {
                ...state,
                nodeId: action.payload
            };
        case actionTypes.VIEWER_DELETE_NODE_ID:
            return {
                ...state,
                nodeId: null
            };

        // Error
        case actionTypes.VIEWER_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.VIEWER_RESET_ERROR:
            return {
                ...state,
                error: null
            };

        // Clear state
        case actionTypes.VIEWER_CLEAR_STATE:
        case actionTypes.CLEAR_ALL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default ViewerReducer;