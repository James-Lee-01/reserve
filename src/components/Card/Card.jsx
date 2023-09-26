import styles from './Card.module.scss'
import cafe1 from '../../assets/images/cafe1.jpeg'

export default function Card() {
  return (
    <div className={styles.container}>
      <img className={styles.cafeCover} src={cafe1} alt='cafe1' />
      <div className={styles.contentContainer}>
        <h3 className={styles.cafeName}>BRAUN NOTES</h3>
        <div className={styles.cafeCity}>
          <p>Europe</p>
        </div>
        <p className={styles.cafeIntro}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          eveniet voluptatibus ea quod distinctio accusamus alias in rerum
          magnam. Repellendus tenetur architecto a dicta placeat fugit iusto
          similique, quaerat fugiat.
        </p>
      </div>
    </div>
  );
}