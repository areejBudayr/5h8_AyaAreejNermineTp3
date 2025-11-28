import { useOutletContext, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import ArticleCard from "../components/articleCard/ArticleCard";
import "./ArticleList.css";

const ArticleList = () => {
    // On récupère l'objet envoyé par RootLayout
    const { articles, setArticles } = useOutletContext();
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [filteredArticles, setFilteredArticles] = useState([]);

    const handleSearch = (e) => {
        if (e.key === "Enter" && search.trim() !== "") {
            navigate(`/articles?q=${encodeURIComponent(search.trim())}`);
        }
    };

    useEffect(() => {
        const s = search.toLowerCase();
        setFilteredArticles(
            articles.filter(
                (a) =>
                    a.description.toLowerCase().includes(s) ||
                    a.type.toLowerCase().includes(s) ||
                    a.price.toString().includes(s)
            )
        );
    }, [search, articles]);

    // EDIT MODAL
    const [editArticle, setEditArticle] = useState(null);
    const [editedDescription, setEditedDescription] = useState("");
    const [editedPrice, setEditedPrice] = useState("");
    const [editedImage, setEditedImage] = useState("");
    const [editedType, setEditedType] = useState("");

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

    // DELETE MODAL
    const [articleToDelete, setArticleToDelete] = useState(null);

    const handleDelete = (article) => setArticleToDelete(article);

    const confirmDelete = () => {
        if (articleToDelete) {
            setArticles(articles.filter((a) => a.id !== articleToDelete.id));
            setArticleToDelete(null);
        }
    };

    return (
        <div className="home">
            {/* ===== HEADER ===== */}
            <header className="site-header glass-header">
                <div className="logo" onClick={() => navigate("/")}>
                    NAAR
                </div>

                {/* 🔍 SEARCHBAR (qu’on garde) */}
                <div className="header-search">
                    <input
                        type="text"
                        placeholder="Rechercher un article..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>

                <nav>
                    <a onClick={() => navigate("/")}>Accueil</a>
                    <a onClick={() => navigate("/categorie/Chandails")}>
                        Chandails
                    </a>
                    <a onClick={() => navigate("/categorie/Pantalons")}>
                        Pantalons
                    </a>
                    <a onClick={() => navigate("/categorie/Jupes_et_robes")}>
                        Jupes et robes
                    </a>
                    <a onClick={() => navigate("/categorie/Hoodies_et_vestes")}>
                        Hoodies et vestes
                    </a>
                    {user && !user.isAdmin && (
                        <button
                            className="login-btn"
                            onClick={() => navigate("/panier")}
                        >
                            Panier
                        </button>
                    )}
                    {!isLoggedIn ? (
                        <>
                            <button
                                className="login-btn"
                                onClick={() => navigate("/login")}
                            >
                                Se connecter
                            </button>
                            <button
                                className="login-btn"
                                onClick={() => navigate("/register")}
                            >
                                S'inscrire
                            </button>
                        </>
                    ) : (
                        <button className="login-btn" onClick={logout}>
                            Se déconnecter
                        </button>
                    )}
                </nav>
            </header>

            <div className="article-page">
                <h2 className="titre">Articles</h2>

                {/* 🔐 ADMIN ONLY : Ajouter */}
                {isLoggedIn && user?.isAdmin && (
                    <button
                        className="login-btn"
                        onClick={() => navigate("/add")}
                    >
                        + Ajouter un article
                    </button>
                )}

                {/* ARTICLE GRID */}
                <div className="full-bleed">
                    <div className="article-container">
                        {filteredArticles.map((article) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                onEdit={
                                    user?.isAdmin
                                        ? () => handleEdit(article)
                                        : null
                                }
                                onDelete={
                                    user?.isAdmin
                                        ? () => handleDelete(article)
                                        : null
                                }
                            />
                        ))}
                    </div>
                </div>

                {/* EDIT MODAL (admin only) */}
                {editArticle && user?.isAdmin && (
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

                            <label>Type:</label>
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

                {/* DELETE MODAL (admin only) */}
                {articleToDelete && user?.isAdmin && (
                    <div className="modal">
                        <p>
                            Êtes-vous sûr de vouloir supprimer cet article ?
                            Cette action est irréversible.
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
        </div>
    );
};

export default ArticleList;
