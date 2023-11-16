import styles from './AdminPage.module.scss'
import Swal from 'sweetalert2';
import AdminStoreCard from '../../components/AdminStoreCard/AdminStoreCard';
import Button from '../../components/Button/Button'
import { useAuthContext } from '../../contexts/AuthContext';
import { getCafes, deleteCafe, deleteOldResvs } from '../../api/admin'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const [cardSlot, setCardSlot] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const { logout, isAuthenticated, role, identified } = useAuthContext();

  //prohibited and redirection
  useEffect(() => {
    if (identified) {
      if (role === "user") {
        Swal.fire({
          title: "Unauthorized",
          icon: "error",
          showConfirmButton: true,
        }).then(() => {
          navigate("/");
        });
      } else if (!isAuthenticated) {
        navigate("/login");
      }
    }
  }, [isAuthenticated, role, navigate, identified]);


  ////// for Delete Cafe
  const handleDelete = async (cardId) => {
    try {
      // 跳出確認視窗
      Swal.fire({
        title: "Do you want to remove the cafe?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const result = await deleteCafe(cardId);
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
            console.error("deleteCafe API 錯誤：", error);
            
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

  ///// for Clear Cache
  const handleClearCache = async () => {
    try {
      const result = await deleteOldResvs()
      console.log(`Clear success： `, result);
      if (result.status === "success") {
        Swal.fire(result.message, "", "success");
      } else if (result.message === "Network Error") {
        Swal.fire(result.message, "", "error");
      } else {
        Swal.fire(result.response.data.message, "", "error");
      }
    } catch (error) {
      console.error("Clear failed", error);
    }
  }

  ///// logout
  const handleLogout = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
      Swal.fire({
        toast: true,
        position: "top",
        title: "Logout success",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        // timerProgressBar: true,
      });
    }
  }

  //render all cafes
  useEffect(() => {
    const getAllCafes = async () => {
      try {
        const cardData = await getCafes();
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

    getAllCafes();
  }, []);

  const cards = cardSlot.map((cardData) => (
    <AdminStoreCard
      key={cardData.id}
      id={cardData.id}
      cover={cardData.cover}
      cafeName={cardData.name}
      city={cardData.city}
      user={cardData.user}
      intro={cardData.intro}
      onDelete={handleDelete}
    />
  ));

  //Not Found information
  function NotFoundComponent() {
    return (
      <div>
        <h2>Not Found</h2>
        <p>Sorry, no results were found.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Hello Admin</h1>
      </div>
      <div className={styles.btnWrapper}>
        <Button
          text='Clear Cache'
          color='secondary'
          size='large'
          endIcon='trash'
          onClick={handleClearCache}
        />
        <Button
          text='Logout'
          color='primary'
          size='large'
          endIcon='logout'
          onClick={handleLogout}
        />
      </div>
      <div className={styles.cardWrapper}>
        {notFound ? <NotFoundComponent /> : cards}
      </div>
    </div>
  );
}