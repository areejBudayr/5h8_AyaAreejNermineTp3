// resources/js/App.jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import { AuthProvider } from "./AuthContext"; // si ton AuthContext est à la racine JS
import { CartProvider } from "./CartContext"; // idem pour CartContext

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <RouterProvider router={router} />
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
