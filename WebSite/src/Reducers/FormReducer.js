import * as actionTypes from '../Actions/ActionsTypes'

const initialState = {
    isLoading: false,
    result: null,
    error: null,
};

const FormReducer = (state = initialState, action) => {
    switch (action.type) {
        // Loading
        case actionTypes.FORM_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.FORM_RESET_LOADING:
            return {
                ...state,
                isLoading: false,
            };

        // Result
        case actionTypes.FORM_RESULT:
            return {
                ...state,
                result: action.payload,
            };
        case actionTypes.FORM_RESET_RESULT:
            return {
                ...state,
                result: null,
            };

        // Create mindmap form
        case actionTypes.FORM_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case actionTypes.FORM_RESET_ERROR:
            return {
                ...state,
                error: null,
            };

        // Clear state
        case actionTypes.FORM_CLEAR_STATE:
        case actionTypes.CLEAR_ALL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default FormReducer;