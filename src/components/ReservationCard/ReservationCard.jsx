import styles from "./ReservationCard.module.scss";


export default function Card(key) {
  return (
    <div key={key} className={styles.container}>
      <div className={styles.contentContainer}>
        <h2 className={styles.reserveDate}>Date</h2>
        <div className={styles.reserveTime}>
          <h3>Time</h3>
        </div>
        <div className={styles.reserveCafe}>
          <h3>Cafe Name: </h3>
          <p>
            BRUN CAFE
          </p>
        </div>
        <div className={styles.reserveInfo}>
          {/* <h3 className={styles.infoBox}>Reservation Info</h3> */}
          <div className={styles.reserveTable}>
            <h4>Table for: </h4>
            <p>3</p>
          </div>

          <div className={styles.reserveTel}>
            <h4>Tel: </h4>
            <p>0123456789</p>
          </div>
          <div className={styles.reserveNote}>
            <h4>Note:</h4>
            <p>
              Vegetarian
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
