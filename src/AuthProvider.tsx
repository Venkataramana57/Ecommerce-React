import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './slices/authSlice';
import { Snackbar, Alert } from '@mui/material';

// Define the type for the snackbar state
interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success'; // Define possible values for severity
}

// Define the shape of the AuthContext value
interface AuthContextValue {
  currentUser: User | null;
  isUserLoggedIn: boolean;
  isRetailer: boolean;
  showSnackbar: (message: string, severity?: 'error' | 'warning' | 'info' | 'success') => void;
  logOut: () => void;
}

// Define the type for the Redux state related to authentication
interface AuthState {
  auth: {
    currentUser: User | null;
    isUserLoggedIn: boolean;
  };
}

// Define the User type
interface User {
  id: string;
  name: string;
  role: string;
}

// Define the Props for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthContext with a default value
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const dispatch = useDispatch();
  const loggedinUser = useSelector((state: AuthState) => state.auth.currentUser);
  const isLoggedIn = useSelector((state: AuthState) => state.auth.isUserLoggedIn);
  const [isRetailer, setIsRetailer] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const showSnackbar = (message: string, severity: 'error' | 'warning' | 'info' | 'success' = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    setCurrentUser(loggedinUser);
    setIsUserLoggedIn(isLoggedIn);
    if (isLoggedIn) setIsRetailer(loggedinUser?.role === 'retailer');
  }, [loggedinUser, isLoggedIn]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isUserLoggedIn, isRetailer, showSnackbar, logOut }}
    >
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
  );
};

export default AuthProvider;
