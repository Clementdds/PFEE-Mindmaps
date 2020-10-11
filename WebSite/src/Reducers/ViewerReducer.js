import * as actionTypes from '../Actions/ActionsTypes'

const initialState = {
    isUploaded: false,
    textFile: "",
    data: null,
    tree: null,
};

const ViewerReducer = (state = initialState, action) => {
    switch (action.type) {
        // Input File
        case actionTypes.SET_INPUT_FILE:
            return {
                ...state,
                isUploaded: true,
                textFile: action.payload
            };
        case actionTypes.DELETE_INPUT_FILE:
            return {
                ...state,
                textFile: "",
                isUploaded: false
            };

        // Data
        case actionTypes.SET_DATA:
            return {
                ...state,
                data: action.payload
            };
        case actionTypes.DELETE_DATA:
            return {
                ...state,
                data: null
            };

        // Tree
        case actionTypes.SET_TREE:
            return {
                ...state,
                tree: action.payload
            };
        case actionTypes.DELETE_TREE:
            return {
                ...state,
                tree: null
            };
        default:
            return state;
    }
};

export default ViewerReducer;