import * as actionTypes from '../Actions/ActionsTypes'

const initialState = {
    isLoading: false,
    mindmapsList: [],
    error: null,
    postMindmapError: null,
};

const MindmapsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MINDMAPS_LOADING:
            return {
                ...state,
                isLoading: true,
                error: null,
                postMindmapError: null,
            };
        case actionTypes.MINDMAPS_RESET_LOADING:
            return {
                ...state,
                isLoading: false,
                error: null,
                postMindmapError: null,
            };
        case actionTypes.MINDMAPS_SET_LIST:
            return {
                ...state,
                isLoading: false,
                mindmapsList: action.payload,
                error: null,
                postMindmapError: null,
            };
        case actionTypes.MINDMAPS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                postMindmapError: null,
            };
        case actionTypes.MINDMAPS_RESET_ERROR:
            return {
                ...state,
                isLoading: false,
                error: null,
                postMindmapError: null,
            };
        case actionTypes.FORM_ERROR:
            return {
                ...state,
                postMindmapError: action.payload,
            };
        case actionTypes.FORM_RESET_ERROR:
            return {
                ...state,
                postMindmapError: null,
            };
        default:
            return state;
    }
};

export default MindmapsReducer;