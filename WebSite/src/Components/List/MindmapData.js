import React from "react";
import {Link} from "react-router-dom";

const MindmapData = ({Mindmap}) => {
    return (
        <div key={Mindmap.id}>
            {Mindmap.name} -->
            <Link to={"/mindmap/" + Mindmap.id} >
                  Go to Mindmap
            </Link>
        </div>
    );
};

export default MindmapData;