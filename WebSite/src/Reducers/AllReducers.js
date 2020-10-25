// Redux
import {combineReducers} from "redux";

// Different Reducers
import ViewerReducer from "./ViewerReducer";
import UserReducer from "./UserReducer";
import MindmapsReducer from "./MindMapsReducer";

const allReducers = combineReducers({
   Viewer : ViewerReducer,
   User: UserReducer,
   Mindmaps: MindmapsReducer
});

export default allReducers;