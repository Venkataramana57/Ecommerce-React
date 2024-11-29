import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

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


interface AuthContextInterface {
  currentUser: any;
  isUserLoggedIn: boolean;
  isRetailer: boolean;
  logOut: () => void;
}

const TopNav: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, isUserLoggedIn, isRetailer, logOut } = useContext(AuthContext) as AuthContextInterface;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const profileLabel: string = isUserLoggedIn && currentUser ? `${currentUser.name} as ${currentUser.role}` : '';

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
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
        <Typography
          onClick={() => navigate('/')}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          My eCommerce Store
        </Typography>
        {isUserLoggedIn && !isRetailer && (
          <Button color="inherit" onClick={() => navigate('/cart')}>Cart</Button>
        )}
        {!isUserLoggedIn && (
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
        )}
        {isUserLoggedIn && (
          <>
            <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
              <Avatar alt={currentUser?.name} src={currentUser?.profileImage || '/default-profile.jpg'} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>{profileLabel}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
