import styles from "./SingleCafePage.module.scss"
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Carousel from "../../components/Carousel/Carousel";
import Booking from "../../components/Booking/Booking";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button"
import cafe1 from "../../assets/images/cafe1.jpeg"

import { getCafe } from "../../api/cafe";
import { postFavorite, deleteFavorite } from "../../api/cafe";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";


// （照片、店名、地區標籤、地圖資訊、地址、電話、詳細介紹、菜單照片）
// （加入收藏、移除收藏）
// （該餐廳可訂位日期、時段、人數）
export default function SingleCafePage() {
  const { id } = useParams()
  const carouselRef = useRef(null)
  const bookingRef = useRef(null);
  const [showFavoriteIcon, setShowFavoriteIcon] = useState(false)
  const [cafeData, setCafeData] = useState("")

  const handleClickMenu = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleClickBooking = () => {
    if (bookingRef.current) {
      bookingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFavorite = () => {
    setShowFavoriteIcon("loading")

    if (showFavoriteIcon) {
      deleteFavorite(cafeData.id)
      .then(() => {
        setShowFavoriteIcon(false)
      })
      .catch((error) => {
        console.error('Failed to remove favorite icon: ', error)
        setShowFavoriteIcon(true)
      });
    } else {
      postFavorite(cafeData.id)
      .then(() => {
        setShowFavoriteIcon(true)
      })
      .catch((error) => {
        console.error('Failed to add favorite icon: ', error)
        setShowFavoriteIcon(false)
      })
    }
  }

  const navigate = useNavigate();
  const { isAuthenticated, role, identified } = useAuthContext();
  //prohibited and redirection
  useEffect(() => {
    if (identified) {
      if (role === "admin") {
        if (!isAuthenticated) {
          navigate("/login");
        } else {
          navigate("/admin");
        }
      } else if (!isAuthenticated) {
        navigate("/login");
      }
    }
  }, [isAuthenticated, role, navigate, identified]);

  ////render the cafe
  useEffect(() => {
    const getCafeData = async () => {
      try {
        const data = await getCafe(id);
        // console.log(id)
        if (data.status === "success") {
          setCafeData(data);
          setShowFavoriteIcon(data.isFavorited);
        }
      } catch (error) {
        console.log(`[Get cafe data failed]`, error);
      }
    };

    getCafeData();
  }, [id]);

  const { menu1, menu2, menu3, menu4, menu5 } = cafeData

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.cafeCover}>
          <img src={cafeData.cover || cafe1} alt='cafeCover' />
        </div>
        <div className={styles.cafeContent}>
          <div className={styles.cafeTitle}>{cafeData.name || "Cafe Name"}</div>
          <div className={styles.cafeLocation}>{cafeData.city || "City"}</div>
          <div className={styles.cafeAddress}>
            <p>Address:</p>
            <p>{cafeData.address || "cafe address"}</p>
          </div>
          <div className={styles.cafePhone}>
            <p>Phone:</p>
            <p>{cafeData.tel || "cafe telephone number"}</p>
          </div>
          <div className={styles.cafeDescription}>
            About:
            <p>{cafeData.description || "cafe description"}</p>
          </div>
          <div className={styles.btnGroup}>
            <Button
              text='Favorite'
              color='primary'
              onClick={handleFavorite}
              iconType={
                showFavoriteIcon === "loading" 
                ? "loading" 
                : showFavoriteIcon 
                ? "favorite" 
                : "unFavorite"
              }
            />
            <Button text='Menu' color='primary' onClick={handleClickMenu} />
            <Button
              text='Book Now'
              color='secondary'
              onClick={handleClickBooking}
            />
          </div>
        </div>
      </div>
      <Carousel ref={carouselRef} images={[menu1, menu2, menu3, menu4, menu5]} />
      <Booking ref={bookingRef} />
      <Footer />
    </>
  );
}
