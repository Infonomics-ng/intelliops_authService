import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginR, logoutR } from '../../../store/reducers/authReducer'
import useBackendService from '../../config/services/server/backend-service'
import AdImages from '../../resources/adImages/adImages'
import logo1 from '../../resources/svgs/101.svg'

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logoutR())
  }, [])

  const { mutate, isLoading } = useBackendService('/auth/login', 'post', {
    onSuccess: (data) => {
      dispatch(loginR(response.data))
      logUserLogin(
        response.data?.user?.identity,
        'Login',
        response.data.status,
        ipAddress
      )
      toast.success('Login successfull')
      navigate('/')
    },
    onError: (error) => {
      const status = error.response.status
      if ([403, 401].includes(status)) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    }
  })

  const Auth = async (e) => {
    e.preventDefault()
    mutate(email, password)
  }

  return (
    <main className='bg-white'>
      <div className='relative md:flex'>
        <div className='md:w-1/2'>
          <div className='min-h-screen h-full flex flex-col after:flex-1'>
            <div className='flex-1'>
              <div className='flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8'>
                <Link className='block' to='/'>
                  <img src={logo1} alt='White' width='60px' />
                </Link>
              </div>
            </div>

            <div className='max-w-sm mx-auto px-4 py-8'>
              <h1 className='text-3xl text-gray-800 font-bold mb-6'>
                Welcome back!
              </h1>

              <form onSubmit={Auth}>
                <div className='space-y-4'>
                  <div>
                    <label
                      className='block text-sm font-medium mb-1'
                      htmlFor='email'
                    >
                      Email/Identity
                    </label>
                    <input
                      id='email'
                      className='form-input w-full'
                      type='text'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className='block text-sm font-medium mb-1'
                      htmlFor='password'
                    >
                      Password
                    </label>
                    <input
                      id='password'
                      className='form-input w-full'
                      type='password'
                      autoComplete='on'
                      placeholder='******'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className='flex items-center justify-between mt-6'>
                  <div className='mr-1'>
                    <Link
                      className='text-sm underline hover:no-underline'
                      to='/reset-password'
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button className='btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3'>
                    Sign In
                  </button>
                </div>
              </form>

              <div className='pt-5 mt-6 border-t border-gray-200'></div>
            </div>
          </div>
        </div>

        <div
          className='hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2'
          aria-hidden='true'
        >
          <AdImages />
        </div>
      </div>
    </main>
  )
}

export default Login
