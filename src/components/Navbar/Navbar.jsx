import styles from './Navbar.module.scss'

export default function Navbar() {
  return (
    <div className={styles.navbarContainer}>
      <p className={styles.title}>RESERVE</p>
      <button className={styles.navBtn}>About</button>
      <button className={styles.navBtn}>All Cafe</button>
      <button className={styles.navBtn}>Book Now</button>
      <button className={styles.btn}>Login</button>
    </div>
  )
}