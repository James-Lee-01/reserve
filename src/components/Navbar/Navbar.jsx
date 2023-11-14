import Swal from 'sweetalert2'
import styles from './Navbar.module.scss'
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getUser } from '../../api/auth'

export default function Navbar() {
  const navigate = useNavigate();
  const {
    logout,
    isAuthenticated,
    currentUser,
    isUserChange,
    setIsUserChange,
  } = useAuthContext();
  const [showMoreButtons, setShowMoreButtons] = useState(false);
  const [name, setName] = useState("");

  //取目前使用者的id
  const userId = currentUser && currentUser.id;

  //先取得使用者自身資訊
  useEffect(() => {
    const getUserData = async () => {
      try {
        if (userId) {
          const data = await getUser(userId);
          if (data.status === "error") {
            console.log(data.message);
            return;
          }
          //若取得成功，先顯示在畫面上
          if (data) {
            await setName(data.name);
          }
        }
      } catch (error) {
        console.error("[Get Data Failed]", error);
      }
    };

    getUserData();
      
  }, [userId, isUserChange, isAuthenticated]);


  const handleReserveClick = () => {
    // 導向到 Route path='*'
    navigate("/");
    window.scrollTo(0, 0);

    const homeElement = document.getElementById("home");
    if (homeElement) {
      homeElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoginClick = async () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
      window.scrollTo(0, 0);
      setIsUserChange(true);
      Swal.fire({
        toast: true,
        position: "top",
        title: "Logout success",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        // timerProgressBar: true,
      });
    } else {
      // 導向到 LoginPage
      navigate("/login");

      const loginElement = document.getElementById("login");
      if (loginElement) {
        loginElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // const handleAboutClick = () => {
  //   // 導向FeaturePage
  //   navigate("/about");

  //   const aboutElement = document.getElementById("about");
  //   if (aboutElement) {
  //     aboutElement.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

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
      });
    }
  };

  const AccountBtn = () => {
    const handleAccountClick = () => {
      // 導向AccountPage
      navigate("/account");
      // window.scrollTo(0, 0);

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
  };

  //My Favorites Cafe Btn
  const MyFavoriteBtn = () => {
    window.scrollTo(0, 0);
    return (
      <Link to={"/browse/favorite"} className={styles.navBtn}>
        Favorites
      </Link>
    );
  };

  //My Store Btn
  const MyStoreBtn = () => {
    window.scrollTo(0, 0);
    return (
      <Link to={"/store"} className={styles.navBtn}>
        My Store
      </Link>
    );
  };

  /////More Btn
  const handleMoreButtonClick = () => {
    setShowMoreButtons((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    // 當點擊空白區域時，收合更多按鈕
    if (showMoreButtons && e.target.closest(`.${styles.moreButtons}`)) {
      setShowMoreButtons(false);
    }
  };

  useEffect(() => {
    // 監聽點擊事件，用於處理點擊空白區域的情況
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showMoreButtons]);

  return (
    <div className={styles.navbarContainer}>
      <p className={styles.title} onClick={handleReserveClick}>
        RESERVE
      </p>
      {/* <button className={styles.navBtn} onClick={handleAboutClick}>
        About
      </button> */}
      {isAuthenticated && <div className={styles.navText}>Hi {name}!</div>}
      <button className={styles.navBtn} onClick={handleBrowseAll}>
        Book Now
      </button>

      {isAuthenticated && (
        <div>
          <button
            className={styles.navBtn}
            onClick={handleMoreButtonClick}
            // onMouseOver={() => setShowMoreButtons(true)}
          >
            More
          </button>
          {showMoreButtons && (
            <div
              className={`${styles.moreButtons} ${styles.show}`}
              // className={`${styles.moreButtons} ${
              //   showMoreButtons ? styles.show : ""
              // }`}
              onMouseLeave={() => setShowMoreButtons(false)}
            >
              <MyStoreBtn />
              <AccountBtn />
              <MyFavoriteBtn />
            </div>
          )}
        </div>
      )}
      <button className={styles.btn} onClick={handleLoginClick}>
        {isAuthenticated ? "Logout" : "Login"}
      </button>
    </div>
  );
}