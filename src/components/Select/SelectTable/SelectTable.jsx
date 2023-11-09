import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState, useEffect } from "react";

export default function SelectTable({ variant, tableSlot, onSeatSelect }) {
  const [table, setTable] = useState("");

  useEffect(() => {
    // 在座位更改時呼叫 onSeatSelect
    onSeatSelect(table);
  }, [table]);

  const handleChange = (event) => {
    setTable(event.target.value);
  };

  const selectTable = tableSlot.map((tableSlot, index) => {
    return (
      <MenuItem key={index} value={tableSlot}>
        {tableSlot}
      </MenuItem>
    );
  });

  return (
    <FormControl variant={variant || "filled"} sx={{ minWidth: 120 }}>
      <InputLabel id='table-select-label'>Table for</InputLabel>
      <Select
        labelId='table-select-label'
        id='table-select'
        value={table}
        label='Table'
        autoWidth
        onChange={handleChange}
      >
        {selectTable}
      </Select>
    </FormControl>
  );
}
