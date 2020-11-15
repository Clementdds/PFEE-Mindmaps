import React, {useEffect} from "react";
import {connect} from "react-redux";
import linkService from "../Services/LinksService";
import Viewer from "./Viewer";

const PublicMindmap = ({url, file, nodeId, error}) => {

    useEffect(() => {
        linkService.getMindmapsByUrl({url: url});
    }, [url]);

    return (
        <React.Fragment>
            {file != null ?
                <div>
                    <Viewer file={file} nodeid={nodeId}/>
                </div>
                :
                <div>
                    Could not display the mindmap
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
        error: state.Viewer.error,
    }
};

export default connect(mapStateToProps)(PublicMindmap);