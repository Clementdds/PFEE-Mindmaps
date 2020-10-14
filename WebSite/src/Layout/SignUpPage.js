import React, {useState, useCallback} from 'react';
import {connect} from "react-redux";
import userService from '../Services/UserService'
import {Link} from "react-router-dom";

const SignUpPage = ({error}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleAuth = () => {
        userService.signUP({email: email, password: password})
    };

    const handleEmailChange = useCallback(
        (newEmail) => setEmail(newEmail),
        []
    );

    const handlePasswordChange = useCallback(
        (newPassword) => setPassword(newPassword),
        []
    );

    const handleVerifyPasswordChange = useCallback(
        (newVerifyPassword) => setVerifyPassword(newVerifyPassword),
        []
    );

    const handleEmailOnchange = useCallback((e) => handleEmailChange(e.target.value), [
        handleEmailChange,
    ]);

    const handlePasswordOnchange = useCallback((e) => handlePasswordChange(e.target.value), [
        handlePasswordChange,
    ]);

    const handleVerifyPasswordOnchange = useCallback((e) => handleVerifyPasswordChange(e.target.value), [
        handleVerifyPasswordChange,
    ]);

    return (
        <div>
            <div>
                <div>
                    <h2>
                        Sign Up !
                    </h2>
                    <Link to={"/login"}>
                        Go to sign up
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
                        <div>
                            <input aria-label="Password" type="password" required
                                   placeholder="Verify Password"
                                   value={verifyPassword}
                                   onChange={handleVerifyPasswordOnchange}
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                                disabled={email === '' || password === '' || verifyPassword === '' || verifyPassword !== password}
                                onClick={handleAuth}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>

            {error && <strong>{error}</strong>}

        </div>
    );
};

const MapStateToProps = state => {
    return {
        error: state.User.error
    };
};

export default connect(MapStateToProps)(SignUpPage);
