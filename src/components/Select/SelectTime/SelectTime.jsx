import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState } from "react";

export default function BasicSelect({variant, timeSlot}) {
  const [time, setTime] = useState("");

  // //Without API Calls
  //   const timeSlot = []
  //   for (let hour = 10; hour <= 18; hour++) {
  //     const formattedTime = `${hour.toString().padStart(2, '0')} : 00`
  //     const value = formattedTime.replace(':', '')
  //     timeSlot.push({ formattedTime, value })
  //   }
  //   return timeSlot
  // }

  // const timeSlot = generateTimeSlot()

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <FormControl variant={variant || "filled"} sx={{ minWidth: 120 }}>
      <InputLabel id='time-select-label'>Time</InputLabel>
      <Select
        labelId='time-select-label'
        id='time-select'
        value={time}
        label='Time'
        autoWidth
        onChange={handleChange}
      >
        {timeSlot.map((timeSlot, index) => (
          <MenuItem key={index} value={timeSlot.value}>
            {timeSlot.formattedTime}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
