import { useState, createContext, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from './slices/authSlice';
import { Snackbar, Alert } from '@mui/material';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
	const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

	const dispatch = useDispatch();
	const loggedinUser = useSelector((state) => state.auth.currentUser);
	const isLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
	const [isRetailer, setIsRetailer] = useState(false);
	const [currentUser, setcurrentUser] = useState(null);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

	const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

	useEffect(() => {
		setcurrentUser(loggedinUser);
		setIsUserLoggedIn(isLoggedIn);
		if(isLoggedIn) setIsRetailer(loggedinUser.role === 'retailer');
	}, [loggedinUser, isLoggedIn, isRetailer]);

	const logOut = () => {
		dispatch(logout());
	}

	return(
		<AuthContext.Provider value={{currentUser, isUserLoggedIn, isRetailer, showSnackbar, logOut}}>
			<Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

			{children}
		</AuthContext.Provider>
	)
};

export default AuthProvider;