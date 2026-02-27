import { useContext, useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import "../styles/Checkout.css";

// ✅ action تُشغّل عند submit لـ <Form method="post">
export async function action({ request }) {
  const formData = await request.formData(); // قراءة بيانات الفورم
  const data = Object.fromEntries(formData); // تحويلها إلى Object
  return {
    address: data.address,
    idNumber: data.idNumber,
  };
}

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const orderData = useActionData(); // بيانات action بعد submit
  const navigate = useNavigate();

  // حساب المجموع
  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  // بعد نجاح submit: نفرغ السلة ونرجع للـ Home
  useEffect(() => {
    if (orderData && cart.length > 0) {
      // هنا يمكنك لاحقاً حفظ الطلب في Context/LocalStorage/Backend
      setCart([]);      // تفريغ السلة بعد الطلب
      navigate("/");    // رجوع للرئيسية
    }
  }, [orderData, cart, setCart, navigate]);

  return (
    <div className="checkout-container">
      <h1>הרשמה</h1>

      {/* ملخص السلة */}
      <div className="cart-summary">
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ₪{item.price} <br />
              {item.description}
            </li>
          ))}
        </ul>
        <h3 className="checkout-total"> הסכום: ₪{totalAmount}</h3>
      </div>

      {/* فورم مرتبط بالـ action عبر method="post" */}
      <Form method="post" className="checkout-form">
        <h2>פרטי רישום</h2>

        <label>כתובת:</label>
        <input type="text" name="address" required />

        <label>תעודת זהות:</label>
        <input type="text" name="idNumber" required />

        <button type="submit">קנייה</button>
      </Form>
    </div>
  );
}

export default Checkout;
