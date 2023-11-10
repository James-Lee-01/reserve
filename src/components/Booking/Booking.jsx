import styles from './Booking.module.scss'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
import SelectTime from '../Select/SelectTime/SelectTime'
import SelectTable from '../Select/SelectTable/SelectTable'

import Button from '../Button/Button'
import { TextField } from '@mui/material'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect, forwardRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles';

// import { getSeats } from '../../api/time'
import { getTables, postEmptyTime, postResv } from "../../api/cafe";

const themeDatePicker = createTheme({
  palette: {
    primary: {
      main: "#EBEBEB",
    },
    secondary: {
      main: "#c81d25",
    },
  },

  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          color: "white",
          borderRadius: 2,
          borderWidth: 1,
          backgroundColor: "#2F2F2F",
        },
      },
    },

    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },

    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "white",
          // borderRadius: 2,
          borderWidth: 1,
          // borderColor: "#e91e63",
          // border: "none",
          // backgroundColor: "#880e4f",
          "&.Mui-selected": {
            backgroundColor: "#0A7E8B",
          },

          "&.Mui-disabled:not(.Mui-selected)": {
            color: "#6B7A90",
            // border: "none",
          },
        },
        today: {
          "&.Mui-disabled:not(.Mui-selected)": {
            border: "1px solid gray",
          },
        },
      },
    },

    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          color: "white",
          borderRadius: 2,
          borderWidth: 1,
          // borderColor: "#e91e63",
          // border: "1px solid",
          // backgroundColor: "#880e4f",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        input: {
          color: "white",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2F2F2F",
          color: "white",
        },
      },
    },
  },
});


// 訂位資訊填寫頁（日期、時段、人數、姓名、性別、電話、email、備註）


const Booking = forwardRef((props, ref) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [phone, setPhone] = useState("");

  //for Table and Time slots
  const [tableSlot, setTableSlot] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [emptyTimeData, setEmptyTimeData] = useState([]);
  const [isTimeSlotLoaded, setIsTimeSlotLoaded] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  // 新增 bookingData 狀態
  const [bookingData, setBookingData] = useState({
    cafeId: id,
    date: null,
    timeslot: null,
    seat: null,
    tel: "",
    note: "",
  });

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seatsData = await getTables(id);
        const seats = seatsData.map((table) => table.seat);
        setTableSlot(seats);
      } catch (error) {
        console.error("Error fetching seats from API: ", error);
      }
    };

    fetchSeats();
  }, [id]);

  const tomorrow = dayjs().add(1, "day");
  const nextWeek = dayjs().add(7, "day");

  const handleNumber = (event) => {
    const num = event.target.value;

    if (num.match(/[^0-9]/)) {
      return event.preventDefault();
    }

    setPhone(num);

    setBookingData((prevData) => ({
      ...prevData,
      tel: num,
    }));
  };

  // 新增函數處理座位選擇
  const handleSeatSelect = async (selectedSeat) => {
    try {
      // 更新選擇的座位
      setSelectedSeat(selectedSeat);

      // 更新預訂資訊
      setBookingData((prevData) => ({
        ...prevData,
        seat: selectedSeat,
      }));

      // 發送 API 請求
      const result = await postEmptyTime({
        id: id, // 咖啡廳 ID
        startDate: dayjs().format("YYYY-MM-DD"), // 使用當前日期
        seat: selectedSeat,
      });

      //將資料存入 emptyTimeData 狀態
      setEmptyTimeData(result);

      // 設定 DatePicker 可見
      if (selectedSeat) {
        setIsDatePickerVisible(true);
      }

      console.log("postEmptyTime API Response:", result);
      // 在這裡處理 API 回傳的資料，例如更新 UI 或顯示成功訊息等
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  const handleDateChange = async (newValue) => {
    try {
      // 取得日期
      const currentDate = dayjs(newValue).format("YYYY-MM-DD");
      console.log("currentDate value", currentDate);

      // 更新日期
      setBookingData((prevData) => ({
        ...prevData,
        date: currentDate,
      }));

      // 尋找對應日期的 timeslots
      const selectedDateData = emptyTimeData.find(
        (data) => data.date === currentDate
      );

      // 轉換時間槽數據格式
      if (selectedDateData && selectedDateData.timeslots) {
        const formattedTimeSlot = selectedDateData.timeslots.map((time) => ({
          formattedTime: `${time.slice(0, 2)}:${time.slice(2)}`,
          value: time,
        }));

        // 更新時段資料
        setTimeSlot(formattedTimeSlot);
      } else {
        // 如果沒有時間槽，可以根據您的邏輯進行處理，例如設置為空數組
        setTimeSlot([]);
      }
    } catch (error) {
      console.error("Error fetching empty time:", error);
    }
  };

  // 新增函數處理時間選擇
  const handleTimeSelect = (selectedTime) => {
    // 更新選擇的時間
    setSelectedTime(selectedTime);

    // 更新預訂資訊
    setBookingData((prevData) => ({
      ...prevData,
      timeslot: selectedTime,
    }));
  };

  // 新增函數檢查是否有時間槽
  const isTimeSlotAvailable = () => {
    return timeSlot && timeSlot.length > 0;
  };

  // 在時間槽有值時，設定 isTimeSlotLoaded 為 true
  useEffect(() => {
    setIsTimeSlotLoaded(isTimeSlotAvailable());
  }, [timeSlot]);

  const renderTimePicker = () => {
    if (!isTimeSlotLoaded) {
      return null;
    }

    return (
      <SelectTime
        className={styles.timePicker}
        timeSlot={timeSlot}
        onTimeSelect={handleTimeSelect}
      />
    );
  };

  // 新增函數處理備註變更
  const handleNoteChange = (event) => {
    const val = event.target.value;

    // 更新預訂資訊
    setBookingData((prevData) => ({
      ...prevData,
      note: val,
    }));
  };

  const handleSubmit = async () => {
    try {
      // 在這裡使用 bookingData 進行 API 請求
      const response = await postResv(bookingData);

      // 在這裡處理 API 回傳的資料，例如更新 UI 或顯示成功訊息等
      if (response.status === 'success') {
        Swal.fire({
          title: "Reservation Successful",
          // text: "",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/browse/all");
        }})
        console.log("Reservation Successful:", response);

        // 清空表單或執行其他後續操作
        // 清空電話號碼、備註等
        setPhone("");
        setBookingData({
          cafeId: id,
          date: null,
          timeslot: null,
          seat: null,
          tel: "",
          note: "",
        });
      } else {
        //failed 後端驗證來的資訊
        Swal.fire({
          // toast: true,
          // position: "top",
          title: response.response.data.message,
          icon: "error",
          // timer: 1000,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
  };

  return (
    <div ref={ref}>
      <ThemeProvider theme={themeDatePicker}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={styles.container}>
            <div className={styles.textGroup}>
              <h3 className={styles.textTitle}>Book Now</h3>
              <p className={styles.textContent}>
                {`Coffee & Comfort, all in one place.

              Book Your Perfect Spot Right Here!`}
              </p>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputGroup}>
                <div className={styles.timeWrapper}>
                  {/* <DatePicker
                    className={styles.datePicker}
                    label='Pick a date'
                    value={value}
                    minDate={tomorrow}
                    maxDate={nextWeek}
                    onChange={(newValue) => handleDateChange(newValue)}
                    slotProps={{
                      value: { color: "primary" },
                      openPickerButton: { color: "primary" },
                      textField: {
                        variant: "filled",
                        // focused: true,
                        color: "primary",
                      },
                    }}
                  /> */}
                  <SelectTable
                    className={styles.tablePicker}
                    tableSlot={tableSlot}
                    onSeatSelect={handleSeatSelect}
                  />
                  {isDatePickerVisible && (
                    <DatePicker
                      className={styles.datePicker}
                      label='Pick a date'
                      value={value}
                      minDate={tomorrow}
                      maxDate={nextWeek}
                      onChange={(newValue) => handleDateChange(newValue)}
                      slotProps={{
                        value: { color: "primary" },
                        openPickerButton: { color: "primary" },
                        textField: {
                          variant: "filled",
                          color: "primary",
                        },
                      }}
                    />
                  )}
                  {renderTimePicker()}
                </div>

                <div className={styles.contactWrapper}>
                  <TextField
                    label={"Phone Number"}
                    variant='filled'
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    value={phone}
                    onChange={handleNumber}
                  />
                </div>

                <div className={styles.noteWrapper}>
                  <TextField
                    label={"Note"}
                    variant='filled'
                    multiline
                    rows={5}
                    fullWidth={true}
                    onChange={handleNoteChange}
                  />
                </div>
                <div className={styles.submitBtn}>
                  <Button
                    color={"secondary"}
                    text='Submit Booking'
                    size={"large"}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
})

export default Booking