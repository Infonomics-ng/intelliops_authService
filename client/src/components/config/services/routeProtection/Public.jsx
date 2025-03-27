import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to='/' />
  }

  return <Outlet />
}

export default PublicRoute
