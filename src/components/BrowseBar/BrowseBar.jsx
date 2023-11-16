import styles from './BrowseBar.module.scss'
import dayjs from "dayjs";
import SelectTime from "../Select/SelectTime/SelectTime";
import SelectTable from "../Select/SelectTable/SelectTable";
import SelectCity from "../Select/SelectCity/SelectCity"
import Button from "../Button/Button";

import { useState, useEffect } from 'react';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getTimeSlots } from "../../api/time";
import { getSeats } from "../../api/time"
import { getCities } from '../../api/cities';

//Set ThemeProvider
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

    MuiInput: {
      styleOverrides: {
        input: {
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

export default function BrowseBar({onSearch}) {
  const [value, setValue] = useState(null);

  const today = dayjs().add(0, "day");
  const nextWeek = dayjs().add(6, "day");
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');

  const [timeSlot, setTimeSlot] = useState([]);
  const [tableSlot, setTableSlot] = useState([]);
  const [citySlot, setCitySlot] = useState([]);

  //For Time Select
  useEffect(() => {
    const generateTimeSlot = async () => {
      try {
        const timeSlot = await getTimeSlots(); //prop.api
        if (timeSlot) {
          //Convert the time options format
          const formattedTimeSlot = timeSlot.map((time) => ({
            formattedTime: `${time.slice(0, 2)}:${time.slice(2)}`,
            value: time,
          }));
          setTimeSlot(formattedTimeSlot);
        }
      } catch (error) {
        console.log(`[Get time options failed]`, error);
      }
    };

    generateTimeSlot();
  }, []);

  //For Table Select
  useEffect(() => {
    const generateTableSlot = async () => {
      try {
        const tableSlot = await getSeats(); //prop.api
        if (tableSlot.length > 0) {
          console.log(tableSlot);
          setTableSlot(tableSlot);
        } else {
          setTableSlot(["-"]);
        }
      } catch (error) {
        console.log(`[Get table options failed]`, error);
      }
    };

    generateTableSlot();
  }, []);

  //For City Select
  useEffect(() => {
    const generateCitySlot = async () => {
      try {
        const citySlot = await getCities(); //prop.api
        if (citySlot.length > 0) {
          console.log(citySlot);
          setCitySlot(citySlot);
        } else {
          setCitySlot(["-"]);
        }
      } catch (error) {
        console.log(`[Get city options failed]`, error);
      }
    };

    generateCitySlot();
  }, []);

  // 新增函數處理時間選擇
  const handleTimeSelect = (selectedTime) => {
    // 更新選擇的時間
    setSelectedTime(selectedTime);
  };

  // 新增函數處理座位選擇
  const handleSeatSelect = (selectedSeat) => {
    // 更新選擇的座位
    setSelectedSeat(selectedSeat);
  };

  // 新增函數處理城市選擇
  const handleCitySelect = (selectedCity) => {
    // 更新選擇的城市
    setSelectedCity(selectedCity);
  };

  const handleSearchClick = () => {
    // 獲取搜尋條件
    const searchCriteria = {
      date: value?.format("YYYY-MM-DD"),
      timeslot: selectedTime,
      seat: selectedSeat,
      city: selectedCity,
    };

    // 將搜尋條件傳遞給父元件
    onSearch(searchCriteria);
    console.log(searchCriteria);
  };

  return (
    <ThemeProvider theme={themeDatePicker}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={styles.container}>
          <DatePicker
            className={styles.datePicker}
            label='Pick a date'
            value={value}
            minDate={today}
            maxDate={nextWeek}
            onChange={(newValue) => setValue(newValue)}
            slotProps={{
              value: { color: "primary" },
              openPickerButton: { color: "primary" },
              textField: {
                variant: "standard",
                // focused: true,
                color: "primary",
              },
            }}
          />
          <SelectTime
            className={styles.timePicker}
            variant={"standard"}
            timeSlot={timeSlot}
            onTimeSelect={handleTimeSelect}
          />
          <SelectTable
            className={styles.tablePicker}
            variant={"standard"}
            tableSlot={tableSlot}
            onSeatSelect={handleSeatSelect}
          />
          <SelectCity
            className={styles.cityPicker}
            variant={"standard"}
            citySlot={citySlot}
            onCitySelect={handleCitySelect}
            value={selectedCity}
          />
          <Button
            text={"Search"}
            color={"third"}
            size={"small"}
            endIcon={"search"}
            onClick={handleSearchClick}
          />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}