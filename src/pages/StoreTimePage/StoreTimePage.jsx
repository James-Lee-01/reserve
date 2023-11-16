import styles from './StoreTimePage.module.scss'
import Swal from 'sweetalert2';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer';
import SelectMutiTime from '../../components/Select/SelectMutiTime/SelectMutiTime'
import SelectTableCount from '../../components/Select/SelectTableCount/SelectTableCount'
import Button from '../../components/Button/Button'

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { postTimes, postTables } from '../../api/cafe'

import { useAuthContext } from '../../contexts/AuthContext';


export default function StoreTimePage() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [timeslots, setTimeslots] = useState([]);
  const [tableCounts, setTableCounts] = useState({});
  const [timesApiSuccess, setTimesApiSuccess] = useState(false);
  const [tablesApiSuccess, setTablesApiSuccess] = useState(false);
  const [timesApiMessage, setTimesApiMessage] = useState(null);
  const [tablesApiMessage, setTablesApiMessage] = useState(null);

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

  const handleTimeSelection = (selectedTimes) => {
    // 在這裡處理所選取的時間，您可以將它傳送到 API
    const timeslots = selectedTimes.map((time) => time.replace(":", ""));
    setTimeslots(timeslots);
    // 將時間轉換成 "timeslots" 格式，例如："10:00" 轉成 "1000"

    console.log("Selected Times:", timeslots);
  };

  const handleTableCountChange = (seat, count) => {
    const newTableCounts = { ...tableCounts, [seat]: count };
    setTableCounts(newTableCounts);
  };

  const seatOptions = [1, 2, 4, 6, 8]; // 不同座位數的選項

  ////////To API Form/////////
  const submitToTimeApi = async () => {

    const timesRequestBody = {
      cafeId: id,
      timeslots,
    };

    // 檢視requestBody傳送到API
    console.log("Time API Request Body:", timesRequestBody);

    try {
      // 向 postTimes API 發送
      const timesResponse = await postTimes(timesRequestBody);
      console.log("postTimes Response:", timesResponse);

      if (timesResponse.status === 'success') {
        setTimesApiSuccess(true);
        setTimesApiMessage(timesResponse.message);
        // 清除已提交的數據
        setTimeslots([]);

        if (tablesApiSuccess) {
          Swal.fire({
            icon: "success",
            title: "Add operating hours & seats successfully!",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/store");
            } 
          });
        }

      } else {
        setTimesApiMessage(timesResponse.response.data.message);
      }

    } catch (error) {
      console.error("Time API Request Failed:", error);
    }
  };



  const submitToTableApi = async () => {
    const tables = Object.keys(tableCounts)
      .filter((seat) => tableCounts[seat] > 0)
      .map((seat) => ({
        seat: Number(seat),
        count: tableCounts[seat],
      }));

    const tablesRequestBody = {
      cafeId: id,
      tables,
    };

    // 檢視requestBody傳送到API
    console.log("Table API Request Body:", tablesRequestBody);

    try {
      // 向 postTables API 發送
      const tablesResponse = await postTables(tablesRequestBody);
      console.log("postTables Response:", tablesResponse);

      if (tablesResponse.status === "success") {
        setTablesApiSuccess(true);
        setTablesApiMessage(tablesResponse.message);
        // 清除已提交的數據
        setTableCounts({});

        if (timesApiSuccess) {
          Swal.fire({
            icon: "success",
            title: "Add operating hours & seats successfully!",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/store");
            }
          });
        }

      } else {
        setTablesApiMessage(tablesResponse.response.data.message);
      }
      
    } catch (error) {
      console.error("Table API Request Failed:", error);
    }
  };


  //////////////////////////////

  // 在這裡設定所選取的時間選項
  // 生成時間範圍，例如，從 "10:00" 到 "18:00"，每小時一次
  const generateTimes = () => {
    const startTime = 10; // 開始時間（10:00）
    const endTime = 18; // 結束時間（18:00）
    const times = [];
    for (let i = startTime; i <= endTime; i++) {
      times.push(`${i.toString().padStart(2, "0")}:00`);
    }
    return times;
  };

  const times = generateTimes(); // 使用生成的時間範圍

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>Add operating hours & seats.</h1>
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.inputWrapper}>
            <div className={styles.selectTimeWrapper}>
              <p>Set business hours.</p>
              <SelectMutiTime
                selectedTimes={timeslots} // 初始化所選取的時間
                onTimeSelection={handleTimeSelection} // 所選取的時間回調函數
                times={times}
              />
            </div>
            <div className={styles.submitBtn}>
              <Button
                text={"Set business hours"}
                color={"secondary"}
                size={"large"}
                onClick={submitToTimeApi}
                disabled={timesApiSuccess}
              />
              {timesApiMessage && (
                <div
                  className={
                    timesApiSuccess
                      ? styles.successMessage
                      : styles.errorMessage
                  }
                >
                  {timesApiMessage}
                </div>
              )}
            </div>
            <div className={styles.selectTableWrapper}>
              <p>Set seat availability.</p>
              <div>
                {seatOptions.map((seat) => (
                  <SelectTableCount
                    key={seat}
                    seatFor={seat}
                    count={tableCounts[seat] || 0}
                    onCountChange={(count) =>
                      handleTableCountChange(seat, count)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.submitBtn}>
            <Button
              text={"Set seat availability"}
              color={"secondary"}
              size={"large"}
              onClick={submitToTableApi}
              disabled={tablesApiSuccess}
            />
            {tablesApiMessage && (
              <div
                className={
                  tablesApiSuccess ? styles.successMessage : styles.errorMessage
                }
              >
                {tablesApiMessage}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}