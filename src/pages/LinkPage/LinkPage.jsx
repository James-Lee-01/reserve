import styles from './LinkPage.module.scss'

export default function LinkPage() {
  return (
    <div className={styles.container}>
      <div className={styles.containWrapper}>
        <p className={styles.title}>Ready for savory memories?</p>
        <div className={styles.btnWrapper}>
          {/* <button className={styles.btn +' '+ styles.btnRed}>Browse All Cafes</button> */}
          <button className={styles.btn +' '+ styles.btnGreen}>Book Now</button>
        </div>
      </div>
    </div>
  );
}