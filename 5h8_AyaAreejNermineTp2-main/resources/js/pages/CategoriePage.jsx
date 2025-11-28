import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import "./CategoriePage.css";

const CATEGORY_MAP = {
    chandails: ["T-shirt", "Sweatshirt", "Blouse", "Polo"],
    pantalons: ["Jean", "Jogging", "Pantalon", "Pantalon chic"],
    jupes_et_robes: ["Jupe"],
    hoodies_et_vestes: ["Sweatshirt"],
};

const CategoriePage = () => {
    const { nom } = useParams();
    const navigate = useNavigate();

    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const { articles, addToCart } = useOutletContext(); // ✅ ici

    const nomNormalise = nom
        .toLowerCase()
        .replace(/&/g, "_")
        .replace(/ /g, "_");
    const typesAcceptes = CATEGORY_MAP[nomNormalise] || [];

    const [search, setSearch] = useState("");
    const [addedIndex, setAddedIndex] = useState(null);

    const filtres = articles.filter(
        (a) =>
            typesAcceptes.includes(a.type) &&
            a.name.toLowerCase().includes(search.toLowerCase())
    );

    const MENU_CATEGORIES = [
        { label: "Chandails", path: "chandails" },
        { label: "Pantalons", path: "pantalons" },
        { label: "Jupes et robes", path: "jupes_et_robes" },
        { label: "Hoodies et vestes", path: "hoodies_et_vestes" },
    ];

    return (
        <div className="page-categorie">
            {/* ===== NAVBAR ===== */}
            <header className="site-header glass-header">
                <div className="logo" onClick={() => navigate("/")}>
                    NAAR
                </div>

                <nav>
                    <a onClick={() => navigate("/articles")}>Articles</a>

                    {MENU_CATEGORIES.filter((c) => c.path !== nomNormalise).map(
                        (cat) => (
                            <a
                                key={cat.path}
                                onClick={() =>
                                    navigate(`/categorie/${cat.path}`)
                                }
                            >
                                {cat.label}
                            </a>
                        )
                    )}

                    {user && !user.isAdmin && (
                        <button
                            className="login-btn"
                            onClick={() => navigate("/panier")}
                        >
                            Panier 🛒
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

            {/* ===== TITRE ===== */}
            <div className="categorie-header">
                <button className="back-btn" onClick={() => navigate("/")}>
                    ← Retour
                </button>
                <h1 className="categorie-title">
                    {MENU_CATEGORIES.find((c) => c.path === nomNormalise)
                        ?.label || nom}
                </h1>
            </div>

            {/* ===== RECHERCHE ===== */}
            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Rechercher un article..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* ===== ARTICLES ===== */}
            {filtres.length === 0 ? (
                <p className="no-articles">Aucun article trouvé.</p>
            ) : (
                <div className="categorie-grid">
                    {filtres.map((article, idx) => (
                        <div
                            className={`glass card ${
                                addedIndex === idx ? "added-animation" : ""
                            }`}
                            key={idx}
                        >
                            {/* TOAST "AJOUTÉ" */}
                            {addedIndex === idx && (
                                <div className="added-toast">✔ Ajouté !</div>
                            )}

                            {/* IMAGE */}
                            <div className="card-img">
                                <img src={article.image} alt={article.name} />
                            </div>

                            {/* INFO */}
                            <div className="card-info">
                                <h3>{article.name}</h3>
                                <p className="type">{article.type}</p>
                                <p className="price">{article.price}$</p>
                            </div>

                            {/* AJOUT PANIER (USER NORMAL) */}
                            {user && !user.isAdmin && (
                                <div className="category-options">
                                    {/* Taille */}
                                    <select
                                        defaultValue="S"
                                        className="category-select"
                                        onChange={(e) =>
                                            (article._size = e.target.value)
                                        }
                                    >
                                        <option>XS</option>
                                        <option>S</option>
                                        <option>M</option>
                                        <option>L</option>
                                        <option>XL</option>
                                    </select>

                                    {/* Quantité */}
                                    <input
                                        type="number"
                                        min="1"
                                        defaultValue={1}
                                        className="category-qty"
                                        onChange={(e) =>
                                            (article._qty = e.target.value)
                                        }
                                    />

                                    {/* BOUTON */}
                                    <button
                                        className="add-cart-btn"
                                        onClick={() => {
                                            addToCart(
                                                article,
                                                article._size || "S",
                                                article._qty || 1
                                            );
                                            setAddedIndex(idx);
                                            setTimeout(
                                                () => setAddedIndex(null),
                                                700
                                            );
                                        }}
                                    >
                                        Ajouter au panier
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoriePage;
