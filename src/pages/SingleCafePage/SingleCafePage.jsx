import styles from "./SingleCafePage.module.scss"
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import cafe1 from "../../assets/images/cafe1.jpeg"


// （照片、店名、地區標籤、地圖資訊、地址、電話、詳細介紹、菜單照片）
// （加入收藏）
// （移除收藏）
// （該餐廳可訂位日期、時段、人數）
export default function BrowsePage() {

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.cafeCover}>
          <img src={cafe1} alt='cafeCover' />
        </div>
        <div className={styles.cafeContent}>
          <div className={styles.cafeTitle}>BRAUN NOTES</div>
          <div className={styles.cafeLocation}>Europe</div>
          <div className={styles.cafeAddress}>
            <p>Address:</p>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
          <div className={styles.cafePhone}>
            <p>Phone:</p>
            <p>01-23456789</p>
          </div>
          <div className={styles.cafeDescription}>
            About:
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat quam in maxime laborum fugit quisquam magnam doloribus, error labore iste. Hic explicabo minus iste modi reiciendis dolore cupiditate deleniti optio!</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
