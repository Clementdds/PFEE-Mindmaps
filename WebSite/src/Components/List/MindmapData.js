import React from "react";

const MindmapData = ({Mindmap}) => {

    console.log(Mindmap);

    return (
        <div key={Mindmap.id}>
            {Mindmap.id}
            {Mindmap.name}
            {Mindmap.isPublic ? "public" : "privée"}
        </div>
    );
};

export default MindmapData;