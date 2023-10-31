import styles from './FeaturePage.module.scss'
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function FeaturePage() {
  const location = useLocation();
  // 滾動到 FeaturePage 元件
  const aboutRef = useRef(null);

  useEffect(() => {
    if (location.pathname === "/about" && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <div id='about' ref={aboutRef} className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.textWrapper}>
          <p className={styles.title}>
            Unwind with a Book, Reserve Your Cafe Nook!
          </p>
          <p className={styles.info}>
            Explore diverse coffee shops from various regions, and book your
            coffee outings for any time in the next week.
          </p>
          <p className={styles.info}>
            Discover, reserve, and enjoy unique coffee experiences with us. Join
            today and start your coffee journey."
          </p>
        </div>
      </div>
    </div>
  );
}