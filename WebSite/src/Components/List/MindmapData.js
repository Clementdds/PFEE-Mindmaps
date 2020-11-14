import React from "react";
import {Link} from "react-router-dom";

const MindmapData = ({Mindmap, shared}) => {

    return (
        <Link to={"/mindmap/" + Mindmap.id}>
        <div key={Mindmap.id} class="row">
            <div class="col">
                <div class="text-left mindMapName">
                    {Mindmap.name}
                </div>                   
            </div>
            <div class="col-1">
            {shared? 
                <div class="text-right">
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-share-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                    </svg>  
                </div>
                :
                <div/>
            }
            </div>
            <div class="col-1">
                <div class="text-left">
                {Mindmap.isPublic? 
                    <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-eye-fill greenEyes" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg> 
                    :
                    <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-eye-slash-fill redEyes" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z"/>
                        <path fill-rule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"/>
                    </svg>
                }
                </div>       
            </div> 
        </div>
        </Link>
    );
};

export default MindmapData;