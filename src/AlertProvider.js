import {useState, createContext} from 'react';
import { Snackbar, Alert } from '@mui/material';

export const AlertContext = createContext();

const AlertProvider = ({children}) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const openSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  }

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  }

  return(
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
  )
}

export default AlertProvider;