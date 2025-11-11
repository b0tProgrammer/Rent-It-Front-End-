import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaArrowUp } from "react-icons/fa";
import LogoSvg from "../../../assets/RentItLogo.png";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          {/* inline svg or image */}
          <img src={LogoSvg} alt="rentIt logo" className={styles.logo} />
          <div>
            <h3 className={styles.brandTitle}>rentIt</h3>
            <p className={styles.tagline}>Smartly rent. Easily earn.</p>
          </div>
        </div>

        <div className={styles.linksGrid}>
          <div className={styles.col}>
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Support</h4>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/terms">Terms</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Contact</h4>
            <ul>
              <li>rentit HQ</li>
              <li>123 College Rd, City</li>
              <li>support@rentit.example</li>
              <li>+91 90000 00000</li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Get the app</h4>
            <p className={styles.small}>Available on iOS & Android — coming soon.</p>
            <div className={styles.social}>
              <a href="#" aria-label="facebook"><FaFacebookF /></a>
              <a href="#" aria-label="instagram"><FaInstagram /></a>
              <a href="#" aria-label="twitter"><FaTwitter /></a>
              <a href="#" aria-label="linkedin"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p>© {new Date().getFullYear()} rentIt • All rights reserved.</p>
          <div className={styles.actions}>
            <button onClick={scrollToTop} className={styles.topBtn} aria-label="Back to top">
              <FaArrowUp />
            </button>
            <div className={styles.locale}>India • INR</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
