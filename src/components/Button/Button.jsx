// import styles from './Button.module.scss'
import { Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";

const theme = createTheme({
  palette: {
    primary: {
      main: "#087e8b",
    },
    secondary: {
      main: "#c81d25",
    },
    third: {
      main: "#ffffff"
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
      case "search":
        return <SearchIcon />;
      case "loading":
        return <MoreHorizIcon />;
      case "edit":
        return <EditIcon />;
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
        endIcon={renderIcon(endIcon)}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
}