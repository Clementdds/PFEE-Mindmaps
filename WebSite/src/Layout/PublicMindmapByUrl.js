import React, {useEffect} from "react";
import {connect} from "react-redux";
import Viewer from "./Viewer";
import mindmapsService from "../Services/MindMapsService";
import * as d3 from "d3";

const PublicMindmapByUrl = ({url, file, nodeId, name, error}) => {
    if(nodeId !== null)
    {
     
        d3.select("g").remove();
    }

    useEffect(() => {
        d3.select("g").remove();
        mindmapsService.getOwnedMindmaps();
        mindmapsService.getSharedMindmaps();   
        mindmapsService.getMindmapsByUrl({url: url, Public: true});
    }, [url]);

    return (
        <React.Fragment>
            {file != null ?
                <div>
                    <Viewer file={file} nodeid={nodeId} name={name} mindmapId={null} isshared={true}/>
                </div>
                :
                <div>
                    {error}
                </div>
            }
        </React.Fragment>
    );
};

const mapStateToProps = (state, ownProps) => {
    let url = ownProps.match.params.url;
    return {
        url: url,
        file: state.Viewer.file,
        nodeId: state.Viewer.nodeId,
        name: state.Viewer.name,
        error: state.Viewer.error,
    }
};

export default connect(mapStateToProps)(PublicMindmapByUrl);