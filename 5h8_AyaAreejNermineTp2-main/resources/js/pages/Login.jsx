import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import fond from "../assets/fond2.png";
import "./Login.css";
const getCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : "";
};
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "same-origin",
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok || data.success === false) {
                setError(data.message || "Erreur de connexion");
                setLoading(false);
                return;
            }

            login({
                ...data.data.user,
                token: data.data.token,
            });

            navigate("/"); // retour à l'accueil
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
            {/* Overlay rose doux */}
            <div className="login-overlay"></div>

            {/* Carte Login */}
            <div className="login-box glass">
                <h2 className="login-title">Connexion</h2>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label>Email :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="login-btn" type="submit">
                        Se connecter
                    </button>
                </form>

                <p className="login-register">
                    Pas de compte ?
                    <span onClick={() => navigate("/register")}>
                        {" "}
                        S’inscrire
                    </span>
                </p>

                <button className="login-btn" type="submit" disabled={loading}>
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </div>
        </div>
    );
};

export default Login;
