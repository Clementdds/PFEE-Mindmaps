import * as actionTypes from '../Actions/ActionsTypes'

const initialState = {
    isUploaded: false,
    textFile: ""
};

const ViewerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_INPUT_FILE:
            return {
                ...state,
                isUploaded: true,
                textFile: action.payload
            };
        default:
            return state;
    }
};

export default ViewerReducer;