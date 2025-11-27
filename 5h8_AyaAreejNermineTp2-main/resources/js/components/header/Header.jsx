import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header>
            <h1>NAAR</h1>
            <nav>
                <ul>
                    {!isLoggedIn ? (
                        location.pathname === "/login" ? (
                            <li>
                                <button onClick={() => navigate("/")}>
                                    Accueil
                                </button>
                            </li>
                        ) : (
                            <li>
                                <button onClick={() => navigate("/login")}>
                                    Connexion
                                </button>
                            </li>
                        )
                    ) : (
                        <li>
                            <button onClick={logout}>Déconnexion</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
