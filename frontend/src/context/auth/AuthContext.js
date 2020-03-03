import React, { createContext, useCallback, useState, useContext } from 'react';

import { loginRequest, logoutRequest, registerRequest } from '../../actions/auth';

const AuthContext = createContext({
    user: null,
    login: () => null,
    logout: () => null,
    register: () => null,
});

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = useCallback(async (username, password) => {
        return loginRequest(username, password).then((data) => {
            setUser(data.user);
            setToken(data.token);
        });
    }, [setUser, setToken]);

    const logout = useCallback(async () => {
        return logoutRequest(token).then(() => {
            setUser(null);
            setToken(null);
        });
    }, [token, setUser, setToken]);

    const register = useCallback((username, email, password) => {
        registerRequest(username, email, password).then((data) => {
            setUser(data.user);
            setToken(data.token);
        }).catch((error) => {
            console.log(error)
        });

    }, [setUser, setToken]);

    return {
        user,
        login,
        logout,
        register,
    };
}

const AuthProvider = ({children}) => {
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
