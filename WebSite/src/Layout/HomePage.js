import React, {useEffect} from "react";
import userService from "../Services/UserService";
import FormNewMindmap from "./FormNewMindmap";
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
            <div class="form-group row marginTop2p" >
                <div class="col"/>
                <div class="col">
                    <div>
                        {ownedMindmapsList.length ?
                            ownedMindmapsList.map((x) => {
                                console.log(x)
                                return (
                                    <MindmapData Mindmap={x} key={x.id} shared={false}/>
                                );
                            }) :
                            <div>
                            No owned mindmaps
                        </div>
                        }
                    </div>
                    <div>
                    {sharedMindmapsList.length ?
                        sharedMindmapsList.map((x) => {
                            return (
                                <MindmapData Mindmap={x} key={x.id} shared={true}/>
                            );
                        }) :
                        <div>
                            No shared mindmaps
                        </div>
                    }
                    </div>
                </div>
                <div class="col"/>
            </div>
            {error && <div>Error : {error}</div>}

            <FormNewMindmap/>
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