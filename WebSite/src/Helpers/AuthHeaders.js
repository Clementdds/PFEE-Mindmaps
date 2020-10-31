import store from '../Store/ConfigureStore';

const AuthHeader = () => {
    // return authorization header with jwt token
    const token = store.getState().User.token;

    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
};

const AuthPostHeader = () => {
    // return authorization header with jwt token
    const token = store.getState().User.token;

    if (token) {
        return {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        };
    } else {
        return {'Content-Type': 'application/json'};
    }
};

const requestHeader = {
    AuthHeader,
    AuthPostHeader
};

export default requestHeader;