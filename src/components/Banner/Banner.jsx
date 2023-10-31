import styles from './Banner.module.scss'
import human3 from '../../assets/icons/Humaaans3.png'
import human4 from '../../assets/icons/Humaaans4.png'
import human5 from '../../assets/icons/Humaaans5.png'
import human6 from '../../assets/icons/Humaaans6.png'
import human7 from '../../assets/icons/Humaaans7.png'
import human8 from '../../assets/icons/Humaaans8.png'

export default function Banner() {
  const humans = [
    { id: "human3", src: human3, alt: "human3" },
    { id: "human4", src: human4, alt: "human4" },
    { id: "human5", src: human5, alt: "human5" },
    { id: "human6", src: human6, alt: "human6" },
    { id: "human7", src: human7, alt: "human7" },
    { id: "human8", src: human8, alt: "human8" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.imgWrapper}>
        {humans.map((human) => (
          <img
            key={human.id}
            className={styles.imgHuman}
            src={human.src}
            alt={human.alt}
          />
        ))}
      </div>
    </div>
  );
}