import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState } from "react";

export default function BasicSelect() {
  const [people, setPeople] = useState("");

  const handleChange = (event) => {
    setPeople(event.target.value);
  };

  const selectPerson = Array(8).fill().map((_, index) => {
    return (<MenuItem key={index} value={index + 1}>{index + 1}</MenuItem>);
  })

  return (
    <FormControl variant='filled' sx={{ minWidth: 120 }}>
      <InputLabel id='demo-simple-select-label'>People</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={people}
        label='Person'
        autoWidth
        onChange={handleChange}
      >
        {selectPerson}
      </Select>
    </FormControl>
  );
}
