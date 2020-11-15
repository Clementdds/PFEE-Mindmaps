import React, {useEffect} from "react";
import {connect} from "react-redux";
import mindmapsService from "../Services/MindMapsService";
import MindmapData from "../Components/List/MindmapData";
import * as actionTypes from '../Actions/ActionsTypes'

const HomePage = ({ownedMindmapsList, sharedMindmapsList, error, dispatch}) => {

    useEffect(() => {
        mindmapsService.getOwnedMindmaps();
        mindmapsService.getSharedMindmaps();
        dispatch({type: actionTypes.VIEWER_CLEAR_STATE});
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className="form-group row marginTop2p" >
                <div className="col"/>
                <div className="col">
                    <div>
                        {ownedMindmapsList.length ?
                            ownedMindmapsList.map((x) => {
                                return (
                                    <MindmapData Mindmap={x} key={x.id} shared={false}/>
                                );
                            }) :
                            <div/>
                        }
                    </div>
                    <div>
                    {sharedMindmapsList.length ?
                        sharedMindmapsList.map((x) => {
                            return (
                                <MindmapData Mindmap={x} key={x.id} shared={true}/>
                            );
                        }) :
                        <div/>
                    }
                    </div>
                </div>
                <div className="col"/>
            </div>

            {error && <div>Error : {error}</div>}

        </React.Fragment>
    );
};

const MapStateToProps = state => {
    return {
        ownedMindmapsList: state.Mindmaps.ownedMindmapsList,
        sharedMindmapsList: state.Mindmaps.sharedMindmapsList,
        error: state.Mindmaps.error,
    };
};

export default connect(MapStateToProps)(HomePage);