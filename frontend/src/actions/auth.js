import { ApiUrls } from '../components/common/DataProvider/urls';

const withAuthorization = (token, requestObj) => {
    requestObj.headers = {
        Authorization: `Token ${token}`,
        ...requestObj.headers
    };
    return requestObj;
};

const loginRequest = async (username, password) => {
    return await fetch(ApiUrls.LOGIN, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw Error('Error Login');
        }
    });
};

const logoutRequest = async (token) => {
    return await fetch(ApiUrls.LOGOUT, withAuthorization(token, {
        method: 'post',
    })).then(res => {
        if (res.ok) {

        } else {
            throw Error('Error Logout');
        }
    });
};

const registerRequest = async (username, email, password) => {
    return await fetch(ApiUrls.REGISTER, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw Error('Error Register');
        }
    });
};

export { loginRequest, logoutRequest, registerRequest };
