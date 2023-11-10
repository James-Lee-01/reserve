import styles from './AccountPage.module.scss'
import Swal from 'sweetalert2';
import Navbar from '../../components/Navbar/Navbar'
import Input from '../../components/Input/Input'
import ReservationCard from '../../components/ReservationCard/ReservationCard';

import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { getUser, putAccount } from "../../api/auth";
import { getResvs } from '../../api/cafe'

export default function AccountPage() {
  //Sign Up Button Click
  const [emailSignUp, setEmailSignUp] = useState("");
  const [nameSignUp, setNameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState(null);
  const { currentUser } = useAuthContext();
  const [reservations, setReservations] = useState([]);

  // const navigate = useNavigate();

  //取目前使用者的id
  const userId = currentUser && currentUser.id;
  //權限限制與重新導向
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [navigate, isAuthenticated]);

  //先取得使用者自身資訊
  useEffect(() => {
    const getUserData = async () => {
      try {
        if (userId) {
          const data = await getUser(userId);
          if (data.status === "error") {
            console.log(data.message);
            return;
          }
          //若取得成功，先顯示在畫面上
          if (data) {
            await setNameSignUp(data.name);
            await setEmailSignUp(data.email);
          }
        }
      } catch (error) {
        console.error("[Get Data Failed]", error);
      }
    };
    getUserData();
  }, [userId]);

;

const handleSaveClick = async () => {

  //data API
  const data = await putAccount({
    name: nameSignUp,
    email: emailSignUp,
    password: passwordSignUp,
    checkPassword: checkPassword,
    userId: userId,
  });

  //signup noti
  if (data.status === "success") {
    Swal.fire({
      toast: true,
      position: "top",
      title: data.message,
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
    return;
  }

  //failed 後端驗證來的資訊
  Swal.fire({
    toast: true,
    position: "top",
    title: data.response.data.message,
    icon: "error",
    timer: 1000,
    showConfirmButton: false,
  });
  setError(data.response.data.message);
};

//Reservation cards

useEffect(() => {
  const fetchReservations = async () => {
    try {
      const resvsData = await getResvs();
      setReservations(resvsData);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  fetchReservations();
}, []);

const cards = reservations.map((reservation) => (
  <ReservationCard key={reservation.id} reservation={reservation} />
));


  return (
    <>
      <Navbar />
      <div id='account' className={styles.container}>
        <div className={styles.settingContainer}>
          <div className={styles.settingInfoWrapper}>
            <div className={styles.textGroup}>
              <h3 className={styles.textTitle}>
                Account <br />
                Setting
              </h3>
              <p className={styles.textContent}>
                {`Set your account.

              Check your reservation.`}
              </p>
            </div>
          </div>
          <div className={styles.settingInputWrapper}>
            <div className={styles.formGroup}>
              <p className={styles.title}>Account Setting</p>
              <Input
                type='email'
                placeholder='Email'
                value={emailSignUp}
                onChange={(emailSignUpInput) =>
                  setEmailSignUp(emailSignUpInput)
                }
              />
              <Input
                type='text'
                placeholder='Name'
                value={nameSignUp}
                onChange={(nameSignUpInput) => setNameSignUp(nameSignUpInput)}
              />
              <Input
                type='password'
                placeholder='Password'
                value={passwordSignUp}
                onChange={(passwordInput) => setPasswordSignUp(passwordInput)}
              />
              <Input
                type='password'
                placeholder='Confirm Password'
                value={checkPassword}
                onChange={(checkPasswordInput) =>
                  setCheckPassword(checkPasswordInput)
                }
              />
              <button className={styles.submitBtn} onClick={handleSaveClick}>
                Save
              </button>
              {error && <p className={styles.error}>{error}</p>}
            </div>
          </div>
        </div>
        <div className={styles.reservationContainer}>
          <div className={styles.cardWrapper}>{cards}</div>
        </div>
      </div>
    </>
  );
}