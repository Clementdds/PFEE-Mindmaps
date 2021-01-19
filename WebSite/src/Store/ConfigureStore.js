import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import allReducers from "../Reducers/AllReducers";
import SearchSaga from "../Saga/SearchSaga";

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    // eslint-disable-next-line no-underscore-dangle
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const store = createStore(allReducers, enhancer);

[SearchSaga].map(saga => sagaMiddleware.run(saga));

export default store;