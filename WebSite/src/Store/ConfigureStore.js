import {createStore, compose} from 'redux';
import allReducers from "../Reducers/AllReducers";

const enhancer = compose(
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const store = createStore(allReducers, enhancer);

export default store;