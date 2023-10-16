// import styles from './Button.module.scss'
import { Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

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


export default function Btn({ text, color, href, onClick, startIcon, endIcon }) {

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant='contained'
        color={color}
        href={href}
        onClick={onClick}
        startIcon={
          startIcon === "favorite" ? <FavoriteIcon /> : <FavoriteBorderIcon />
        }
        endIcon={endIcon}
      >
        {text}
      </Button>
      ;
    </ThemeProvider>
  );
}