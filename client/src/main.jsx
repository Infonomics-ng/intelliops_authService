import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import AuthProvider from './components/config/hooks/context/authProvider.jsx'
import QueryProvider from './components/config/hooks/providers/query-provider.jsx'
import AutoLogout from './components/config/services/auto/logout.jsx'
import './components/resources/css/style.css'
import { persistor, store } from './store/configureStore.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <Router>
          <AuthProvider>
            <QueryProvider>
              <AutoLogout />
              <App />
            </QueryProvider>
          </AuthProvider>
        </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
)
