// resources/js/pages/Home.jsx
import { useState, useContext } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";

import { AuthContext } from "../AuthContext";

import modele from "../assets/modele.png";
import fond from "../assets/fond.png";
import "./Home.css";

const Home = () => {
    const { isLoggedIn, logout, user } = useContext(AuthContext);

    // articles + addToCart viennent de RootLayout
    const { articles, addToCart } = useOutletContext();

    const [addedIndex, setAddedIndex] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="home">
            {/* ===== HEADER ===== */}
            <header className="site-header glass-header">
                <div className="logo">NAAR</div>
                <nav>
                    <Link to="/">Accueil</Link>
                    <Link to="/articles">Articles</Link>
                    <Link to="/categorie/Chandails">Chandails</Link>
                    <Link to="/categorie/Pantalons">Pantalons</Link>
                    <Link to="/categorie/Jupes_et_robes">Jupes et robes</Link>
                    <Link to="/categorie/Hoodies_et_vestes">
                        Hoodies et vestes
                    </Link>

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

            {/* ===== HERO ===== */}
            <section
                className="hero"
                style={{ backgroundImage: `url(${fond})` }}
            >
                <div className="hero-content">
                    <div className="glass hero-box">
                        <h1 className="hero-title">Collection 2025</h1>
                        <p className="hero-subtitle">
                            Élégance, douceur & modernité — un univers rose
                            pastel.
                        </p>

                        {user?.isAdmin ? (
                            <button
                                className="hero-btn"
                                onClick={() => navigate("/add")}
                            >
                                Ajouter un article
                            </button>
                        ) : (
                            <button
                                className="hero-btn"
                                onClick={() => navigate("/login")}
                            >
                                Se connecter
                            </button>
                        )}
                    </div>

                    <div className="hero-models">
                        <img src={modele} alt="Modèles PinkWear" />
                    </div>
                </div>
            </section>

            {/* ===== ARTICLES POPULAIRES ===== */}
            <section className="articles-section">
                <h2 className="section-title">Articles populaires</h2>

                <div className="article-grid">
                    {articles.slice(0, 8).map((article, index) => (
                        <div
                            className={`glass card home-card ${
                                addedIndex === index ? "added-animation" : ""
                            }`}
                            key={article.id}
                        >
                            {addedIndex === index && (
                                <div className="added-toast">✔ Ajouté !</div>
                            )}

                            <div className="card-image-wrapper">
                                <img
                                    src={article.image}
                                    alt={article.description}
                                />
                            </div>

                            <div className="card-info">
                                <p className="card-desc">
                                    {article.description}
                                </p>
                                <p className="card-type">{article.type}</p>
                                <p className="card-price">{article.price}</p>
                            </div>

                            {user && !user.isAdmin && (
                                <div className="category-options">
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

                                    <input
                                        type="number"
                                        min="1"
                                        defaultValue={1}
                                        className="category-qty"
                                        onChange={(e) =>
                                            (article._qty = e.target.value)
                                        }
                                    />

                                    <button
                                        className="add-cart-btn"
                                        onClick={() => {
                                            addToCart(
                                                article,
                                                article._size || "S",
                                                article._qty || 1
                                            );
                                            setAddedIndex(index);
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
            </section>
        </div>
    );
};

export default Home;
