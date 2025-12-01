// resources/js/components/articleForm/ArticleForm.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./ArticleForm.css";
import fond from "../../assets/fond2.png";

// récupère le token CSRF de la page Blade
const getCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : "";
};

const ArticleForm = () => {
    const { id } = useParams(); // /add → pas d'id, /edit/:id → id présent
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // 🔐 sécurité : seulement ADMIN
    useEffect(() => {
        if (!user || user.role !== "ADMIN") {
            navigate("/");
        }
    }, [user]);

    // état du formulaire – même ordre que ta BD
    const [form, setForm] = useState({
        nom: "",
        description: "",
        prix: "",
        quantite: "",
        categorie: "",
        marque: "",
        taille: "S",
        couleur: "",
        sexe: "femme",
        image_url: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // si on est en mode édition → charger le produit depuis l’API
    useEffect(() => {
        if (!id) return; // mode "ajout"

        const fetchProduit = async () => {
            try {
                const res = await fetch(`/api/produits/${id}`);
                const data = await res.json();

                const p = data.data ?? data; // selon ta réponse API
                setForm({
                    nom: p.nom || "",
                    description: p.description || "",
                    prix: p.prix || "",
                    quantite: p.quantite || "",
                    categorie: p.categorie || "",
                    marque: p.marque || "",
                    taille: p.taille || "S",
                    couleur: p.couleur || "",
                    sexe: p.sexe || "femme",
                    image_url: p.image_url || "",
                });
            } catch (e) {
                console.error(e);
                setError("Impossible de charger l’article.");
            }
        };

        fetchProduit();
    }, [id]);

    // mise à jour des champs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const method = id ? "PUT" : "POST";
            const url = id ? `/api/produits/${id}` : "/api/produits";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(), // ✅ important
                    "X-Requested-With": "XMLHttpRequest",
                    // si jamais tu protèges avec Sanctum + token :
                    ...(user?.token
                        ? { Authorization: `Bearer ${user.token}` }
                        : {}),
                },
                credentials: "same-origin",
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok || data.success === false) {
                setError(data.message || "Erreur lors de l’enregistrement.");
                return;
            }

            // succès → on revient à la liste
            navigate("/articles");
        } catch (err) {
            console.error(err);
            setError("Erreur serveur, réessaie plus tard.");
        } finally {
            setLoading(false);
        }
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
                        {id ? "Modifier un article" : "Ajouter un article"}
                    </h2>

                    {error && <p className="error">{error}</p>}

                    <label>Nom :</label>
                    <input
                        name="nom"
                        type="text"
                        value={form.nom}
                        onChange={handleChange}
                        required
                    />

                    <label>Description :</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />

                    <label>Prix :</label>
                    <input
                        name="prix"
                        type="number"
                        step="0.01"
                        min="0"
                        value={form.prix}
                        onChange={handleChange}
                        required
                    />

                    <label>Quantité :</label>
                    <input
                        name="quantite"
                        type="number"
                        min="0"
                        value={form.quantite}
                        onChange={handleChange}
                        required
                    />

                    <label>Catégorie :</label>
                    <input
                        name="categorie"
                        type="text"
                        value={form.categorie}
                        onChange={handleChange}
                    />

                    <label>Marque :</label>
                    <input
                        name="marque"
                        type="text"
                        value={form.marque}
                        onChange={handleChange}
                    />

                    {/* ✅ SELECT taille */}
                    <label>Taille :</label>
                    <select
                        name="taille"
                        value={form.taille}
                        onChange={handleChange}
                    >
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>

                    <label>Couleur :</label>
                    <input
                        name="couleur"
                        type="text"
                        value={form.couleur}
                        onChange={handleChange}
                    />

                    {/* ✅ SELECT sexe */}
                    <label>Sexe :</label>
                    <select
                        name="sexe"
                        value={form.sexe}
                        onChange={handleChange}
                    >
                        <option value="femme">femme</option>
                        <option value="homme">homme</option>
                        <option value="unisexe">unisexe</option>
                    </select>

                    <label>Image (URL) :</label>
                    <input
                        name="image_url"
                        type="text"
                        value={form.image_url}
                        onChange={handleChange}
                        placeholder="/images/mon-produit.png"
                    />

                    {form.image_url && (
                        <img
                            src={form.image_url}
                            alt="preview"
                            className="preview-image"
                        />
                    )}

                    <div className="form-buttons">
                        <button
                            type="submit"
                            className="update-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Enregistrement…"
                                : id
                                ? "Mettre à jour"
                                : "Ajouter"}
                        </button>

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate("/articles")}
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
