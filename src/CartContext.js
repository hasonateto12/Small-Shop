import { createContext, useState } from "react";

// إنشاء Context لمشاركة البيانات بين الصفحات
export const CartContext = createContext();

export function CartProvider({ children }) {
  // cart: السلة | setCart: تحديث السلة
  const [cart, setCart] = useState([]);

  // products: منتجات المتجر (بيانات أولية)
  const [products, setProducts] = useState([
    { id: 1, name: "אגסים", description: "אגסים עסיסיים ומתוקים", price: 12, image: "/images/pears.jpg" },
    { id: 2, name: "תפוחים ירוקים", description: "תפוחים חמצמצים וטריים", price: 10, image: "/images/green-apples.jpg" },
    { id: 3, name: "בננות", description: "בננות מתוקות ומוכנות לאכילה", price: 8, image: "/images/בננות.jpg" },
    { id: 4, name: "ענבים", description: "אשכול ענבים מתוק ועסיסי", price: 14, image: "/images/ענבים.jpg" },
    { id: 5, name: "חומוס מוכן", description: "חומוס טעים מוכן לאכילה", price: 9, image: "/images/hummus.jpg" },
    { id: 6, name: "טחינה", description: "טחינה משומשום איכותי", price: 13, image: "/images/tahini.jpg" },
    { id: 7, name: "מלפפונים", description: "מלפפונים טריים וקרירים", price: 7, image: "/images/cucumbers.jpg" },
    { id: 8, name: "עגבניות שרי", description: "עגבניות שרי עסיסיות ומתוקות", price: 11, image: "/images/cherry-tomatoes.jpg" },
    { id: 9, name: "גזר", description: "גזר פריך ובריא", price: 6, image: "/images/carrots.jpg" },
    { id: 10, name: "פלפלים צבעוניים", description: "תערובת של פלפלים אדומים, צהובים וירוקים", price: 15, image: "/images/bell-peppers.jpg" },
    { id: 11, name: "סלמון קפוא", description: "פילה סלמון טרי קפוא", price: 35, image: "/images/salmon.jpg" },
    { id: 12, name: "חזה עוף", description: "חזה עוף טרי ללא עור", price: 30, image: "/images/chicken-breast.jpg" },
    { id: 13, name: "בקר טחון", description: "בשר בקר טחון איכותי", price: 40, image: "/images/beef-mince.jpg" },
    { id: 14, name: "פילה דג לבן", description: "פילה דג לבן טרי", price: 28, image: "/images/white-fish.jpg" },
    { id: 15, name: "סלט ירקות", description: "סלט מוכן עם ירקות חתוכים", price: 12, image: "/images/vegetable-salad.jpg" },
    { id: 16, name: "לחמניות מלאות", description: "לחמניות טריות מחיטה מלאה", price: 8, image: "/images/whole-grain-rolls.jpg" },
    { id: 17, name: "קינואה", description: "חבילת קינואה אורגנית 500 גרם", price: 20, image: "/images/quinoa.jpg" },
    { id: 18, name: "אורז בסמטי", description: "חבילת אורז בסמטי 1 ק\"ג", price: 15, image: "/images/basmati-rice.jpg" },
    { id: 19, name: "חלב שקדים", description: "חלב שקדים טבעי 1 ליטר", price: 18, image: "/images/almond-milk.jpg" },
    { id: 20, name: "יוגורט פרוביוטי", description: "יוגורט עם חיידקים פרוביוטיים", price: 12, image: "/images/yogurt.jpg" },
    { id: 21, name: "מוזלי", description: "תערובת מוזלי עם פירות ואגוזים", price: 16, image: "/images/muesli.jpg" },
    { id: 22, name: "אגוזי מלך", description: "אגוזי מלך טבעיים ואיכותיים", price: 25, image: "/images/walnuts.jpg" },
    { id: 23, name: "תמרים", description: "תמרים מתוקים ואורגניים", price: 20, image: "/images/dates.jpg" },
    { id: 24, name: "שיבולת שועל", description: "שיבולת שועל מלאה לארוחת בוקר", price: 14, image: "/images/oats.jpg" }
  ]);

  // orders: مكان جاهز لتخزين الطلبات (اختياري لاحقاً)
  const [orders, setOrders] = useState([]);

  // تحديث المنتجات بقائمة جديدة
  const updateProducts = (updatedProducts) => {
    setProducts([...updatedProducts]); // نسخة جديدة لضمان رندر
  };

  // إضافة منتج جديد
  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  // Provider يوزع البيانات على كل التطبيق
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        products,
        setProducts,
        addProduct,
        orders,
        setOrders,
        updateProducts,
      }}
    >
      {children} {/* كل التطبيق داخل CartProvider */}
    </CartContext.Provider>
  );
}
