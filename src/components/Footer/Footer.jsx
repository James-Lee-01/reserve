import styles from './Footer.module.scss'
import human9 from '../../assets/icons/Humaaans9.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons'
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div className={styles.container}>
      {/* <div className={styles.tagWrapper}>
        <div className={styles.tagBlock}>
          <ul>
            <h3>Company</h3>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <ul>
            <h3>Account</h3>
            <li>Login</li>
            <li>Setting</li>
            <li>Admin</li>
          </ul>
          <ul>
            <h3>Feature</h3>
            <li>Browse Cafe</li>
            <li>Book Now</li>
            <li>My Favorites</li>
          </ul>
        </div>
      </div> */}
      <div className={styles.iconContainer}>
        <img src={human9} alt='human' />
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            className={styles.iconFa}
            icon={faSquareInstagram}
            size='xl'
            style={{ color: "#bfd7ea" }}
          />
          <FontAwesomeIcon
            className={styles.iconFa}
            icon={faSquareFacebook}
            size='xl'
            style={{ color: "#bfd7ea" }}
          />
          <FontAwesomeIcon
            className={styles.iconFa}
            icon={faEnvelope}
            size='xl'
            style={{ color: "#bfd7ea" }}
          />
        </div>
        <p className={styles.copyright}>© 2023 RESERVE, Inc.</p>
      </div>
    </div>
  );
}