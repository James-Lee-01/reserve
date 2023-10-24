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


export default function Btn({ text, color, size, href, onClick, iconType, endIcon }) {
  const renderIcon = (type) => {
    switch (type) {
      case "favorite":
        return <FavoriteIcon />;
      case "unFavorite":
        return <FavoriteBorderIcon />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant='contained'
        color={color}
        size={size}
        href={href}
        onClick={onClick}
        startIcon={renderIcon(iconType)}
        endIcon={endIcon}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
}