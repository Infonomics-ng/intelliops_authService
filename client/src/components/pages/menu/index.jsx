import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../config/hooks/context/authProvider'
import mtn from '../../resources/images/mtn.png'

const Menu = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const moduleUrls = import.meta.env.VITE_MODULE_URLS
    ? JSON.parse(import.meta.env.VITE_MODULE_URLS)
    : {}

  useEffect(() => {
    if (user.firstTime === 1) {
      navigate('/firsttime')
    } else if (!user.userModules || user.userModules.length === 0) {
      navigate('/no_module')
    } else if (user.userModules.length === 1) {
      const moduleCode = user.userModules[0].modulecd
      if (moduleUrls[moduleCode]) {
        window.location.href = moduleUrls[moduleCode]
      }
    }
  }, [user, navigate, moduleUrls])

  if (user.userModules.length > 1) {
    return (
      <main>
        <div
          style={{
            backgroundImage: `url(${mtn})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          className='min-h-screen py-12 bg-gray-100'
        >
          <section>
            <h1 className='text-4xl font-extrabold text-center text-white'>
              Welcome to Intelliops
            </h1>
            <br />
            <h2 className='text-4xl font-extrabold text-center text-white'>
              Please select a Module
            </h2>
            <div className='content-center lg:flex lg:justify-center lg:items-center'>
              {user.userModules.map((module, index) => (
                <div
                  key={module.modulecd}
                  className='shadow cursor-pointer'
                  onClick={() =>
                    (window.location.href = moduleUrls[module.modulecd] || '/')
                  }
                >
                  <div className='flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8'>
                    <div className='relative w-64 h-48'>
                      <div className='absolute top-0 left-0 flex items-center w-64 h-40 mt-6 ml-6 bg-white border-8 border-gray-700 border-solid rounded-lg'>
                        <div className='w-1/3 h-40'></div>
                        <div className='w-2/3 h-32 pr-4'>
                          <h3 className='pt-1 text-xl font-semibold text-gray-700'>
                            {module.module_name}
                          </h3>
                        </div>
                      </div>
                      <div className='absolute top-0 left-0 z-20 w-12 h-12 mt-6 ml-6 bg-white rounded-full'>
                        <svg
                          className='mt-2 ml-2'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='#FFCB05'
                          width='32px'
                          height='32px'
                        >
                          <path d='M0 0h24v24H0z' fill='none' />
                          <path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' />
                        </svg>
                      </div>
                      <div className='absolute top-0 left-0 z-10 w-24 h-40 py-20 text-5xl font-bold text-center text-white bg-[#FFCB05] rounded-lg'>
                        {index}
                      </div>
                      <div className='absolute top-0 left-0 z-30 w-24 h-2 mt-40 ml-48 bg-[#FFCB05]'></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    )
  }

  return null
}

export default Menu
