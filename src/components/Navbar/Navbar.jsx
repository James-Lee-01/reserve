import styles from './Navbar.module.scss'
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // 導向到 LoginPage
    navigate("/login");
    
    const loginElement = document.getElementById("login");
    if (loginElement) {
      loginElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.navbarContainer}>
      <p className={styles.title}>RESERVE</p>
      <button className={styles.navBtn}>About</button>
      <button className={styles.navBtn}>All Cafe</button>
      <button className={styles.navBtn}>Book Now</button>
      <button className={styles.btn} onClick={handleLoginClick}>
        Login
      </button>
    </div>
  );
}