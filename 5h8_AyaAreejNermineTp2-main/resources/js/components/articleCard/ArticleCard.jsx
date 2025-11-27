import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import "./ArticleCard.css";

const ArticleCard = ({ article, onEdit, onDelete, index }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className="article-card">
            {article.image && (
                <div className="article-media">
                    <img
                        src={article.image}
                        className="article-image"
                        alt={article.description || "article"}
                    />
                </div>
            )}

            <p>
                <strong>Description: </strong>
                {article.description}
            </p>
            <p>
                <strong>Type: </strong>
                {article.type}
            </p>
            <p>
                <strong>Prix: </strong>
                {article.price}
            </p>

            {isLoggedIn && (
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
