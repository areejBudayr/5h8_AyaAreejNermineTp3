import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
    navigate("/");
  };

  return (
    <div className="login-page">

      {/* Overlay pastel */}
      <div className="login-overlay"></div>

      {/* Carte Login */}
      <div className="login-box glass">
        <h2 className="login-title">Connexion</h2>

        <form onSubmit={handleLogin} className="login-form">
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

          <button className="login-btn" type="submit">
            Se connecter
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
