import styles from "./StoreReservationPage.module.scss";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StoreReservationCard from "../../components/StoreReservationCard/StoreReservationCard"

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCafeResvs, deleteResv } from "../../api/cafe"

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function StoreReservationPage() {
  const [cardSlot, setCardSlot] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();

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

  ////// for Delete Reservation
  const handleDelete = async (cardId) => {
    try {
      // 跳出確認視窗
      Swal.fire({
        title: "Do you want to remove this reservation?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const result = await deleteResv(cardId);
            setCardSlot((cards) => {
              return cards.filter((card) => card.id !== cardId);
            });
            console.log(`Delete success： ${cardId}`, result);
            if (result.status === "success") {
              Swal.fire(result.message, "", "success");
            } else if (result.message === "Network Error") {
              Swal.fire(result.message, "", "error");
            } else {
              Swal.fire(result.response.data.message, "", "error");
            }
          } catch (error) {
            console.error("deleteResv API 錯誤：", error);
          }
        } else if (result.isDenied) {
          // 如果取消確認，取消勾選
          console.log("cancel");
        }
      });
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
