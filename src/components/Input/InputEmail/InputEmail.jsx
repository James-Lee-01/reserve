import { TextField } from "@mui/material";
import { useState } from "react";

export default function InputEmail(label, fullWidth) {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);

  const handleEmail = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (emailValid.test(emailValue)) {
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
  };

  return (
    <TextField
      label={label}
      variant='filled'
      value={email}
      onChange={handleEmail}
      error={emailErr}
      helperText={emailErr ? "Incorrect email format." : ""}
      fullWidth={fullWidth}
    />
  );
}