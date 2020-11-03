import React, {useEffect} from "react";
import {connect} from "react-redux";
import Viewer from "./Viewer";
import mindmapsService from "../Services/MindMapsService";
import {Link} from "react-router-dom";
import * as d3 from "d3";

const MindmapById = ({id, file, nodeId, error}) => {

    useEffect(() => {
        d3.select("g").remove();
        mindmapsService.getMindmapsById({id: id});
    }, [id]);

    return (
        <React.Fragment>
            {file != null ?
                <div>
                    <Link to={'/'}>
                        Go back
                    </Link>
                    <Viewer file={file} nodeid={nodeId}/>
                </div>
                :
                <div>
                    non
                </div>
            }
        </React.Fragment>
    );
};

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    console.log(id);
    return {
        id: id,
        file: state.Viewer.file,
        nodeId: state.Viewer.nodeId,
        error: state.Viewer.error,
    }
};

export default connect(mapStateToProps)(MindmapById);