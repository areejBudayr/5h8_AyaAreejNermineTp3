// resources/js/pages/ArticleList.jsx
import { useOutletContext, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import ArticleCard from "../components/articleCard/ArticleCard";
import "./ArticleList.css";

const ArticleList = () => {
    const { articles } = useOutletContext(); // plus besoin de setArticles ici
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [articleToDelete, setArticleToDelete] = useState(null);

    const [search, setSearch] = useState("");
    const [filteredArticles, setFilteredArticles] = useState([]);

    const handleSearch = (e) => {
        if (e.key === "Enter" && search.trim() !== "") {
            navigate(`/articles?q=${encodeURIComponent(search.trim())}`);
        }
    };
    const handleDelete = (article) => {
        setArticleToDelete(article);
    };
    const confirmDelete = async () => {
        if (!articleToDelete) return;

        try {
            const res = await fetch(`/api/produits/${articleToDelete.id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"),
                    ...(user?.token
                        ? { Authorization: `Bearer ${user.token}` }
                        : {}),
                },
            });

            const data = await res.json();

            if (!res.ok) {
                alert("Erreur : impossible de supprimer l'article.");
                return;
            }

            // enlever l’article du tableau local
            setArticles((prev) =>
                prev.filter((a) => a.id !== articleToDelete.id)
            );

            setArticleToDelete(null);
        } catch (e) {
            console.error(e);
            alert("Erreur serveur.");
        }
    };

    useEffect(() => {
        const s = search.toLowerCase();

        setFilteredArticles(
            articles.filter((a) => {
                const nom = (a.nom || "").toLowerCase();
                const description = (a.description || "").toLowerCase();
                const categorie = (a.categorie || "").toLowerCase();
                const prix = a.prix != null ? String(a.prix) : "";

                return (
                    nom.includes(s) ||
                    description.includes(s) ||
                    categorie.includes(s) ||
                    prix.includes(s)
                );
            })
        );
    }, [search, articles]);

    return (
        <div className="home">
            {/* ===== HEADER ===== */}
            <header className="site-header glass-header">
                <div className="logo" onClick={() => navigate("/")}>
                    NAAR
                </div>

                {/* 🔍 Barre de recherche */}
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

                    {user && user.role !== "ADMIN" && (
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

                {/* 🔐 ADMIN ONLY : bouton ajouter */}
                {isLoggedIn && user?.role === "ADMIN" && (
                    <button
                        className="login-btn"
                        onClick={() => navigate("/add")}
                    >
                        + Ajouter un article
                    </button>
                )}

                {/* Grille d’articles */}
                <div className="full-bleed">
                    <div className="article-container">
                        {filteredArticles.map((article) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
                {articleToDelete && (
                    <div className="delete-modal">
                        <div className="delete-box glass">
                            <h3>Supprimer cet article ?</h3>
                            <p>
                                Voulez-vous vraiment supprimer :{" "}
                                <strong>{articleToDelete.nom}</strong> ?
                            </p>

                            <div className="modal-buttons">
                                <button
                                    className="delete-confirm"
                                    onClick={confirmDelete}
                                >
                                    Oui, supprimer
                                </button>
                                <button
                                    className="delete-cancel"
                                    onClick={() => setArticleToDelete(null)}
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticleList;
