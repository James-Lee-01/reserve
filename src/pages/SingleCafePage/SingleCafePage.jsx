import styles from "./SingleCafePage.module.scss"
import { useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";
import Button from "../../components/Button/Button"
import cafe1 from "../../assets/images/cafe1.jpeg"


// （照片、店名、地區標籤、地圖資訊、地址、電話、詳細介紹、菜單照片）
// （加入收藏）
// （移除收藏）
// （該餐廳可訂位日期、時段、人數）
export default function SingleCafePage() {
  const carouselRef = useRef(null)
  const [showFavoriteIcon, setShowFavoriteIcon] = useState(false)

  const handleClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: "smooth",});
    }
  }
  const handleFavorite = () => {
    setShowFavoriteIcon(!showFavoriteIcon)
  }

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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
              quam in maxime laborum fugit quisquam magnam doloribus, error
              labore iste. Hic explicabo minus iste modi reiciendis dolore
              cupiditate deleniti optio!
            </p>
          </div>
          <div className={styles.btnGroup}>
            <Button
              text='Favorite'
              color='primary'
              onClick={handleFavorite}
              iconType={showFavoriteIcon ? "favorite" : "unFavorite"}
            />
            <Button text='Menu' color='primary' onClick={handleClick} />
            <Button text='Book Now' color='secondary' />
          </div>
        </div>
      </div>
      <Carousel ref={carouselRef} />
      <Footer />
    </>
  );
}
