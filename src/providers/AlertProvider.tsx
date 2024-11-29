import React, { useState, createContext, ReactNode, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

// Define the context type
type AlertContextType = (message: string, severity?: 'success' | 'info' | 'error' | 'warning') => void;

// Create the context with a default value
export const AlertContext = createContext<AlertContextType>(() => {});

// Define props type for the AlertProvider
interface AlertProviderProps {
  children: ReactNode;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'error' | 'warning';
}

const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const openSnackbar: AlertContextType = useCallback((message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const closeSnackbar = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <AlertContext.Provider value={openSnackbar}>
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
    </AlertContext.Provider>
  );
};

export default AlertProvider;
