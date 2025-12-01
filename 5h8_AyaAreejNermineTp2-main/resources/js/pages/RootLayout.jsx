// resources/js/pages/RootLayout.jsx
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

const RootLayout = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/produits");
                const json = await res.json();

                // ⚠️ On garde les noms de la BD : nom, prix, quantite, categorie, image_url, etc.
                setArticles(Array.isArray(json.data) ? json.data : []);
            } catch (e) {
                console.error("Erreur API produits :", e);
                setArticles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const outletContext = { articles, setArticles, addToCart, loading };

    return <Outlet context={outletContext} />;
};

export default RootLayout;
