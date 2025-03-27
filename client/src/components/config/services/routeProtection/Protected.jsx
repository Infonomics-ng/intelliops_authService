import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
const ProtectedRoute = ({ isAuthenticated }) => {
  const location = useLocation()

  if (!isAuthenticated) {
    const previousPage = location.pathname
    return <Navigate to='/login' state={{ from: previousPage }} />
  }

  return <Outlet />
}

export default ProtectedRoute
