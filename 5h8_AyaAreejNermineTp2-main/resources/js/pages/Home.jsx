import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

import modele from "../assets/modele.png"; // ✓ utilisé dans <img>
import fond from "../assets/fond.png"; // ✓ utilisé en background
import articles from "../data/articles";
import "./Home.css";

const Home = () => {
    // const [articles] = useOutletContext();
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="home">
            {/* ===== HEADER ===== */}
            <header className="site-header glass-header">
                <div className="logo">PinkWear</div>
                <nav>
                    <a href="/">Accueil</a>
                    <a href="/articles">Articles</a>
                    <a href="/chandails">Chandails</a>
                    <a href="/pantalons">Pantalons</a>
                    <a href="/jupes&robes">Jupes et robes</a>
                    <a href="/hoodies&vestes">Hoodies et vestes</a>

                    {isLoggedIn && <a href="/add">Ajouter</a>}

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
                </nav>
            </header>

            {/* ===== HERO ===== */}
            <section
                className="hero"
                style={{ backgroundImage: `url(${fond})` }} // ✓ UTILISATION DU FOND IMPORTÉ
            >
                <div className="hero-content">
                    {/* Bloc Glass gauche */}
                    <div className="glass hero-box">
                        <h1 className="hero-title">Collection 2025</h1>
                        <p className="hero-subtitle">
                            Élégance, douceur & modernité — un univers rose
                            pastel.
                        </p>

                        {isLoggedIn ? (
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

                    {/* IMAGE DES MODÈLES (AVEC IMPORT) */}
                    <div className="hero-models">
                        <img src={modele} alt="Modèles PinkWear" />
                    </div>
                </div>
            </section>

            {/* ===== ARTICLES ===== */}
            <section className="articles-section">
                <h2 className="section-title">Articles populaires</h2>

                <div className="article-grid">
                    {articles.slice(0, 24).map((article) => (
                        <div className="glass card" key={article.id}>
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
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
