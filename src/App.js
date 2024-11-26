import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoutes from './routes';
import store, {persistor} from './store';
import AuthProvider from './AuthProvider';
import TopNav from './components/TopNav';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <Router>
            <TopNav />        
            <AppRoutes />
          </Router>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
