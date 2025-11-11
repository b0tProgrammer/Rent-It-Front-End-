import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import LogoSvg from "../../../assets/RentItLogo.png";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "Guest";

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <img
          src={LogoSvg} 
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
            if (userName === "Guest") {
              navigate("/login");
            } else {
              navigate("/user");
            }
          }}
        >
          {userName === "Guest" ? "Login" : userName}
        </span>
        
        <span
          className={styles.loginLink}
          onClick={() => {navigate("/")}}
        >
          Home
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