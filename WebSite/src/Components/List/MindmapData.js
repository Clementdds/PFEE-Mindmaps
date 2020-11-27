import React from "react";
import {Link} from "react-router-dom";
import mindmapsService from "../../Services/MindMapsService";

const MindmapData = ({Mindmap, shared}) => {

    const handleDeleteClick = () => {
        mindmapsService.deleteMindmapsById({id: Mindmap.id});
    };

    return (
        <React.Fragment>
        <div className="row">
            <div className="col">
            <Link to={"/mindmap/" + Mindmap.id}>
                <div key={Mindmap.id} className="row">
                    <div className="col">
                        <div className="text-left mindMapName">
                            {Mindmap.name}
                        </div>
                    </div>
                    <div className="col-1">
                        {shared ?
                            <div className="text-right">
                                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-share-fill"
                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                                </svg>
                            </div>
                            :
                            <div/>
                        }
                    </div>
                    <div className="col-1">
                        <div className="text-left">
                            {Mindmap.isPublic ?
                                <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-eye-fill greenEyes"
                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                    <path fillRule="evenodd"
                                          d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                </svg>
                                :
                                <svg width="2em" height="2em" viewBox="0 0 16 16"
                                     className="bi bi-eye-slash-fill redEyes" fill="currentColor"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                    <path
                                        d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z"/>
                                    <path fillRule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"/>
                                </svg>
                            }
                        </div>
                    </div>
                </div>
            </Link>
            </div>
            <div className="col-2">
                    <div className="text-right">
                        <button onClick={handleDeleteClick} className="btn btn-light">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MindmapData;