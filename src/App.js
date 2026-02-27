import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout, { action as checkoutAction } from "./pages/Checkout";
import Admin from "./pages/Admin";
import { CartProvider } from "./CartContext";

// Layout ثابت: Navbar + مكان للصفحة الحالية
function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* هنا تظهر صفحات Home/Cart/Checkout/Admin */}
    </>
  );
}

// تعريف المسارات
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout />, action: checkoutAction }, // ربط action
      { path: "/admin", element: <Admin /> },
    ],
  },
]);

function App() {
  return (
    // تغليف التطبيق بـ CartProvider لتكون السلة والمنتجات متاحة للجميع
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
