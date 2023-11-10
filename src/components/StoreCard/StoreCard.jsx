import styles from "./StoreCard.module.scss";
import cafe1 from "../../assets/images/cafe1.jpeg";
import Button from "../Button/Button"
import { Link } from "react-router-dom";

export default function StoreCard({ id, cover, cafeName, city, intro }) {
  return (
    <div id={id} className={styles.container}>
      <Link to={`/browse/single/cafe/${id}`} className={styles.link}>
        <img
          className={styles.cafeCover}
          src={cover || cafe1}
          alt={`cafe${id}`}
        />
        <div className={styles.contentContainer}>
          <h3 className={styles.cafeName}>{cafeName || "Cafe Name"}</h3>
          <div className={styles.cafeCity}>
            <p>{city || "Europe"}</p>
          </div>
          <p className={styles.cafeIntro}>{intro || "Intro here"}</p>
        </div>
      </Link>
      <div className={styles.btnContainer}>
        <Link to={`/store/reservation/${id}`}>
          <Button text='Reservation' color='primary' iconType='search' />
        </Link>
        <Link to={`/store/edit/${id}`}>
          <Button text='Edit' color='secondary' iconType='edit' />
        </Link>
      </div>
    </div>
  );
}
