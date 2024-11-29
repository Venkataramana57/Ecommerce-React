import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoutes from './routes';
import store, { persistor } from './store';
import AuthProvider from './providers/AuthProvider';
import AlertProvider from './providers/AlertProvider';
import TopNav from './components/TopNav';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <AlertProvider>
            <Router>
              <TopNav />
              <AppRoutes />
            </Router>
          </AlertProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
