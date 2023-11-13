import styles from "./AdminStoreCard.module.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import cafe1 from "../../assets/images/cafe1.jpeg";

export default function AdminStoreCard({ id, cover, cafeName, city, user, intro, onDelete }) {


  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <div id={id} className={styles.container}>
      <img
        className={styles.cafeCover}
        src={cover || cafe1}
        alt={`cafe${id}`}
      />
      <div className={styles.contentContainer}>
        <div className={styles.icon} onClick={handleDeleteClick}>
          <HighlightOffIcon />
        </div>
        <h3 className={styles.cafeName}>{cafeName || "Cafe Name"}</h3>
        <div className={styles.cafeCity}>
          <p>{city || "Europe"}</p>
        </div>

        <div className={styles.cafeOwner}>
          <h4>Owner:</h4>
          <p>{user || "Owner here"}</p>
        </div>
        <p className={styles.cafeIntro}>{intro || "Intro here"}</p>
      </div>
    </div>
  );
}
