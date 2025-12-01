// resources/js/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // On recharge le user depuis localStorage au démarrage
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("naar_user");
        return saved ? JSON.parse(saved) : null;
    });

    const isLoggedIn = !!user;

    // 🔐 Normalise le user : ajoute isAdmin selon le role
    const normalizeUser = (apiUser) => {
        if (!apiUser) return null;

        return {
            ...apiUser,
            isAdmin: apiUser.role === "ADMIN", // ⬅️ IMPORTANT
        };
    };

    const login = (apiUser) => {
        const normalized = normalizeUser(apiUser);
        setUser(normalized);
        localStorage.setItem("naar_user", JSON.stringify(normalized));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("naar_user");
    };

    // Au cas où l’objet dans le localStorage n’ait pas encore isAdmin
    useEffect(() => {
        if (user && typeof user.isAdmin === "undefined") {
            const normalized = normalizeUser(user);
            setUser(normalized);
            localStorage.setItem("naar_user", JSON.stringify(normalized));
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
