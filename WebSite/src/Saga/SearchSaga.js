import {delay, put, takeLatest, select} from "redux-saga/effects";
import * as actionTypes from '../Actions/ActionsTypes'

const SearchInputState = state => state.Mindmaps.searchText;

function* handleSearchInput() {
    // Delay by 500ms
    yield delay(500);
    const searchInput = yield select(SearchInputState);
    if (searchInput !== ''){
        yield put({type: actionTypes.SEARCH_RESULT_SET});
    }
    else{
        yield put({type: actionTypes.SEARCH_RESULT_RESET});
    }
}

function* handleSearchInputReset() {
    yield put({type: actionTypes.SEARCH_RESULT_RESET});
}

function* SearchSaga() {
    yield takeLatest(actionTypes.SEARCH_TEXT_SET, handleSearchInput)
    yield takeLatest(actionTypes.SEARCH_TEXT_RESET, handleSearchInputReset)
}

export default SearchSaga;