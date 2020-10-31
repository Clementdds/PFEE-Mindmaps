import * as actionTypes from '../Actions/ActionsTypes'

const initialState = {
    isLoading: false,
    mindmapsList: [],
    error: null
};

const MindmapsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MINDMAPS_LOADING:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case actionTypes.MINDMAPS_RESET_LOADING:
            return {
                ...state,
                isLoading: false,
                error: null
            };
        case actionTypes.MINDMAPS_SET_LIST:
            return {
                ...state,
                isLoading: false,
                mindmapsList: action.payload,
                error: null
            };
        case actionTypes.MINDMAPS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case actionTypes.MINDMAPS_RESET_ERROR:
            return {
                ...state,
                isLoading: false,
                error: null
            };
        default:
            return state;
    }
};

export default MindmapsReducer;