import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from '../assets/designlogin.jpg';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (role === 'Student') {
      const rollNum = event.target.rollNumber.value;
      const studentName = event.target.studentName.value;
      const password = event.target.password.value;

      if (!rollNum || !studentName || !password) {
        if (!rollNum) setRollNumberError(true);
        if (!studentName) setStudentNameError(true);
        if (!password) setPasswordError(true);
        return;
      }
      const fields = { rollNum, studentName, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;

      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }

      const fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'rollNumber') setRollNumberError(false);
    if (name === 'studentName') setStudentNameError(false);
  };

  const guestModeHandler = () => {
    const password = 'zxc';

    if (role === 'Admin') {
      const email = 'sarika@12';
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === 'Student') {
      const rollNum = '1';
      const studentName = 'Komal Khatik';
      const fields = { rollNum, studentName, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === 'Teacher') {
      const email = 'pratu@12';
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);

  return (
    <div className="flex items-center justify-between max-h-screen max-w-full mx-auto">
      <div className="flex max-w-full max-h-screen items-center justify-between bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <div className="max-w-md mx-auto w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
          <Typography
            variant="h4"
            className="text-2xl font-bold text-gray-800 mb-2"
          >
            {role} Login
          </Typography>
          <Typography variant="h7" className="text-gray-600">
            Welcome back! Please enter your details
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4 mx-auto">
            {role === 'Student' ? (
              <>
                <div className="relative">
                  <input
                    id="rollNumber"
                    name="rollNumber"
                    type="number"
                    placeholder="Enter your Roll Number"
                    className={`block w-full px-3 py-2 border ${
                      rollNumberError ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                    onChange={handleInputChange}
                  />
                  {rollNumberError && (
                    <p className="text-red-500 text-sm">
                      Roll Number is required
                    </p>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="studentName"
                    name="studentName"
                    type="text"
                    placeholder="Enter your name"
                    className={`block w-full px-3 py-2 border ${
                      studentNameError ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                    onChange={handleInputChange}
                  />
                  {studentNameError && (
                    <p className="text-red-500 text-sm">Name is required</p>
                  )}
                </div>
              </>
            ) : (
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`block w-full px-3 py-2 border ${
                    emailError ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                  onChange={handleInputChange}
                />
                {emailError && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}
              </div>
            )}
            <div className="relative">
              <input
                id="password"
                name="password"
                type={toggle ? 'text' : 'password'}
                placeholder="Password"
                className={`block w-full px-3 py-2 border ${
                  passwordError ? 'border-red-500' : 'border-gray-300'
                } rounded-md`}
                onChange={handleInputChange}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setToggle(!toggle)}
                  className="text-gray-500 "
                >
                  {toggle ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <Link
                to="#"
                className="text-[#d6140a] hover:underline hover:text-[#d6140a]"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4  text-white font-bold rounded-md flex items-center justify-center hover:bg-[#d6140a] bg-[#df5f5a]"
            >
              {loader ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Login'
              )}
            </button>
            <button
              type="button"
              onClick={guestModeHandler}
              className="w-full py-2 px-4 border border-[#df5f5a] text-black font-bold rounded-md hover:bg-[#df5f5a]"
            >
              Login as Guest
            </button>
            {role === 'Admin' && (
              <div className="flex items-center">
                <p className="text-gray-600">Don't have an account?</p>
                <Link
                  to="/Adminregister"
                  className="ml-2 text-[#d6140a] hover:underline hover:text-[#d6140a]"
                >
                  Sign up
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
      <div
        className="flex hidden md:flex bg-cover bg-center"
        style={{ backgroundImage: `url(${bgpic})` }}
      />
      <Backdrop open={guestLoader} className="flex items-center justify-center">
        <CircularProgress color="primary" />
        <span className="ml-2 text-white">Please Wait</span>
      </Backdrop>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default LoginPage;
