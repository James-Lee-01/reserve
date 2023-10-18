import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState } from "react";

export default function BasicSelect() {
  const [time, setTime] = useState("");

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  return (
      <FormControl variant='filled' sx={{ minWidth: 120 }} >
        <InputLabel id='demo-simple-select-label'>Time</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={time}
          label='Time'
          autoWidth
          onChange={handleChange}
        >
          <MenuItem value={10}>10:00</MenuItem>
          <MenuItem value={20}>11:00</MenuItem>
          <MenuItem value={30}>12:00</MenuItem>
        </Select>
      </FormControl>
  );
}
