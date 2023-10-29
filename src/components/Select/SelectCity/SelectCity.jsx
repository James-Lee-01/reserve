import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState } from "react";

export default function BasicSelect({ variant, citySlot }) {
  const [city, setCity] = useState("");

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  // const selectCity = [
  //   "Taipei",
  //   "Hsinchu",
  //   "Taichung",
  //   "Chiayi",
  //   "Tainan",
  //   "Kaohsiung",
  // ].map((value, index) => {
  //   return (
  //     <MenuItem key={index} value={value}>
  //       {value}
  //     </MenuItem>
  //   );
  // });

  return (
    <FormControl variant={variant || "filled"} sx={{ minWidth: 120 }}>
      <InputLabel id='city-select-label'>City</InputLabel>
      <Select
        labelId='city-select-label'
        id='city-select'
        value={city}
        label='City'
        autoWidth
        onChange={handleChange}
      >
        {citySlot.map((citySlot, index) => (
          <MenuItem key={index} value={citySlot}>
            {citySlot}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
