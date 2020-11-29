import React, {useEffect} from "react";
import {connect} from "react-redux";
import Viewer from "./Viewer";
import mindmapsService from "../Services/MindMapsService";

const PublicMindmap = ({url, file, nodeId, name, error}) => {

    useEffect(() => {
        mindmapsService.getMindmapsByUrl({url: url});
    }, [url]);

    return (
        <React.Fragment>
            {file != null ?
                <div>
                    <Viewer file={file} nodeid={nodeId} name={name} mindmapId={null}/>
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

export default connect(mapStateToProps)(PublicMindmap);