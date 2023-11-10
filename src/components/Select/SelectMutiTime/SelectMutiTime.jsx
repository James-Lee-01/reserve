import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const themePicker = createTheme({
  palette: {
    primary: {
      main: "#EBEBEB",
    },
    secondary: {
      main: "#c81d25",
    },
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "white",
        },
        root: {
          color: "white"
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
          zIndex: 0,
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

    MuiSelect: {
      styleOverrides: {
        icon : {
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const times = [
//   "10:00",
//   "11:00",
//   "12:00",
//   "13:00",
//   "14:00",
//   "15:00",
//   "16:00",
//   "17:00",
//   "18:00",
// ];

export default function SelectMutiTime({ selectedTimes, onTimeSelection, times }) {
  const [timeSelected, setTimeSelected] = useState(selectedTimes);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newSelected = typeof value === "string" ? value.split(",") : value;
    setTimeSelected(newSelected);

    onTimeSelection(newSelected);
  };

  return (
    <ThemeProvider theme={themePicker}>
      <div>
        <FormControl sx={{ m: 1, width: 500 }}>
          <InputLabel id='demo-multiple-checkbox-label'>Choose Time</InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            value={timeSelected}
            onChange={handleChange}
            input={<OutlinedInput label='Choose Time' />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {times.map((time) => (
              <MenuItem key={time} value={time}>
                <Checkbox checked={timeSelected.indexOf(time) > -1} />
                <ListItemText primary={time} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}
