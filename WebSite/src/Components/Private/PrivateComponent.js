import React from "react";
import {connect} from "react-redux";

const PrivateComponent = ({children, isSignedIn}) => {
    return (
        <div>
            {isSignedIn &&
                <React.Fragment>
                    {children}
                </React.Fragment>
            }
        </div>
    );
};

const MapStateToProps = state => {
    return {
        isSignedIn: state.User.isSignedIn
    };
};

export default connect(MapStateToProps)(PrivateComponent);