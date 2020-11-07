import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

const PrivateRouteWithParams = ({component: Component, isSignedIn,...rest}) => {

    return (
        <Route {...rest} render={props => (
            isSignedIn ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );

};

const MapStateToProps = state => {
    return {
        isSignedIn: state.User.isSignedIn
    };
};

export default connect(MapStateToProps)(PrivateRouteWithParams);