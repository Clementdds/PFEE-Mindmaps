import React, {useState, useCallback} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import userService from '../Services/UserService'

const LoginPage = ({isSignedIn, error}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = () => {
        userService.login({email: email, password: password});
    };

    const handleEmailChange = useCallback(
        (newEmail) => setEmail(newEmail),
        []
    );

    const handlePasswordChange = useCallback(
        (newPassword) => setPassword(newPassword),
        []
    );

    const handleEmailOnchange = useCallback((e) => handleEmailChange(e.target.value), [
        handleEmailChange,
    ]);

    const handlePasswordOnchange = useCallback((e) => handlePasswordChange(e.target.value), [
        handlePasswordChange,
    ]);

    return (
        <div>

            {
                isSignedIn && <Redirect to="/"/>
            }

            <div>
                <div>
                    <h2>
                        Sign in to your account !
                    </h2>
                    <Link to={"/sign"}>
                        Go to login
                    </Link>
                </div>
                <div>
                    <div>
                        <div>
                            <input aria-label="Email address" type="email" required
                                   placeholder="Email address"
                                   value={email}
                                   onChange={handleEmailOnchange}
                            />
                        </div>
                        <div>
                            <input aria-label="Password" type="password" required
                                   placeholder="Password"
                                   value={password}
                                   onChange={handlePasswordOnchange}
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                                disabled={email === '' || password === ''}
                                onClick={handleAuth}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
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
