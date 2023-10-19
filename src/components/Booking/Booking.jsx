import styles from './Booking.module.scss'
import dayjs from 'dayjs'
import SelectTime from '../Select/SelectTime/SelectTime'
import SelectPeople from '../Select/SelectTable/SelectTable'
import SelectGender from '../Select/SelectGender/SelectGender'
// import TextField from '../TextField/TextField'
import { TextField } from '@mui/material'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function Booking () {
  const [value, setValue] = useState(null)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState(false)

  const tomorrow = dayjs().add(1, "day");
  const nextWeek = dayjs().add(7, 'day')

  const handleNumber = (event) => {
    const val = event.target.value;

    if (val.match(/[^0-9]/)) {
      return event.preventDefault();
    }

    setPhone(val);
  };

  const handleEmail = (event) => {
    const emailValue = event.target.value
    setEmail(emailValue)

    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (emailValid.test(emailValue)) {
      setEmailErr(false)
    } else {
      setEmailErr(true)
    }
  }


  return (
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
                      variant: "filled",
                      // focused: true,
                      color: "primary",
                    },
                  }}
                />
                <SelectTime className={styles.timePicker} />
                <SelectPeople className={styles.peoplePicker} />
              </div>
              <div className={styles.infoWrapper}>
                <SelectGender />
                <TextField label={"Name"} variant='filled' />
              </div>
              <div className={styles.contactWrapper}>
                <div className={styles.phoneWrapper}>
                  <TextField
                    label={"Phone Number"}
                    variant='filled'
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    value={phone}
                    onChange={handleNumber}
                  />
                </div>
                <div className={styles.emailWrapper}>
                  <TextField
                    label={"Email"}
                    variant='filled'
                    value={email}
                    onChange={handleEmail}
                    error={emailErr}
                    helperText={emailErr ? "Incorrect email format." : ""}
                  />
                </div>
              </div>

              <div className={styles.noteWrapper}></div>
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}