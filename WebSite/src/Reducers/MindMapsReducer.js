import * as actionTypes from '../Actions/ActionsTypes'

const initialState = {
    isLoading: false,
    ownedMindmapsList: [],
    sharedMindmapsList: [],
    url: null,
    error: null,
    searchText: '',
    searchOwnedMindmapsList: [],
    searchSharedMindmapsList: [],
};

const MindmapsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Loading
        case actionTypes.MINDMAPS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.MINDMAPS_RESET_LOADING:
            return {
                ...state,
                isLoading: false,
            };

        // Owned mindmaps
        case actionTypes.MINDMAPS_OWNED_SET_LIST:
            return {
                ...state,
                ownedMindmapsList: action.payload,
            };
        case actionTypes.MINDMAPS_OWNED_RESET_LIST:
            return {
                ...state,
                ownedMindmapsList: [],
            };

        // Shared mindmaps
        case actionTypes.MINDMAPS_SHARED_SET_LIST:
            return {
                ...state,
                sharedMindmapsList: action.payload,
            };
        case actionTypes.MINDMAPS_SHARED_RESET_LIST:
            return {
                ...state,
                sharedMindmapsList: [],
            };

        // Mindmap error
        case actionTypes.MINDMAPS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case actionTypes.MINDMAPS_RESET_ERROR:
            return {
                ...state,
                error: null,
            };

        // Search
        // Input
        case actionTypes.SEARCH_TEXT_SET:
            return {
                ...state,
                searchText: action.payload,
            };
        case actionTypes.SEARCH_TEXT_RESET:
            return {
                ...state,
                searchText: '',
            };

        // Result
        case actionTypes.SEARCH_RESULT_SET:
            const searchTextLowerCase = state.searchText.toLowerCase();
            const searchOwned = state.ownedMindmapsList.filter((item) => {
                const itemLowerCase = item.name.toLowerCase();
                return itemLowerCase.includes(searchTextLowerCase);
            });
            const searchShared = state.sharedMindmapsList.filter((item) => {
                const itemLowerCase = item.name.toLowerCase();
                return itemLowerCase.includes(searchTextLowerCase);
            });
            return {
                ...state,
                searchOwnedMindmapsList: searchOwned,
                searchSharedMindmapsList: searchShared,
            };
        case actionTypes.SEARCH_RESULT_RESET:
            return {
                ...state,
                searchOwnedMindmapsList: state.ownedMindmapsList,
                searchSharedMindmapsList: state.sharedMindmapsList,
            };

        // Clear state
        case actionTypes.MINDMAPS_CLEAR_STATE:
        case actionTypes.CLEAR_ALL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default MindmapsReducer;