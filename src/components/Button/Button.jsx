import styles from './Button.module.scss'
import { Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: "#087e8b",
    },
    secondary: {
      main: "#c81d25",
    },
  },
});

export default function Btn({text, color, href, onClick}) {
  return (
    <ThemeProvider theme={theme}>
      <Button variant='contained' color={color} href={href} onClick={onClick}>
        {text}
      </Button>
      ;
    </ThemeProvider>
  ); 
}