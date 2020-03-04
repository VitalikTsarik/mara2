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

    const login = useCallback(async (username, password) => {
        return loginRequest(username, password).then((data) => {
            setUser(data.user);
        });
    }, []);

    const logout = useCallback(async () => {
        return logoutRequest().then(() => {
            setUser(null);
        });
    }, []);

    const register = useCallback((username, email, password) => {
        registerRequest(username, email, password).then((data) => {
            setUser(data.user);
        }).catch((error) => {
            console.log(error)
        });

    }, []);

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
