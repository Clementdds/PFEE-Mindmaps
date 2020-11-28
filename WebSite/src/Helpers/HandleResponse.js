const handleResponse = (response) => {
    return response.json().then(data => {
        if (!response.ok || data.error) {

            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
};

const callHandler = {
    handleResponse,
};

export default callHandler;