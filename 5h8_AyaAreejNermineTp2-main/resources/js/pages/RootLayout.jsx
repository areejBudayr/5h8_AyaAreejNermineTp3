// resources/js/pages/RootLayout.jsx
import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";

import ARTICLES from "../data/articles";
import { CartContext } from "../CartContext";

const RootLayout = () => {
    const [articles, setArticles] = useState(ARTICLES);
    const { addToCart } = useContext(CartContext);

    // Ce qui sera partagé à toutes les pages enfants
    const outletContext = { articles, setArticles, addToCart };

    return <Outlet context={outletContext} />;
};

export default RootLayout;
