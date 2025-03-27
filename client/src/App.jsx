import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAuth } from './components/config/hooks/context/authProvider'
import ProtectedRoute from './components/config/services/routeProtection/Protected'
import PublicRoute from './components/config/services/routeProtection/Public'
import Login from './components/pages/Login/Login'

function App() {
  const { isAuthenticated } = useAuth()
  return (
    <>
      <ToastContainer
        position='top-right'
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/login' element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/' element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
