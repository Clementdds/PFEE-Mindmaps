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
            <div className="form-group row marginTop2p width-100">
                <div className="col"/>
                <div className="col">
                <div className="active-cyan-4 mb-4">
                        <input className="form-control" id="myInput" type="text" placeholder="Search" aria-label="Search"/>
                    </div>
                    {(!ownedMindmapsList.length && !sharedMindmapsList.length) &&
                    <div className={"margin-center-homepage"}>
                        Vous ne possedez aucun mindmap.
                    </div>
                    }
                    <React.Fragment>
                        {ownedMindmapsList.length !== 0 &&
                        ownedMindmapsList.map((x) => {
                            return (
                                <MindmapData Mindmap={x} key={x.id} shared={false}/>
                            );
                        })
                        }
                    </React.Fragment>
                    <React.Fragment>
                        {sharedMindmapsList.length !== 0 &&
                        sharedMindmapsList.map((x) => {
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
        ownedMindmapsList: state.Mindmaps.ownedMindmapsList,
        sharedMindmapsList: state.Mindmaps.sharedMindmapsList,
        error: state.Mindmaps.error,
    };
};

export default connect(MapStateToProps)(HomePage);