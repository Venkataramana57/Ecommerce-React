import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';

const TopNav = () => {
  const navigate = useNavigate();
  const { currentUser, isUserLoggedIn, isRetailer, logOut } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const profileLable = isUserLoggedIn ? `${currentUser.name} as ${currentUser.role}` : '';

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography onClick={() => navigate('/')} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My eCommerce Store
        </Typography>
        {isUserLoggedIn && !isRetailer && <Button color="inherit" onClick={() => navigate('/cart')}>Cart</Button>}
        {!isUserLoggedIn && <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>}
        {isUserLoggedIn && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
            >
              <Avatar alt={currentUser.name} src="/path/to/profile/image.jpg" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>{profileLable}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
