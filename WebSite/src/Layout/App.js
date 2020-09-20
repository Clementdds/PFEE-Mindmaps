import React from 'react';
import Viewer from "./Viewer";

import {connect} from "react-redux";
import * as actionTypes from '../Actions/ActionsTypes'

const App = ({isUploaded, textFile, dispatch}) => {

    const showFile = async (e) => {
        e.preventDefault();
        const reader = new FileReader();

        reader.onload = async (e) => {

            const text = (e.target.result);
            dispatch({type: actionTypes.GET_INPUT_FILE, payload: text});
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

export default connect(mapStateToProps)(App);