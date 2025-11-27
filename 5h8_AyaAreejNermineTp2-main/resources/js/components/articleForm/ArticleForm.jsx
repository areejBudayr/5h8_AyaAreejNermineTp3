import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./ArticleForm.css";

const ArticleForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [articles, setArticles] = useOutletContext();
    const { isLoggedIn } = useContext(AuthContext);

    const index = id ? Number(id) : null;

    useEffect(() => {
        if (!isLoggedIn) {
            setArticles([]);
        }
    }, [isLoggedIn]);

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
        <div className="form-container">
            <h2>
                {index !== null ? "Modifier un article" : "Ajouter un article"}
            </h2>
            <form onSubmit={handleSubmit} className="article-form">
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label>Type</label>
                <textarea
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                />

                <label>Prix</label>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                {image && (
                    <img src={image} alt="preview" className="preview-image" />
                )}

                <button type="submit" className="update-button">
                    {index !== null ? "Mettre à jour" : "Ajouter"}
                </button>
            </form>
        </div>
    );
};

export default ArticleForm;
