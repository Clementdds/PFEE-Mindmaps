import React from 'react';
import {connect} from "react-redux";
import * as actionTypes from '../../Actions/ActionsTypes'
import Viewer from "../../Layout/Viewer";

const FormNewMindmap = ({isUploaded, textFile, dispatch}) => {

    const showFile = async (e) => {
        e.preventDefault();
        const reader = new FileReader();

        reader.onload = async (e) => {

            const text = (e.target.result);
            dispatch({type: actionTypes.SET_INPUT_FILE, payload: text});
        };
        reader.readAsText(e.target.files[0])
    };

    return (
        <div>
            {isUploaded ?
                (
                    <Viewer textFile={textFile}/>
                ) :
                (
                    <div><input type="file" onChange={(e) => showFile(e)}/></div>
                )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isUploaded: state.Viewer.isUploaded,
        textFile: state.Viewer.textFile,
    };
};

export default connect(mapStateToProps)(FormNewMindmap);