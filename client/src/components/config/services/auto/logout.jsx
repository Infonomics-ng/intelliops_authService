import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutR } from '../../../../store/reducers/authReducer'
import { useAuth } from '../../hooks/context/authProvider'

const AutoLogout = () => {
  const { isAuthenticated, token } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onlineCheckInterval = useRef(null)
  let inactivityTimer, awayTimer, visibilityTimer
  const lastInactiveTimestamp = useRef(Date.now())

  const resetTimers = () => {
    clearTimeout(inactivityTimer)
    clearTimeout(awayTimer)

    inactivityTimer = setTimeout(() => {
      handleLogout()
    }, 3 * 60 * 60 * 1000)

    awayTimer = setTimeout(() => {
      handleLogout()
    }, 3 * 60 * 60 * 1000)

    lastInactiveTimestamp.current = Date.now()
  }

  const checkOnlineStatus = () => {
    if (navigator.onLine) {
      localStorage.setItem('lastOnline', Date.now().toString())
    } else {
      const lastOnline = parseInt(localStorage.getItem('lastOnline'), 10)
      const offlineDuration = Date.now() - lastOnline

      if (offlineDuration >= 3 * 60 * 60 * 1000) {
        handleLogout()
      }
    }
  }

  const checkTokenOrCookie = () => {
    const tokenExists = token || document.cookie.includes('intelliops')
    if (!tokenExists) {
      handleLogout()
    }
  }

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      visibilityTimer = setTimeout(() => {
        handleLogout()
      }, 3 * 60 * 60 * 1000)
    } else {
      if (Date.now() - lastInactiveTimestamp.current >= 3 * 60 * 60 * 1000) {
        handleLogout()
      }
      clearTimeout(visibilityTimer)
    }
  }

  const handleLogout = () => {
    dispatch(logoutR())
    navigate('/')
  }

  useEffect(() => {
    if (isAuthenticated) {
      resetTimers()
      checkOnlineStatus()
      checkTokenOrCookie()

      onlineCheckInterval.current = setInterval(() => {
        checkOnlineStatus()
        checkTokenOrCookie()
      }, 60 * 1000)

      window.addEventListener('mousemove', resetTimers)
      window.addEventListener('keydown', resetTimers)
      window.addEventListener('mousedown', resetTimers)
      window.addEventListener('touchstart', resetTimers)
      document.addEventListener('visibilitychange', handleVisibilityChange)

      return () => {
        window.removeEventListener('mousemove', resetTimers)
        window.removeEventListener('keydown', resetTimers)
        window.removeEventListener('mousedown', resetTimers)
        window.removeEventListener('touchstart', resetTimers)
        document.removeEventListener('visibilitychange', handleVisibilityChange)

        clearTimeout(inactivityTimer)
        clearTimeout(awayTimer)
        if (onlineCheckInterval.current) {
          clearInterval(onlineCheckInterval.current)
        }
        clearTimeout(visibilityTimer)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, token])

  return null
}

export default AutoLogout
