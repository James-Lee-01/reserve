import styles from './FavoritePage.module.scss'

import Navbar from "../../components/Navbar/Navbar";
// import BrowseBar from "../../components/BrowseBar/BrowseBar";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";
// import SearchBar from '../../components/SearchBar/SearchBar'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFavoriteCafes } from "../../api/cafe";

import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export default function BrowsePage() {
  const [cardSlot, setCardSlot] = useState([]);
  const [notFound, setNotFound] = useState(false);

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

  //render all cafes
  useEffect(() => {
    const generateAllFavoriteCafes = async () => {
      try {
        const cardData = await getFavoriteCafes();
        if (cardData.length > 0) {
          setCardSlot(cardData);
        } else {
          console.log("No result");
          setNotFound(true);
        }
      } catch (error) {
        console.log(`[Get favorites failed]`, error);
      }
    };

    generateAllFavoriteCafes();
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

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* <div className={styles.browseBar}>
          <BrowseBar />
        </div> */}
        <h1 className={styles.cardWrapperTitle}>My Favorite</h1>
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