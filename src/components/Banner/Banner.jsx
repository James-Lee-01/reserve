import styles from './Banner.module.scss'
import human3 from '../../assets/icons/Humaaans3.png'
import human4 from '../../assets/icons/Humaaans4.png'
import human5 from '../../assets/icons/Humaaans5.png'
import human6 from '../../assets/icons/Humaaans6.png'
import human7 from '../../assets/icons/Humaaans7.png'
import human8 from '../../assets/icons/Humaaans8.png'

export default function Banner() {
  const humans = [human3, human4, human5, human6, human7, human8]


  return (
    <div className={styles.container}>
      <div className={styles.imgWrapper}>
        {humans.map((human) => (
          <img className={styles.imgHuman} src={human} alt={human} />
        ))}
      </div>
    </div>
  )
}