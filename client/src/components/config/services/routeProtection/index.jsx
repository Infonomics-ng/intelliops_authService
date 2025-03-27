import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = ({
  isAuthenticated,
  redirectIfAuthenticated = false
}) => {
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to='/' state={{ from: location.pathname }} />
  }

  if (isAuthenticated && redirectIfAuthenticated) {
    return <Navigate to='/' />
  }

  return <Outlet />
}

export default ProtectedRoute
