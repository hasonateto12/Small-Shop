import { useContext } from "react";
import { CartContext } from "../CartContext"; // الوصول للسلة من الـ Context
import "../styles/ProductPage.css";

function ProductPage({ products }) {
  // cart: عناصر السلة - setCart: لتحديث السلة
  const { cart = [], setCart } = useContext(CartContext);

  // إضافة منتج للسلة (كل ضغطة تضيف نسخة جديدة)
  const addToCart = (product) => {
    setCart([...cart, product]); // نعمل نسخة جديدة من cart + المنتج الجديد
  };

  return (
    <div className="product-container">
      {/* عرض كل المنتجات */}
      {products.map((product) => (
        <div key={product.id} className="product-box">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">₪{product.price}</p>

          {/* زر يضيف المنتج للسلة */}
          <button onClick={() => addToCart(product)} className="add-to-cart">
            הוספה לסל
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductPage;
