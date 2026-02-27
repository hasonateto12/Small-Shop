import { useContext } from "react";
import { CartContext } from "../CartContext"; // المنتجات من Context
import ProductPage from "../components/ProductPage";
import "../styles/Home.css";

function Home() {
  // جلب المنتجات من Context
  const { products } = useContext(CartContext);

  return (
    <div className="home-container">
      <div className="product-scroll-container">
        {/* إرسال المنتجات إلى ProductPage */}
        <ProductPage products={products} />
      </div>
    </div>
  );
}

export default Home;
