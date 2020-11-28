import React, {useState, useCallback, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import userService from '../Services/UserService'
import * as actionTypes from '../Actions/ActionsTypes'

const LoginPage = ({isSignedIn, error, dispatch}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        dispatch({type: actionTypes.USER_RESET_ERROR})
    }, [dispatch]);

    const handleAuth = () => {
        userService.login({email: email, password: password});
    };

    /*
     *  Email
     */

    const handleEmailChange = useCallback(
        (newEmail) => setEmail(newEmail),
        []
    );

    const handleEmailOnchange = useCallback((e) => handleEmailChange(e.target.value), [
        handleEmailChange,
    ]);

    /*
     *  Password
     */

    const handlePasswordChange = useCallback(
        (newPassword) => setPassword(newPassword),
        []
    );

    const handlePasswordOnchange = useCallback((e) => handlePasswordChange(e.target.value), [
        handlePasswordChange,
    ]);

    return (
        <div>

            {
                isSignedIn && <Redirect to="/"/>
            }
            <div className="form-group row" >
                <div className="col"/>
                <div className="col formulaire">
                    <center className="marginTop2p text-icon">
                        <h2>
                            Connexion
                        </h2>
                    </center>
                    <label className="row formulaire">
                        <div className="col-3"> 
                            <center>
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-envelope-fill text-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                            </svg>
                            </center>
                        </div>
                        <div className="col">
                            <input aria-label="Email address" type="email" required
                                   placeholder="Adresse Email"
                                   onChange={handleEmailOnchange}
                                   className="form-control"
                            />
                        </div>
                    </label>
                    <label className="row">
                        <div className="col-3">
                            <center>
                                <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-lock-fill text-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z"/>
                                    <path fillRule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
                                </svg>
                            </center>
                        </div>
                        <div className="col">
                            <input aria-label="Password" type="password" required
                                   placeholder="Mot de passe"
                                   onChange={handlePasswordOnchange}
                                   className="form-control"
                            />
                        </div>
                    </label>
                    <div className="row marginBottom">
                        <div className="col-3"/>
                        <div className="col text-left marginTop2p">
                            <Link to={"/sign"}>
                                Créer un compte
                            </Link>
                        </div>
                        <div className="col text-right">
                            <button type="submit" className="btn btn-primary"
                                disabled={email === '' || password === ''}
                                onClick={handleAuth}
                                >
                                Connexion
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col"/>
            </div>
            {error && <strong>{error}</strong>}

        </div>
    )
};

const MapStateToProps = state => {
    return {
        isSignedIn: state.User.isSignedIn,
        error: state.User.error,
    };
};

export default connect(MapStateToProps)(LoginPage);
