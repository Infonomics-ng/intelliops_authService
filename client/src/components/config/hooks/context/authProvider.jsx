import React, { createContext, useContext } from 'react'
import { useSelector } from 'react-redux'

const AuthContext = createContext(undefined)

const AuthProvider = ({ children }) => {
  const { isAuthenticated, token, user } = useSelector((state) => state.auth)

  const value = {
    isAuthenticated,
    token,
    user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthProvider
