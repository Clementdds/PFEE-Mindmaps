import store from "../Store/ConfigureStore";

const AuthHeader = () => {
    // return authorization header with jwt token
    const token = store.getState().User.token;

    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
};

export default AuthHeader;