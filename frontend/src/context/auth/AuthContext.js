import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

import { loginRequest, logoutRequest, registerRequest, userRequest } from '../../actions/auth';

const AuthContext = createContext({
    user: null,
    login: () => null,
    logout: () => null,
    register: () => null,
});

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const updateUser = useCallback(async () => {
        try {
            const responseUser = await userRequest();
            if (!user || responseUser.id !== user.id) {
                setUser(responseUser);
            }
        } catch (e) {
            setUser(null);
        }
    }, [userRequest, user]);
    useEffect(() => {
        updateUser();
    });

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
        });
    }, []);

    return {
        user,
        login,
        logout,
        register,
        isAuthorized: Boolean(Cookies.get('auth_token')),
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
