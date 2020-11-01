import React, {useCallback, useState} from 'react';
import {connect} from "react-redux";
import * as actionTypes from '../../Actions/ActionsTypes'
import mindmapsService from "../../Services/MindMapsService";
import ListEmailValidator from "./ListEmailValidator";

const FormNewMindmap = ({error, dispatch}) => {

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

        if (fileText == null) {
            dispatch({type: actionTypes.FORM_ERROR, payload: "No file has been provided"});
        } else {

            if (ListEmailValidator(listEmails)) {

                /*
                *  Check file is xml
                */
                const convert = require('xml-js');
                let result = null;
                try {
                    result = convert.xml2js(fileText.toString(), {ignoreComment: true, alwaysChildren: true});
                    mindmapsService.postCreateMindmaps({
                        file: JSON.stringify(result),
                        isPublic: isPublic,
                        name: name,
                        emails: listEmails
                    });
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
        <div>
            <div>
                <h2>
                    Add a new mindmap !
                </h2>
            </div>
            <div>
                <div>
                    <div>
                        <input aria-label="name" type="name" required
                               placeholder="Name"
                               onChange={handleNameOnchange}
                        />
                    </div>

                    <div>
                        Public
                        <input type="checkbox"
                               onChange={handleIsPublicOnchange}
                        />
                    </div>

                    {!isPublic &&
                    <div>
                        List of emails you wish to share with
                        <input aria-label="email"
                               placeholder="email;email;email"
                               onChange={handleListEmailsOnchange}
                        />
                    </div>}

                    <div>
                        <input type="file"
                               onChange={(e) => showFile(e)}
                        />
                    </div>
                </div>

                <div>
                    <button type="submit"
                            disabled={name === ''}
                            onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>

            {error &&
            <div>
                {error}
            </div>
            }

        </div>

    );
};

const mapStateToProps = state => {
    return {
        error: state.Mindmaps.postMindmapError,
    };
};

export default connect(mapStateToProps)(FormNewMindmap);