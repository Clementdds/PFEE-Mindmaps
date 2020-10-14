import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

const PrivateRoute = ({children, isSignedIn,...rest}) => {

    return (
        <Route {...rest}>
            {isSignedIn ?
                <React.Fragment>
                    {children}
                </React.Fragment>
                : <Redirect to="/login"/>}
        </Route>
    );

};

const MapStateToProps = state => {
    return {
        isSignedIn: state.User.isSignedIn
    };
};

export default connect(MapStateToProps)(PrivateRoute);