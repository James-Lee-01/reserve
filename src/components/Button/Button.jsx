// import styles from './Button.module.scss'
import { Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LogoutIcon from "@mui/icons-material/Logout";

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


export default function Btn({ text, color, size, href, onClick, iconType, endIcon, disabled }) {
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
      case "trash":
        return <DeleteForeverIcon />;
      case "logout":
        return <LogoutIcon />;
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
        disabled={disabled}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
}