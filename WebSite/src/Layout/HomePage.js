import React, {useEffect} from "react";
import userService from "../Services/UserService";
import GetInputFile from "../Components/Forms/FormNewMindmap";
import {connect} from "react-redux";
import mindmapsService from "../Services/MindMapsService";
import MindmapData from "../Components/List/MindmapData";

const HomePage = ({mindmapsList, error, dispatch}) => {

    useEffect(() => {
        mindmapsService.getListMindmaps();
    }, [dispatch]);

    return (
        <React.Fragment>
            <button onClick={userService.logout}>Logout</button>

            {mindmapsList.length ?
                mindmapsList.map((x) => {
                    return (
                        <MindmapData Mindmap={x}/>
                    );
                }) :
                <div>
                    No previous mindmaps
                </div>
            }

            {error && <div>Error : {error}</div>}

            <GetInputFile/>
        </React.Fragment>
    );
};

const MapStateToProps = state => {
    return {
        mindmapsList: state.Mindmaps.mindmapsList,
        error: state.Mindmaps.error,
    };
};

export default connect(MapStateToProps)(HomePage);