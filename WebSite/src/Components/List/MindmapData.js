import React from "react";

const MindmapData = ({Mindmap}) => {
    return (
        <div key={Mindmap}>
            {Mindmap}
        </div>
    );
};

export default MindmapData;