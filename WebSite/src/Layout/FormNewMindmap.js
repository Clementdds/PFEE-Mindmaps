import React, {useCallback, useState} from 'react';
import {connect} from "react-redux";
import * as actionTypes from '../Actions/ActionsTypes'
import ListEmailValidator from "../Components/Forms/ListEmailValidator";
import formService from "../Services/FormService";
import { useHistory } from "react-router-dom";


const FormNewMindmap = ({error, dispatch}) => {

    let history = useHistory();

    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [listEmails, setListEmails] = useState('');
    const [fileText, setFileText] = useState(null);

    /*
     *  Name
     */

    const handleNameChange = useCallback(
        (newName) => setName(newName),
        []
    );

    const handleNameOnchange = useCallback((e) => handleNameChange(e.target.value), [
        handleNameChange,
    ]);

    /*
     *  isPublic
     */

    const handleIsPublicChange = useCallback(
        (newIsPublic) => setIsPublic(newIsPublic),
        []
    );

    const handleIsPublicOnchange = useCallback((e) => handleIsPublicChange(e.target.checked), [
        handleIsPublicChange,
    ]);

    /*
     *  isPublic
     */

    const handleListEmailsChange = useCallback(
        (newListEmails) => setListEmails(newListEmails),
        []
    );

    const handleListEmailsOnchange = useCallback((e) => handleListEmailsChange(e.target.value), [
        handleListEmailsChange,
    ]);

    /*
     *  Input file
     */

    const showFile = async (e) => {
        e.preventDefault();

        const files = e.target.files;
        const file = files[0];

        const reader = new FileReader();

        reader.onload = async () => {
            setFileText(reader.result);
        };
        reader.readAsText(file);
    };

    /*
     *  Submit
     */

    const handleSubmit = () => {
        dispatch({type: actionTypes.FORM_RESET_ERROR});
        if (fileText == null) {
            dispatch({type: actionTypes.FORM_ERROR, payload: "No file has been provided"});
        } else {
            if (isPublic || ListEmailValidator(listEmails)) {

                /*
                *  Check file is xml
                */
                const convert = require('xml-js');
                let result = null;
                try {
                    result = convert.xml2js(fileText.toString(), {ignoreComment: true, alwaysChildren: true});

                    // Actual call to backend
                    formService.postCreateMindmaps({
                        file: JSON.stringify(result),
                        isPublic: isPublic,
                        name: name,
                        emails: (isPublic || listEmails === '') ? null : listEmails.trim().split(';')
                    });

                    if (error == null){
                        history.push("/");
                    }


                } catch (e) {
                    dispatch({type: actionTypes.FORM_ERROR, payload: "File does not respect xml format"});
                }
            }
            else {
                dispatch({type: actionTypes.FORM_ERROR, payload: "Error in email field"});
            }
        }
    };

    return (
        <div className="row form-group  ">
            <div className="col"/>
            <div className="col formulaire">
            <div className="marginTop2p marginBottom">
                <h2><center className="text-icon">
                    Nouveau MindMap
                </center></h2>
            </div>
            <div>
                
                <div>
                    <div className="row">
                        <div className="col-3 text-right">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-file-earmark-fill text-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0H4zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z"/>
                            </svg>
                        </div>
                        <div className="col">
                            <input aria-label="name" type="name" required
                               placeholder="Nom du fichier"
                               onChange={handleNameOnchange}
                               className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row marginTop2p">
                        <div className="col-3 text-right">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-upload text-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path fillRule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                        </div>
                        <div className="col">
                            <input type="file"
                               onChange={(e) => showFile(e)}
                            />
                        </div>
                    </div>
                    <div className="row marginTop2p">
                        <div className="col-3 text-right">
                        {isPublic?
                        <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-eye-fill greenEyes" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                            <path fillRule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg> 
                        :
                        <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-eye-slash-fill redEyes" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z"/>
                            <path fillRule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"/>
                        </svg>
                        }
                        </div>
                        <div className="col">
                        Public : 
                        <input type="checkbox"
                               onChange={handleIsPublicOnchange}
                        />
                        </div>
                    </div>
                    {!isPublic &&
                    <div>
                        <div className="row ">
                            <div className="col-3"/>
                                <div className="col text-left">
                                    Liste des e-mails des utilisateurs avec lesquels vous souhaitez partager :
                                </div>
                            </div>
                        <div className="row">
                        <div className="col-3 text-right">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-share-fill text-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                            </svg>
                        </div>
                        <div className="col text-left">
                        <input aria-label="email"
                               placeholder="email;email;email"
                               onChange={handleListEmailsOnchange}
                        />
                        </div>
                    </div>
                    </div>
                    }
                </div>

                <div>
                    <div className="row marginBottom marginTop2p"> 
                    <div className="col-3"/>
                    <div className="col text-right">
                    <button type="submit"
                            disabled={name === ''}
                            onClick={handleSubmit}
                            className="btn btn-primary"
                    >
                        Submit
                    </button>
                    </div>
                    </div>
                   
                </div>
            </div>
            {error &&
            <div>
                {error}
            </div>
            }
            </div>
        <div className="col"/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        error: state.Form.error,
    };
};

export default connect(mapStateToProps)(FormNewMindmap);