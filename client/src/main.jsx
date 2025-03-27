import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/configureStore.jsx';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
          <Router>
            <App />
          </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
