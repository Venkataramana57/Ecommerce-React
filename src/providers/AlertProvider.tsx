import React, { useState, createContext, ReactNode, useCallback } from 'react';

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
      {/* Snackbar */}
      {snackbar.open && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg text-white ${
            snackbar.severity === 'success'
              ? 'bg-green-500'
              : snackbar.severity === 'error'
              ? 'bg-red-500'
              : snackbar.severity === 'warning'
              ? 'bg-yellow-500'
              : 'bg-blue-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{snackbar.message}</span>
            <button
              onClick={closeSnackbar}
              className="ml-4 text-white focus:outline-none hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Render children */}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
