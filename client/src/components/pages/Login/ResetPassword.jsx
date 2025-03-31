import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import Appconfig from '../../../Appconfig';
import './style.css';
import AdImages from '../adImages/adImages';
import AuthConnect from '../../../Auth';
import logo1 from '../../../images/101.svg';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');

  const Auth = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      AuthConnect.post('/forgotpassword', { email: email }).then((response) => {
        setLoading('');
        if (response.data.status === 'success') {
          setSuccess('Reset link sent to email');
        }
      });
    } catch (error) {
      if (error.response) {
        setLoading('');

        setError(error.response.data.message);
      }
    }
  };

  return (
    <main className="bg-white">
      <div className="relative md:flex">
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <Link className="block" to="/">
                  <img src={logo1} alt="mtn" width="60px" />
                </Link>
              </div>
            </div>
            {success ? (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">{success}</Alert>
                <Link
                  to="/login"
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  Back to Login
                </Link>
              </Stack>
            ) : (
              <div className="max-w-sm mx-auto px-4 py-8">
                <h1 className="text-3xl text-gray-800 font-bold mb-6">
                  Reset your Password
                </h1>
                <form>
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        className="form-input w-full"
                        type="email"
                        value={email}
                        onFocus={(e) => setError('')}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {error && <p className="error"> {error} </p>}
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    {loading ? (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <button
                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
                        onClick={Auth}
                      >
                        Send Reset Link
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
          aria-hidden="true"
        >
          <AdImages />
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
