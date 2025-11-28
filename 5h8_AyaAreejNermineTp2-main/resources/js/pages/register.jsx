import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import fond from "../assets/fond2.png";
import "./register.css";

const Register = () => {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        console.log("NOUVEL UTILISATEUR :", {
            prenom,
            nom,
            email,
            username,
            password,
        });

        alert("Compte créé !");
        navigate("/login");
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
            {/* Overlay */}
            <div className="login-overlay"></div>

            {/* Carte */}
            <div className="login-box glass">
                <h2 className="login-title">Inscription</h2>

                {/* FORMULAIRE */}
                <form
                    onSubmit={handleRegister}
                    className="login-form grid-form"
                >
                    {/* Prénom + Nom */}
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

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Adresse email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Username + Password */}
                    <div className="two-cols">
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="login-btn" type="submit">
                        S’inscrire
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
