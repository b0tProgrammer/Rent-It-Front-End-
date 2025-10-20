import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userName = decodedToken ? decodedToken.sub : "null";

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <img
          src="/logo192.png" // Replace with your RentIt logo path
          alt="RentIt Logo"
          className={styles.logo}
          onClick={() => navigate("/")}
        />
        <h1 className={styles.brandName}>RentIt</h1>
      </div>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search for products..."
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>Search</button>
      </div>

      <div className={styles.navActions}>
        <span
          className={styles.loginLink}
          onClick={() => {
            if (userName === "null") {
              navigate("/login");
            } else {
              navigate("/user");
            }
          }}
        >
          {userName === "null" ? "Login" : userName}
        </span>

        <button
          className={styles.giveRentButton}
          onClick={() => navigate("/GiveRent")}
        >
          Give Rent
        </button>
      </div>
    </header>
  );
}

export default Header;