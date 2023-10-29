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
import { getTimes } from '../../api/time';

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

export default function BrowseBar() {
    const [value, setValue] = useState(null);
    const tomorrow = dayjs().add(1, "day");
    const nextWeek = dayjs().add(7, "day");
    const [timeSlot, setTimeSlot] = useState([]);

    //For Time Select
    useEffect(() => {
      const generateTimeSlot = async () => {
        try {
          const timeSlot = await getTimes(); //prop.api
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


  return (
    <ThemeProvider theme={themeDatePicker}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={styles.container}>
          <DatePicker
            className={styles.datePicker}
            label='Pick a date'
            value={value}
            minDate={tomorrow}
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
          />
          <SelectTable className={styles.tablePicker} variant={"standard"} />
          <SelectCity className={styles.cityPicker} variant={"standard"} />
          <Button
            text={"Search"}
            color={"third"}
            size={"small"}
            endIcon={"search"}
          />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}