import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { CartContext } from "../../CartContext";

import "./ArticleCard.css";

const ArticleCard = ({ article, onEdit, onDelete, index }) => {
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);

    const [size, setSize] = useState("S");
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false); // animation

    const handleAdd = () => {
        addToCart(article, size, quantity);

        setAdded(true); // trigger animation
        setTimeout(() => setAdded(false), 700); // reset after animation
    };

    return (
        <div className={`article-card ${added ? "added-animation" : ""}`}>
            {added && <div className="added-toast">✔ Ajouté !</div>}

            {article.image && (
                <div className="article-media">
                    <img src={article.image} className="article-image" alt="" />
                </div>
            )}

            <p>
                <strong>Description :</strong> {article.description}
            </p>
            <p>
                <strong>Type :</strong> {article.type}
            </p>
            <p>
                <strong>Prix :</strong> {article.price}$
            </p>

            {/* 🛒 UTILISATEUR NORMAL */}
            {user && !user.isAdmin && (
                <div className="panier-options">
                    <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    >
                        <option>XS</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>

                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    <button className="add-cart-btn" onClick={handleAdd}>
                        🛍 Ajouter au panier
                    </button>
                </div>
            )}

            {/* 🔧 ADMIN */}
            {user?.isAdmin && (
                <div className="article-card-buttons">
                    <button
                        className="edit-button"
                        onClick={() => onEdit(index)}
                    >
                        Modifier
                    </button>
                    <button
                        className="delete-button"
                        onClick={() => onDelete(index)}
                    >
                        Supprimer
                    </button>
                </div>
            )}
        </div>
    );
};

export default ArticleCard;
