import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '@/context/ThemeContext';

const Header = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Movie House
        </Typography>
        <IconButton color="inherit" onClick={toggleTheme}>
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
