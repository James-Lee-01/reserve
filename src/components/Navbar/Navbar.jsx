import Swal from 'sweetalert2'
import styles from './Navbar.module.scss'
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../../contexts/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuthContext()

  const handleReserveClick = () => {
    // 導向到 Route path='*'
    navigate("/");
    window.scrollTo(0, 0);

    const homeElement = document.getElementById("home");
    if (homeElement) {
      homeElement.scrollIntoView({behavior: "smooth"})
    }
  };

  const handleLoginClick = () => {
    if (isAuthenticated) {
      logout()
      navigate("/")
    } else {
      // 導向到 LoginPage
      navigate("/login");

      const loginElement = document.getElementById("login");
      if (loginElement) {
        loginElement.scrollIntoView({ behavior: "smooth" });
      }
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

  const handleBrowseAll = () => {
    // 導向BrowseAllPage
    if (isAuthenticated) {
      navigate("/browse/all");
      window.scrollTo(0, 0);

    } else {
      Swal.fire({
        toast: true,
        position: "top-end",
        title: "Please Login first",
        icon: "info",
        timer: 1000,
        showConfirmButton: false,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          //After Swal close
          navigate("/login");

          const loginElement = document.getElementById("login");
          if (loginElement) {
            loginElement.scrollIntoView();
          }
        }
      })
    }
  }

  

  const AccountBtn = () => {
    const handleAccountClick = () => {
      // 導向AccountPage
      navigate("/account");
      window.scrollTo(0, 0);

      const accountElement = document.getElementById("account");
      if (accountElement) {
        accountElement.scrollIntoView({ behavior: "smooth" });
      }
    };
    return (
      <button className={styles.navBtn} onClick={handleAccountClick}>
        Account
      </button>
    );
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
      <button className={styles.navBtn} onClick={handleBrowseAll}>Book Now</button>
      {isAuthenticated && <AccountBtn/>}
      <button className={styles.btn} onClick={handleLoginClick}>
        {isAuthenticated ? "Logout" : "Login"}
      </button>
    </div>
  );
}