import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './style.css';
import AdImages from '../adImages/adImages';
import AuthConnect from '../../../Auth';
import logo1 from '../../../images/101.svg';

function NewPassword() {
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      AuthConnect.post(`/newPassword/${token}`, {
        password: password,
        confPassword: confPassword,
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
                Reset your Password
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
                      id="password"
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
                      id="password"
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
                <div className="flex justify-end mt-6">
                  <button
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
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

export default NewPassword;
