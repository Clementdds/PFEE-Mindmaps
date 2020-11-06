import * as actionTypes from '../Actions/ActionsTypes'

const initialState = {
    isLoading: false,
    ownedMindmapsList: [],
    sharedMindmapsList: [],
    error: null,
    postMindmapError: null,
};

const MindmapsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Loading
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

        // Owned mindmaps
        case actionTypes.MINDMAPS_OWNED_SET_LIST:
            return {
                ...state,
                isLoading: false,
                ownedMindmapsList: action.payload,
                error: null,
                postMindmapError: null,
            };
        case actionTypes.MINDMAPS_OWNED_RESET_LIST:
            return {
                ...state,
                isLoading: false,
                ownedMindmapsList: [],
                error: null,
                postMindmapError: null,
            };

        // Shared mindmaps
        case actionTypes.MINDMAPS_SHARED_SET_LIST:
            return {
                ...state,
                isLoading: false,
                sharedMindmapsList: action.payload,
                error: null,
                postMindmapError: null,
            };
        case actionTypes.MINDMAPS_SHARED_RESET_LIST:
            return {
                ...state,
                isLoading: false,
                sharedMindmapsList: [],
                error: null,
                postMindmapError: null,
            };

        // Mindmap error
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

        // Create mindmap form
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

        // Clear state
        case actionTypes.MINDMAPS_CLEAR_STATE:
            return initialState;
        default:
            return state;
    }
};

export default MindmapsReducer;