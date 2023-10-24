import styles from './HomePage.module.scss'
import Human1 from '../../assets/icons/Humaaans-1.png'
import Human2 from '../../assets/icons/Humaaans-yellow.png'

export default function HomePage() {

  return (
    <div id="home" className={styles.homeContainer}>
      <div className={styles.homeWrapper}>
        <p className={styles.homeTitle}>RESERVE</p>
        <div className={styles.iconWrapper}>
          <img src={Human1} alt='human1' />
          <img src={Human2} alt='human2' />
        </div>
      </div>
    </div>
  );
}
