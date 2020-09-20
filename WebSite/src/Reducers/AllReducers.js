// Redux
import {combineReducers} from "redux";

// Different Reducers
import ViewerReducer from "./ViewerReducer";

const allReducers = combineReducers({
   Viewer : ViewerReducer
});

export default allReducers;