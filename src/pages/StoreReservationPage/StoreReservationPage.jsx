import styles from "./StoreReservationPage.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StoreReservationCard from "../../components/StoreReservationCard/StoreReservationCard"

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCafeResvs, deleteResv } from "../../api/cafe"

export default function StoreReservationPage() {
  const [cardSlot, setCardSlot] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();

  ////// for Delete Reservation
  const handleDelete = async (cardId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this reservation?"
      );
      if (confirmed) {
        const result = await deleteResv(cardId);
        setCardSlot((cards) => {
          return cards.filter((card) => card.id !== cardId);
        });
        console.log(`Delete success： ${cardId}, ${result}`);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  //render all cafes
  useEffect(() => {
    const generateCafeResvs = async () => {
      try {
        const cardData = await getCafeResvs(id);
        console.log(id);
        if (cardData.length > 0) {
          setCardSlot(cardData);
        } else {
          console.log("No result");
          setNotFound(true);
        }
      } catch (error) {
        console.log(`[Get cafe reservations failed]`, error);
      }
    };

    generateCafeResvs();
  }, [id]);

  const cards = cardSlot.map((cardData) => (
    <StoreReservationCard
      key={cardData.id}
      id={cardData.id}
      date={cardData.date}
      time={cardData.timeslot}
      name={cardData.customer}
      table={cardData.seat}
      tel={cardData.tel}
      email={cardData.email}
      note={cardData.note}
      onDelete={handleDelete}
    />
  ));

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
        <h1 className={styles.cardWrapperTitle}>Reservations</h1>
        <div className={styles.cardWrapper}>
          {notFound ? <NotFoundComponent /> : cards}
          {/* {
            <StoreReservationCard
              key={"1"}
              id={"1"}
              date={"2023 - 11 - 11"}
              time={"10:00"}
              name={"test"}
              table={"test"}
              tel={"test"}
              email={"test"}
              note={"test"}
              onDelete={handleDelete}
            />
          } */}
        </div>
      </div>
      <Footer />
    </>
  );
}
