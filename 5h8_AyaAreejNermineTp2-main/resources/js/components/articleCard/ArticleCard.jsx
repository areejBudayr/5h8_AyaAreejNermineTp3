// resources/js/components/articleCard/ArticleCard.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { CartContext } from "../../CartContext";
import "./ArticleCard.css";

const ArticleCard = ({ article, onEdit, onDelete, index }) => {
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);

    const [size, setSize] = useState("S");
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        // Adapter pour le panier (forme ancienne)
        addToCart(
            {
                id: article.id,
                description: article.description,
                type: article.categorie,
                price: article.prix,
                image: article.image_url,
            },
            size,
            quantity
        );

        setAdded(true);
        setTimeout(() => setAdded(false), 700);
    };

    return (
        <div className={`article-card ${added ? "added-animation" : ""}`}>
            {added && <div className="added-toast">✔ Ajouté !</div>}

            {article.image_url && (
                <div className="article-media">
                    <img
                        src={article.image_url}
                        className="article-image"
                        alt=""
                    />
                </div>
            )}

            {/* ↘ Ordre = comme la BD */}
            <p>
                <strong>Nom :</strong> {article.nom}
            </p>
            <p>
                <strong>Description :</strong> {article.description}
            </p>
            <p>
                <strong>Prix :</strong> {article.prix}$
            </p>
            <p>
                <strong>Quantité :</strong> {article.quantite}
            </p>
            <p>
                <strong>Catégorie :</strong> {article.categorie}
            </p>
            <p>
                <strong>Marque :</strong> {article.marque}
            </p>
            <p>
                <strong>Taille :</strong> {article.taille}
            </p>
            <p>
                <strong>Couleur :</strong> {article.couleur}
            </p>
            <p>
                <strong>Sexe :</strong> {article.sexe}
            </p>

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
