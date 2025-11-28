import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./ArticleForm.css";
import fond from "../../assets/fond2.png";

const ArticleForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [articles, setArticles] = useOutletContext();
    const { isLoggedIn, user } = useContext(AuthContext);

    // const index = id ? Number(id) : null;

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         setArticles([]);
    //     }
    // }, [isLoggedIn]);

    // 🔐 BLOQUER L'ACCÈS SI L'UTILISATEUR N'EST PAS ADMIN
    useEffect(() => {
        if (!user?.isAdmin) {
            navigate("/"); // redirection automatique
        }
    }, [user]);

    const articleAjouter =
        index !== null && articles[index]
            ? articles[index]
            : { description: "", price: "", image: "", type: "" };

    const [description, setDescription] = useState(
        articleAjouter.description || ""
    );
    const [price, setPrice] = useState(articleAjouter.price || "");
    const [image, setImage] = useState(articleAjouter.image || "");
    const [type, setType] = useState(articleAjouter.type || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedArticle = { description, price, type, image };

        if (index !== null && articles[index]) {
            const newArticles = [...articles];
            newArticles[index] = updatedArticle;
            setArticles(newArticles);
        } else {
            setArticles([...articles, updatedArticle]);
        }

        navigate("/");
    };

    return (
        <div
            className="page-wrapper"
            style={{
                backgroundImage: `url(${fond})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="form-container">
                <form onSubmit={handleSubmit} className="article-form">
                    <h2 className="form-title">
                        {index !== null
                            ? "Modifier un article"
                            : "Ajouter un article"}
                    </h2>

                    <label>Description :</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <label>Type :</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />

                    <label>Prix :</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />

                    <label>Image (URL) :</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="/src/assets/exemple.png"
                    />

                    {image && (
                        <img
                            src={image}
                            alt="preview"
                            className="preview-image"
                        />
                    )}

                    <div className="form-buttons">
                        <button type="submit" className="update-button">
                            {index !== null ? "Mettre à jour" : "Ajouter"}
                        </button>

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate("/")}
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ArticleForm;
