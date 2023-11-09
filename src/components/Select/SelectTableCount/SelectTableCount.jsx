import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState, useEffect } from "react";
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
          color: "white",
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
        icon: {
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

export default function SelectTableCount({ id, seatFor, count, onCountChange }) {
  const [tableCount, setTableCount] = useState(0);

  useEffect(() => {
    if (count !== undefined) {
      setTableCount(count);
    }
  }, [count]);

  const handleChange = (event) => {
    const count = event.target.value
    setTableCount(count);
    onCountChange(count);
  };

  const tableOptions = Array.from({length: 11}, (_, index) => index)

  return (
    <ThemeProvider theme={themePicker}>
      <FormControl sx={{ m: 1, width: 150 }}>
        <InputLabel id={`demo-simple-select-label-${id}`}>
          Seat for {seatFor}
        </InputLabel>
        <Select
          labelId={`demo-simple-select-label-${id}`}
          id={`${id}`}
          value={tableCount}
          label={`Seat for ${seatFor}`}
          onChange={handleChange}
        >
          {tableOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}
