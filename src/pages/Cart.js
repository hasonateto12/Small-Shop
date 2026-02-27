import { useContext } from "react";
import { CartContext } from "../CartContext"; // cart و setCart
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  // حذف أول عنصر يطابق نفس id (مفيد لو المنتج مكرر)
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const indexToRemove = prevCart.findIndex((item) => item.id === productId);
      if (indexToRemove !== -1) {
        const updatedCart = [...prevCart]; // نسخة
        updatedCart.splice(indexToRemove, 1); // حذف عنصر واحد
        return updatedCart;
      }
      return prevCart;
    });
  };

  return (
    <div className="cart-container">
      <ul className="cart-list">
        {/* عرض عناصر السلة */}
        {cart.map((item, index) => (
          <li key={index} className="cart-item">
            <div className="cart-item-details">
              <span className="cart-item-name">{item.name}</span>
              <span className="cart-item-price"> ₪{item.price}</span>
              <br />
              <span className="cart-item-Description">{item.description}</span>
            </div>

            {/* زر إزالة */}
            <button className="remove-button" onClick={() => removeFromCart(item.id)}>
              הסרה
            </button>
          </li>
        ))}
      </ul>

      {/* حساب المجموع باستخدام reduce */}
      <h3 className="cart-total">
        הסכום: ₪{cart.reduce((total, item) => total + item.price, 0)}
      </h3>

      {/* الانتقال لصفحة checkout */}
      <button className="checkout-button" onClick={() => navigate("/checkout")}>
        הרשמה
      </button>
    </div>
  );
}

export default Cart;
