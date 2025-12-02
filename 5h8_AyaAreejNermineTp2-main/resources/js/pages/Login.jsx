import { useState, useContext, useEffect, useRef } from "react";
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

    const recaptchaWrapper = useRef(null);
    const recaptchaWidgetId = useRef(null);
    const recaptchaToken = useRef("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Charger le widget Google reCAPTCHA
    const renderRecaptcha = () => {
        if (!window.grecaptcha || !recaptchaWrapper.current) return;

        recaptchaWidgetId.current = window.grecaptcha.render(
            recaptchaWrapper.current,
            {
                sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
                callback: (token) => {
                    recaptchaToken.current = token;
                },
            }
        );
    };

    // Charger reCAPTCHA une fois le script disponible
    useEffect(() => {
        const interval = setInterval(() => {
            if (window.grecaptcha && recaptchaWrapper.current) {
                renderRecaptcha();
                clearInterval(interval);
            }
        }, 300);

        return () => {
            if (window.grecaptcha && recaptchaWidgetId.current !== null) {
                window.grecaptcha.reset(recaptchaWidgetId.current);
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!recaptchaToken.current) {
            setError("Veuillez valider le reCAPTCHA.");
            setLoading(false);
            return;
        }

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
                body: JSON.stringify({
                    email,
                    password,
                    "g-recaptcha-response": recaptchaToken.current,
                }),
            });

            const data = await response.json();

            if (!response.ok || data.success === false) {
                setError(data.message || "Erreur de connexion");
                setLoading(false);

                if (window.grecaptcha && recaptchaWidgetId.current !== null) {
                    window.grecaptcha.reset(recaptchaWidgetId.current);
                }

                return;
            }

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

                    {/* 🔥 reCAPTCHA */}
                    <div
                        ref={recaptchaWrapper}
                        className="recaptcha-container"
                        style={{ margin: "15px 0" }}
                    ></div>

                    {error && <p className="login-error">{error}</p>}

                    <button className="login-btn" type="submit" disabled={loading}>
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>
                </form>

                <p className="login-register">
                    Pas de compte ?
                    <span onClick={() => navigate("/register")}> S’inscrire</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
