import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState } from "react";

export default function BasicSelect() {
  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <FormControl variant='filled' sx={{ minWidth: 120 }}>
      <InputLabel id='gender-select-label'>Gender</InputLabel>
      <Select
        labelId='gender-select-label'
        id='gender-select'
        value={gender}
        label='Gender'
        autoWidth
        onChange={handleChange}
      >
        <MenuItem value={"Mr."}>Mr.</MenuItem>
        <MenuItem value={"Ms."}>Ms.</MenuItem>
        <MenuItem value={"Other"}>Other</MenuItem>
      </Select>
    </FormControl>
  );
}
