import { useOutletContext, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import ArticleCard from "../articleCard/ArticleCard";
import "./ArticleList.css";

const ArticleList = () => {
    const [articles, setArticles] = useOutletContext();
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const [editArticle, setEditArticle] = useState(null);
    const [editedDescription, setEditedDescription] = useState("");
    const [editedPrice, setEditedPrice] = useState("");
    const [editedImage, setEditedImage] = useState("");
    const [editedType, setEditedType] = useState("");

    const [articleToDelete, setArticleToDelete] = useState(null);

    const handleEdit = (article) => {
        setEditArticle(article);
        setEditedDescription(article.description);
        setEditedType(article.type);
        setEditedPrice(article.price);
        setEditedImage(article.image);
    };

    const handleSave = () => {
        setArticles(
            articles.map((article) =>
                article.id === editArticle.id
                    ? {
                          ...article,
                          description: editedDescription,
                          type: editedType,
                          price: editedPrice,
                          image: editedImage,
                      }
                    : article
            )
        );
        setEditArticle(null);
    };

    const handleDelete = (article) => {
        setArticleToDelete(article);
    };

    const confirmDelete = () => {
        if (articleToDelete) {
            setArticles(articles.filter((a) => a.id !== articleToDelete.id));
            setArticleToDelete(null);
        }
    };

    return (
        <div>
            <h2>Articles</h2>
            {articles.length === 0 && <p>Aucun article ajouté.</p>}
            {isLoggedIn && (
                <button onClick={() => navigate("/add")}>
                    Ajouter un article
                </button>
            )}

            {/* plein écran pour la section Articles */}
            <div className="full-bleed">
                <div className="article-container">
                    {articles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            onEdit={() => handleEdit(article)}
                            onDelete={() => handleDelete(article)}
                        />
                    ))}
                </div>
            </div>

            {/* ===== Edit Modal instead of bottom form ===== */}
            {editArticle && (
                <div className="modal">
                    <div className="edit-form">
                        <label>Description:</label>
                        <input
                            type="text"
                            value={editedDescription}
                            onChange={(e) =>
                                setEditedDescription(e.target.value)
                            }
                        />

                        <label>Type: </label>
                        <input
                            type="text"
                            value={editedType}
                            onChange={(e) => setEditedType(e.target.value)}
                        />

                        <label>Prix:</label>
                        <input
                            type="text"
                            value={editedPrice}
                            onChange={(e) => setEditedPrice(e.target.value)}
                        />

                        <label>Image:</label>
                        <input
                            type="text"
                            value={editedImage}
                            onChange={(e) => setEditedImage(e.target.value)}
                        />

                        {editedImage && (
                            <img
                                src={editedImage}
                                className="preview-image"
                                alt="preview"
                            />
                        )}

                        <div className="edit-actions">
                            <button
                                className="save-button"
                                onClick={handleSave}
                            >
                                Mettre à jour
                            </button>
                            <button
                                className="cancel-button"
                                onClick={() => setEditArticle(null)}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {articleToDelete && (
                <div className="modal">
                    <p>
                        Êtes-vous sûr de vouloir supprimer cet article? Cette
                        action est irréversible.
                    </p>
                    <div className="modal-actions">
                        <button
                            className="delete-button"
                            onClick={confirmDelete}
                        >
                            Confirmer
                        </button>
                        <button
                            className="cancel-button"
                            onClick={() => setArticleToDelete(null)}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArticleList;
