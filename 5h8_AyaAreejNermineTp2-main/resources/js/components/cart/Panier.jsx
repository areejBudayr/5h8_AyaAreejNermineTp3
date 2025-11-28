import { useContext } from "react";
import { CartContext } from "../../CartContext";
import { useNavigate } from "react-router-dom";
import "./Panier.css";

const Panier = () => {
    const { cart, updateQuantity, updateSize, removeFromCart } =
        useContext(CartContext);

    const navigate = useNavigate(); // ✅ FIX

    const total = cart.reduce((sum, item) => {
        const numericPrice = parseFloat(
            String(item.price).replace("$", "").trim()
        );
        return sum + numericPrice * item.quantity;
    }, 0);

    return (
        <div className="panier-background">
            <div className="panier-page">
                <h1 className="panier-title">Mon Panier</h1>

                {cart.length === 0 && (
                    <p className="empty">Votre panier est vide</p>
                )}

                {cart.map((item, index) => (
                    <div key={index} className="panier-item">
                        {/* IMAGE */}
                        <img src={item.image} alt={item.description} />

                        {/* INFOS */}
                        <div className="panier-info">
                            <h3>{item.description}</h3>
                            <p>Type : {item.type}</p>

                            <div className="panier-controls">
                                {/* Taille */}
                                <select
                                    value={item.size}
                                    onChange={(e) =>
                                        updateSize(index, e.target.value)
                                    }
                                >
                                    <option>S</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                </select>

                                {/* Quantité */}
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        updateQuantity(
                                            index,
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* PRIX + SUPPRIMER */}
                        <div className="panier-right">
                            <p className="panier-price">{item.price}$</p>

                            <button
                                className="remove-btn"
                                onClick={() => removeFromCart(index)}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}

                {/* TOTAL */}
                {cart.length > 0 && (
                    <div className="panier-summary">
                        <div className="summary-row">
                            <span>Sous-total :</span>
                            <span>{total}$</span>
                        </div>

                        <h2 className="summary-total">Total : {total}$</h2>

                        <button className="checkout-btn">Payer</button>
                    </div>
                )}

                {/* RETOUR */}
                <button className="checkout-btn" onClick={() => navigate("/")}>
                    Retour à l'accueil
                </button>
            </div>
        </div>
    );
};

export default Panier;
