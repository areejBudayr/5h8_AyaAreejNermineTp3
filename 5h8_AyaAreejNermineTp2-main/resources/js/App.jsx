import { RouterProvider } from "react-router-dom";
import { useCallback, useState } from "react";
import { AuthContext } from "./AuthContext";
import router from "./router"; // <-- notre nouveau router/index.js

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useCallback(() => setIsLoggedIn(true), []);
    const logout = useCallback(() => setIsLoggedIn(false), []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            <RouterProvider router={router} />
        </AuthContext.Provider>
    );
};

export default App;
