// Redux
import {combineReducers} from "redux";

// Different Reducers
import ViewerReducer from "./ViewerReducer";
import UserReducer from "./UserReducer";

const allReducers = combineReducers({
   Viewer : ViewerReducer,
   User: UserReducer
});

export default allReducers;