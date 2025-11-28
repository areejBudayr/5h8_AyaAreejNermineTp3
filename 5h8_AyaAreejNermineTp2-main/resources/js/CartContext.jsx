// resources/js/CartContext.jsx
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Charger le panier depuis le localStorage
    useEffect(() => {
        const saved = localStorage.getItem("cart");
        if (saved) setCart(JSON.parse(saved));
    }, []);

    // Sauvegarder le panier à chaque changement
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Ajouter au panier
    const addToCart = (article, size, quantity) => {
        setCart((prev) => [
            ...prev,
            {
                ...article,
                size,
                quantity: Number(quantity),
            },
        ]);
    };

    // Mettre à jour la quantité (utilisé dans Panier)
    const updateQuantity = (index, quantity) => {
        setCart((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, quantity: Number(quantity) } : item
            )
        );
    };

    // Mettre à jour la taille (utilisé dans Panier)
    const updateSize = (index, size) => {
        setCart((prev) =>
            prev.map((item, i) => (i === index ? { ...item, size } : item))
        );
    };

    // Supprimer un article (par index dans Panier)
    const removeFromCart = (index) => {
        setCart((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateQuantity,
                updateSize,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
