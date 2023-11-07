import styles from './StorePage.module.scss'
import Navbar from "../../components/Navbar/Navbar";
import StoreCard from "../../components/StoreCard/StoreCard";
import Pagination from "../../components/Pagination/Pagination";
import AddCafe from '../../components/AddCafe/AddCafe';
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { getOwnCafes } from "../../api/cafe";


//畫面安排：先店家卡片(卡片下方按鈕連結到編輯店家or訂單頁)，底層再新增店家

export default function StorePage() {
  const [cardSlot, setCardSlot] = useState([]);
  const [notFound, setNotFound] = useState(false);

  //render all cafes
  useEffect(() => {
    const generateMyCafes = async () => {
      try {
        const cardData = await getOwnCafes();
        if (cardData.length > 0) {
          setCardSlot(cardData);
        } else {
          console.log("No result");
          setNotFound(true);
        }
      } catch (error) {
        console.log(`[Get my cafes failed]`, error);
      }
    };

    generateMyCafes();
  }, []);

  const cards = cardSlot.map((cardData) => (
      <StoreCard
        key={cardData.id}
        id={cardData.id}
        cover={cardData.cover}
        cafeName={cardData.name}
        city={cardData.city}
        intro={cardData.intro}
      />
  ));

  //Pagination count
  const itemPerPage = 6;
  const totalPages = Math.ceil(cards.length / itemPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    //Signature:function(event: React.ChangeEvent, page: number) => void
    // event The event source of the callback.
    // page The page selected.
    setCurrentPage(value);
  };

  //separate cards (range)
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = Math.min(startIndex + itemPerPage, cards.length);

  //range render on screen
  const currentPageCards = cards.slice(startIndex, endIndex);

  ////Not Found notification
  function NotFoundComponent() {
    return (
      <div>
        <h2>Not Found</h2>
        <p>Sorry, no results were found.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.cardWrapperTitle}>Your Cafe</h1>
        <div className={styles.cardWrapper}>
          {notFound ? <NotFoundComponent /> : currentPageCards}
          {<StoreCard />}
        </div>
      </div>
      <div className={styles.navigator}>
        {!notFound && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        )}
      </div>
      <AddCafe/>
      <Footer />
    </>
  );
}