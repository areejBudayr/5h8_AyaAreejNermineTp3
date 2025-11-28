// resources/js/AuthContext.jsx
import { createContext, useState, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null); // si tu en as besoin

    const login = useCallback((userData) => {
        setIsLoggedIn(true);
        setUser(userData || null);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
