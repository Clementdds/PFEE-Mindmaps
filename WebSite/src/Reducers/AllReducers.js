// Redux
import {combineReducers} from "redux";

// Different Reducers
import ViewerReducer from "./ViewerReducer";
import UserReducer from "./UserReducer";
import MindmapsReducer from "./MindMapsReducer";
import FormReducer from "./FormReducer";
import LinkReducer from "./LinkReducer";

const allReducers = combineReducers({
   Viewer : ViewerReducer,
   User: UserReducer,
   Mindmaps: MindmapsReducer,
   Form: FormReducer,
   Link: LinkReducer,
});

export default allReducers;