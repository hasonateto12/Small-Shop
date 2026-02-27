import { useContext, useState } from "react";
import { CartContext } from "../CartContext"; // المنتجات موجودة في الـ Context
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

function Admin() {
  // products: قائمة المنتجات | setProducts: تحديثها | addProduct: إضافة منتج
  const { products, setProducts, addProduct } = useContext(CartContext);

  // اختيار وضع الصفحة: إضافة أو تعديل
  const [selectedOption, setSelectedOption] = useState("add");

  // productId: رقم المنتج للبحث
  const [productId, setProductId] = useState("");

  // productData: بيانات المنتج بعد البحث (للتعديل)
  const [productData, setProductData] = useState(null);

  const navigate = useNavigate();

  // إضافة منتج جديد
  const handleAddProduct = async (event) => {
    event.preventDefault(); // منع reload

    const formData = new FormData(event.target); // قراءة فورم الإضافة
    const newProduct = Object.fromEntries(formData.entries()); // تحويل إلى Object

    // تحويل قيم رقمية
    newProduct.id = Number(newProduct.id);
    newProduct.price = Number(newProduct.price);

    // منع تكرار ID
    const existingProduct = products.find((p) => p.id === newProduct.id);
    if (existingProduct) {
      alert(`Product with ID ${newProduct.id} already exists!`);
      event.target.reset();
      return;
    }

    addProduct(newProduct); // إضافة المنتج
    event.target.reset();   // تفريغ الفورم
    navigate("/");          // رجوع للصفحة الرئيسية
  };

  // البحث عن منتج بالـ ID
  const handleSearch = () => {
    const id = Number(productId);
    const product = products.find((p) => p.id === id);

    if (product) {
      setProductData(null);
      // setTimeout(0) لضمان إعادة رندر ثم تعبئة الفورم بقيم جديدة
      setTimeout(() => setProductData({ ...product }), 0);
    } else {
      setProductData(null);
    }
  };

  // تحديث المنتج بعد التعديل
  const handleUpdateProduct = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedProduct = Object.fromEntries(formData.entries());

    // تثبيت ID + تحويل السعر
    updatedProduct.id = Number(productData.id);
    updatedProduct.price = Number(updatedProduct.price);

    // استبدال المنتج القديم بالجديد
    const updatedProducts = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );

    setProducts(updatedProducts); // تحديث القائمة
    setProductData(null);
    setProductId("");

    navigate("/"); // ✅ الأفضل يكون هنا بعد نجاح التحديث
  };

  return (
    <div className="admin-container">
      <div className="admin-content">

        {/* وضع الإضافة */}
        {selectedOption === "add" && (
          <div className="admin-form-container">
            <form onSubmit={handleAddProduct} className="admin-form">
              <label>תעודת זהות</label>
              <input type="text" name="id" required />

              <label>שם:</label>
              <input type="text" name="name" required />

              <label>מחיר:</label>
              <input type="text" name="price" required />

              <label>תיאור:</label>
              <input type="text" name="description" required />

              <label>קישור תמונה:</label>
              <input type="text" name="image" required />

              <button type="submit"> הוספה </button>
            </form>
          </div>
        )}

        {/* وضع التعديل */}
        {selectedOption === "edit" && (
          <div className="admin-form-container">
            <h2>עריכת מוצר</h2>

            <div className="edit-button-container">
              <input
                type="text"
                placeholder="הכניס תעודת זהות"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="search-input"
              />
              <button onClick={handleSearch}>חיפוש</button>
            </div>

            {/* إذا وجدنا المنتج نعرض فورم التعديل */}
            {productData && (
              <form onSubmit={handleUpdateProduct} className="admin-form">
                <label>תעודת זהות:</label>
                <input type="text" name="id" value={productData.id} readOnly />

                <label>שם:</label>
                <input type="text" name="name" defaultValue={productData.name} required />

                <label>מחיר:</label>
                <input type="text" name="price" defaultValue={productData.price} required />

                <label>תיאור:</label>
                <input type="text" name="description" defaultValue={productData.description} required />

                <label>קישור תמונה:</label>
                <input type="text" name="image" defaultValue={productData.image} required />

                <button type="submit">עדכון</button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* شريط جانبي لاختيار الإضافة/التعديل */}
      <div className="admin-sidebar">
        <button onClick={() => setSelectedOption("add")}>הוספת מוצר</button>
        <button className="edit-button" onClick={() => setSelectedOption("edit")}>
          <span>עריכת מוצר</span>
        </button>
      </div>
    </div>
  );
}

export default Admin;
