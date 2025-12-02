import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import fond from "../assets/fond2.png";
import "./register.css";

const getCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : "";
};

// 🔑 on lit la clé dans la meta du Blade
const getRecaptchaSiteKey = () => {
    const meta = document.querySelector('meta[name="recaptcha-site-key"]');
    return meta ? meta.getAttribute("content") : "";
};

const Register = () => {
    // ... tes useState habituels

    const [recaptchaToken, setRecaptchaToken] = useState("");
    const recaptchaRef = useRef(null);
    const recaptchaWidgetId = useRef(null);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const siteKey = getRecaptchaSiteKey();
    console.log("RECAPTCHA SITEKEY =", siteKey); // pour vérifier

    useEffect(() => {
        const interval = setInterval(() => {
            if (
                window.grecaptcha &&
                recaptchaRef.current &&
                recaptchaWidgetId.current === null
            ) {
                clearInterval(interval);

                recaptchaWidgetId.current = window.grecaptcha.render(
                    recaptchaRef.current,
                    {
                        sitekey: siteKey,
                        callback: (token) => setRecaptchaToken(token),
                    }
                );
            }
        }, 300);

        return () => clearInterval(interval);
    }, [siteKey]);

    // ... le reste de ton handleRegister + JSX, avec:
    // <div ref={recaptchaRef} style={{ margin: "1rem 0", display:"flex", justifyContent:"center" }}></div>
};

export default Register;
