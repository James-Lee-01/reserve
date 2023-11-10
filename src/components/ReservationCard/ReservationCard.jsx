import styles from "./ReservationCard.module.scss";

const formatTime = (timeslot) => {
  // 將 "1000" 轉換為 "10:00"
  const hours = timeslot.substring(0, 2);
  const minutes = timeslot.substring(2);
  return `${hours}:${minutes}`;
};


export default function ReservationCard({ reservation }) {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h2 className={styles.reserveDate}>{reservation.date}</h2>
        <div className={styles.reserveTime}>
          <h3>{formatTime(reservation.timeslot)}</h3>
        </div>
        <div className={styles.reserveCafe}>
          <h3>Cafe Name: </h3>
          <p>{reservation.cafe}</p>
        </div>
        <div className={styles.reserveInfo}>
          {/* <h3 className={styles.infoBox}>Reservation Info</h3> */}
          <div className={styles.reserveTable}>
            <h4>Table for: </h4>
            <p>{reservation.seat}</p>
          </div>

          <div className={styles.reserveTel}>
            <h4>Tel: </h4>
            <p>{reservation.tel}</p>
          </div>
          <div className={styles.reserveNote}>
            <h4>Note:</h4>
            <p>{reservation.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
