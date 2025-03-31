import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import AdImages from '../adImages/adImages';
import AuthConnect from '../../../Auth';
import { useSelector } from 'react-redux';
import logo1 from '../../../images/101.svg';

function First() {
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const first = useSelector((state) => state.auth.user.user.identity);

  const Auth = async (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8 || confPassword.length < 8) {
      setError('Password should be at least 8 characters');
      return;
    }
    try {
      AuthConnect.post(`/first/`, {
        identity: first,
        newPassword: password,
      }).then((response) => {
        navigate('/login');
      });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
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
                  <img src={logo1} alt="mtn" width="60px" />{' '}
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-gray-800 font-bold mb-6">
                First Login{' '}
                <span className="text-sm text-red-200 font-medium">
                  Change your password <span className="text-rose-500">*</span>
                </span>
              </h1>
              <form>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <input
                      className="form-input w-full"
                      type="password"
                      autoComplete="on"
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <input
                      className="form-input w-full"
                      type="password"
                      autoComplete="on"
                      placeholder="******"
                      value={confPassword}
                      onFocus={(e) => setError('')}
                      onChange={(e) => setConfPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="error"> {error} </p>}
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link
                      className="text-sm underline hover:no-underline"
                      to="/login"
                    >
                      Back to Login
                    </Link>
                  </div>
                  <button
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                    onClick={Auth}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Image */}
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

export default First;
