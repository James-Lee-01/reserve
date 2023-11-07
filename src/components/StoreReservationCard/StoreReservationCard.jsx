import styles from "./StoreReservationCard.module.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";


export default function StoreReservationCard({
  id,
  date,
  time,
  name,
  table,
  tel,
  email,
  note,
  onDelete
}) {
  const handleDeleteClick = () => {
    onDelete(id)
  }


  return (
    <div id={id} className={styles.container}>
      <div className={styles.icon} onClick={handleDeleteClick}>
        <HighlightOffIcon />
      </div>
      <div className={styles.contentContainer}>
        <h2 className={styles.reserveDate}>{date || "Date"}</h2>
        <div className={styles.reserveTime}>
          <h3>{time || "Time"}</h3>
        </div>
        <div className={styles.reserveCafe}>
          <h3>Customer Name: </h3>
          <p>{name || "John Doe"}</p>
        </div>
        <div className={styles.reserveInfo}>
          {/* <h3 className={styles.infoBox}>Reservation Info</h3> */}
          <div className={styles.reserveTable}>
            <h4>Table for: </h4>
            <p>{table || "table"}</p>
          </div>

          <div className={styles.reserveTel}>
            <h4>Tel: </h4>
            <p>{tel || "tel"}</p>
          </div>
          <div className={styles.reserveEmail}>
            <h4>Email: </h4>
            <p>{email || "email"}</p>
          </div>
          <div className={styles.reserveNote}>
            <h4>Note:</h4>
            <p>{note || "note here"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
