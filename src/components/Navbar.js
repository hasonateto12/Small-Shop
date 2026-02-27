import { Link } from "react-router-dom"; // للتنقل بين الصفحات بدون إعادة تحميل

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        {/* رابط الصفحة الرئيسية */}
        <Link to="/" style={styles.link}>חנות</Link>
      </div>

      <div style={styles.center}>
        {/* رابط صفحة السلة */}
        <Link to="/cart" style={styles.link}>הסל שלי</Link>
      </div>

      <div style={styles.right}>
        {/* رابط صفحة الأدمن */}
        <Link to="/admin" style={styles.link}>מנהל דף</Link>
      </div>
    </nav>
  );
}

// ستايل سريع داخل الملف (Inline styles)
const styles = {
  navbar: {
    display: "flex",                 // ترتيب العناصر بجانب بعض
    justifyContent: "space-between", // توزيع يمين/وسط/يسار
    padding: "10px 20px",
    backgroundColor: "#3498db",
  },
  left: { fontSize: "20px", color: "white" },
  center: { flex: 1, textAlign: "center" },
  right: { display: "flex", gap: "15px" },
  link: { color: "black", textDecoration: "none", fontSize: "18px" }
};

export default Navbar; // تصدير الكومبوننت
