import styles from './BrowsePage.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import BrowseBar from '../../components/BrowseBar/BrowseBar'
import Card from '../../components/Card/Card'
import Pagination from '../../components/Pagination/Pagination'
import Footer from '../../components/Footer/Footer'
// import SearchBar from '../../components/SearchBar/SearchBar'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllCafes, postSearch } from "../../api/cafe";

export default function BrowsePage() {
  const [cardSlot, setCardSlot] = useState([]);
  const [notFound, setNotFound] = useState(false);

  //render all cafes
  useEffect(() => {
    const generateAllCafes = async () => {
      try {
        const cardData = await getAllCafes();
        if (cardData.length > 0) {
          setCardSlot(cardData);
        } else {
          console.log("No result");
          setNotFound(true);
        }
      } catch (error) {
        console.log(`[Get cards failed]`, error);
      }
    };

    generateAllCafes();
  }, []);

  const cards = cardSlot.map((cardData) => (
    <Link
      to={`/browse/single/cafe/${cardData.id}`}
      key={cardData.id}
      className={styles.link}
    >
      <Card
        key={cardData.id}
        id={cardData.id}
        cover={cardData.cover}
        cafeName={cardData.name}
        city={cardData.city}
        intro={cardData.intro}
      />
    </Link>
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

  // 新增處理搜尋的函數
  const handleSearch = async (searchCriteria) => {
    try {
      const searchData = await postSearch(searchCriteria);
      if (searchData.length > 0) {
        setCardSlot(searchData);
        setNotFound(false);
      } else {
        setCardSlot([]);
        setNotFound(true);
      }
    } catch (error) {
      console.error(`[Search failed]`, error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.browseBar}>
          <BrowseBar onSearch={handleSearch} />
        </div>
        <div className={styles.cardWrapper}>
          {notFound ? <NotFoundComponent /> : currentPageCards}
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
      <Footer />
    </>
  );
}