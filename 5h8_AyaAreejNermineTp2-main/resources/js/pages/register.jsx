// resources/js/pages/Register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import fond from "../assets/fond2.png";
import "./register.css";

const getCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : "";
};
const Register = () => {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(), // ✅ important
                    "X-Requested-With": "XMLHttpRequest", // ✅ classique Laravel
                },
                credentials: "same-origin", // envoie les cookies si besoin
                body: JSON.stringify({
                    name: `${prenom} ${nom}`,
                    email,
                    password,
                    password_confirmation: passwordConfirm,
                }),
            });

            const data = await response.json();

            if (!response.ok || data.success === false) {
                setError(data.message || "Erreur d'inscription");
                setLoading(false);
                return;
            }

            // data.data = { user, token }
            // ✅ on stocke directement le user + token dans le contexte
            login({
                ...data.data.user,
                token: data.data.token,
            });

            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Erreur serveur, réessaie plus tard.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="login-page"
            style={{
                backgroundImage: `url(${fond})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}
        >
            <div className="login-overlay"></div>

            <div className="login-box glass">
                <h2 className="login-title">Inscription</h2>

                {error && <p className="error">{error}</p>}

                <form
                    onSubmit={handleRegister}
                    className="login-form grid-form"
                >
                    <div className="two-cols">
                        <input
                            type="text"
                            placeholder="Prénom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="Adresse email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="two-cols">
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <input
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                    />

                    <button
                        className="login-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Création du compte..." : "S’inscrire"}
                    </button>
                </form>

                <p className="login-register">
                    Déjà un compte ?
                    <span onClick={() => navigate("/login")}>
                        {" "}
                        Se connecter
                    </span>
                </p>

                <button className="login-btn" onClick={() => navigate("/")}>
                    Retour à l'Accueil
                </button>
            </div>
        </div>
    );
};

export default Register;
