import React, {useEffect} from "react";
import {connect} from "react-redux";
import Viewer from "./Viewer";
import mindmapsService from "../Services/MindMapsService";
import * as d3 from "d3";

const MindmapById = ({id, file, nodeId, name, error}) => {

    useEffect(() => {
        d3.select("g").remove();
        mindmapsService.getMindmapsById({id: id});
    }, [id]);

    return (
        <React.Fragment>
            {file != null ?
                <Viewer file={file} nodeid={nodeId} name={name} mindmapId={id}/>
                :
                <div>
                    {error}
                </div>
            }
        </React.Fragment>
    );
};

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        id: id,
        file: state.Viewer.file,
        nodeId: state.Viewer.nodeId,
        name: state.Viewer.name,
        error: state.Viewer.error,
    }
};

export default connect(mapStateToProps)(MindmapById);