import styles from './Navbar.module.scss'
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    // 導向到 Route path='*'
    navigate("/");

    const homeElement = document.getElementById("home");
    if (homeElement) {
      homeElement.scrollIntoView({behavior: "smooth"})
    }
  };

  const handleLoginClick = () => {
    // 導向到 LoginPage
    navigate("/login");

    const loginElement = document.getElementById("login");
    if (loginElement) {
      loginElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAboutClick = () => {
    // 導向FeaturePage
    navigate("/about");

    const aboutElement = document.getElementById("about");
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className={styles.navbarContainer}>
      <p className={styles.title} onClick={handleReserveClick}>
        RESERVE
      </p>
      <button className={styles.navBtn} onClick={handleAboutClick}>
        About
      </button>
      {/* <button className={styles.navBtn}>All Cafe</button> */}
      <button className={styles.navBtn}>Book Now</button>
      <button className={styles.btn} onClick={handleLoginClick}>
        Login
      </button>
    </div>
  );
}