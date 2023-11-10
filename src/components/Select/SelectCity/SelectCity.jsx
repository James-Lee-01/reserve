import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

import { useState, useEffect } from "react";

// import { useState } from "react";

export default function SelectCity({ variant, citySlot, value, onChange, onCitySelect, required }) {
  const [city, setCity] = useState("");

  useEffect(() => {
    // 在座位更改時呼叫 onSeatSelect
    onCitySelect(city);
  }, [city]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  // const handleChange = (event) => {
  //   setCity(event.target.value);
  //   // console.log(event.target.value);
  // };

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
      <InputLabel id='city-select-label'>
        {required ? "City *" : "City"}
      </InputLabel>
      <Select
        labelId='city-select-label'
        id='city-select'
        value={city}
        // value={value}
        label='City'
        autoWidth
        // onChange={handleChange}
        onChange={handleChange}
      >
        {citySlot.map((citySlot, index) => (
          <MenuItem key={index} value={citySlot}>
            {citySlot}
          </MenuItem>
        ))}
      </Select>
      {required && <FormHelperText>Required</FormHelperText>}
    </FormControl>
  );
}
