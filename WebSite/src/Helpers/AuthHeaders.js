import {connect} from "react-redux";

const AuthHeader = ({token}) => {
    // return authorization header with jwt token
    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
};

const MapStateToProps = state => {
    return {
        token: state.User.token
    };
};

export default connect(MapStateToProps)(AuthHeader);