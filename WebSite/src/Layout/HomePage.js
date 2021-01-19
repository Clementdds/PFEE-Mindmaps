import React, {useCallback, useEffect} from "react";
import {connect} from "react-redux";
import mindmapsService from "../Services/MindMapsService";
import MindmapData from "../Components/List/MindmapData";
import * as actionTypes from '../Actions/ActionsTypes'

const HomePage = ({searchOwnedMindmapsList, searchSharedMindmapsList, error, dispatch}) => {

    const cancelShowSearch = useCallback(() => {
        dispatch({type: actionTypes.SEARCH_TEXT_RESET});
        document.getElementById('myInput').value = '';
    }, [dispatch]);

    const handleOnChange = useCallback((e) => {
        dispatch({type: actionTypes.SEARCH_TEXT_SET, payload: e.target.value});
    }, [
        dispatch,
    ]);

    useEffect(() => {
        mindmapsService.getOwnedMindmaps();
        mindmapsService.getSharedMindmaps();
        dispatch({type: actionTypes.VIEWER_CLEAR_STATE});
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className="form-group row marginTop2p width-100">
                <div className="col"/>
                <div className="col">
                <div className="active-cyan-4 mb-4">
                        <input className="form-control" id="myInput" type="text" placeholder="Search" aria-label="Search"
                            onFocus={cancelShowSearch}
                            onChange={handleOnChange}/>
                    </div>
                    {(!searchOwnedMindmapsList.length && !searchSharedMindmapsList.length) &&
                    <div className={"margin-center-homepage"}>
                        Vous ne possedez aucun mindmap.
                    </div>
                    }
                    <React.Fragment>
                        {searchOwnedMindmapsList.length !== 0 &&
                        searchOwnedMindmapsList.map((x) => {
                            return (
                                <MindmapData Mindmap={x} key={x.id} shared={false}/>
                            );
                        })
                        }
                    </React.Fragment>
                    <React.Fragment>
                        {searchSharedMindmapsList.length !== 0 &&
                        searchSharedMindmapsList.map((x) => {
                            return (
                                <MindmapData Mindmap={x} key={x.id} shared={true}/>
                            );
                        })
                        }
                    </React.Fragment>
                </div>
                <div className="col"/>
            </div>

        </React.Fragment>
    );
};

const MapStateToProps = state => {
    return {
        searchOwnedMindmapsList: state.Mindmaps.searchOwnedMindmapsList,
        searchSharedMindmapsList: state.Mindmaps.searchSharedMindmapsList,
        error: state.Mindmaps.error,
    };
};

export default connect(MapStateToProps)(HomePage);