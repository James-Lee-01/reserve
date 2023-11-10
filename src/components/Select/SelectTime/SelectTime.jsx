import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState, useEffect } from "react";

export default function SelectTime({ variant, timeSlot, onTimeSelect }) {
  const [selectedTime, setSelectedTime] = useState("");
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

  useEffect(() => {
    // 在時間更改時呼叫 onTimeSelect
    onTimeSelect(selectedTime);
  }, [selectedTime]);

  const handleChange = (event) => {
    const timeValue = event.target.value;
    setSelectedTime(timeValue);
    console.log("selectedTime", timeValue);
  };

  const selectTime = timeSlot.map((timeOption, index) => {
    return (
      <MenuItem key={index} value={timeOption.value}>
        {/* {timeSlot} */}
        {`${timeOption.formattedTime}`}
      </MenuItem>
    );
  });

  return (
    <FormControl variant={variant || "filled"} sx={{ minWidth: 120 }}>
      <InputLabel id='time-select-label'>Time</InputLabel>
      <Select
        labelId='time-select-label'
        id='time-select'
        value={selectedTime}
        label='Time'
        autoWidth
        onChange={handleChange}
      >
        {selectTime}
      </Select>
    </FormControl>
  );
}
