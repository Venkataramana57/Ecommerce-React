import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoutes from './routes';
import store, {persistor} from './store';
import AuthProvider from './AuthProvider';
import AlertProvider from './AlertProvider';
import TopNav from './components/TopNav';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
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
