import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Checkbox,
  FormControlLabel,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from '../../assets/designlogin.jpg';
import { registerUser } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';

const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const role = 'Admin';

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.adminName.value;
    const schoolName = event.target.schoolName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!name || !schoolName || !email || !password) {
      if (!name) setAdminNameError(true);
      if (!schoolName) setSchoolNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    const fields = { name, email, password, role, schoolName };
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'adminName') setAdminNameError(false);
    if (name === 'schoolName') setSchoolNameError(false);
  };

  useEffect(() => {
    if (
      status === 'success' ||
      (currentUser !== null && currentRole === 'Admin')
    ) {
      navigate('/Admin/dashboard');
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      console.log(error);
    }
  }, [status, currentUser, currentRole, navigate, error, response]);

  return (
    <div className="flex items-center justify-between max-h-screen max-w-full mx-auto">
      {/* Left side: Form Section */}
      <div className="lex max-w-full max-h-screen items-center justify-between bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <div className="max-w-md mx-auto w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Admin Register
          </h1>
          <p className="text-sm text-center text-gray-600 mb-6">
            Create your own school by registering as an admin.
            <br />
            You will be able to add students and faculty and manage the system.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="adminName"
              label="Enter your name"
              name="adminName"
              autoComplete="name"
              autoFocus
              error={adminNameError}
              helperText={adminNameError && 'Name is required'}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="schoolName"
              label="Create your school name"
              name="schoolName"
              autoComplete="off"
              error={schoolNameError}
              helperText={schoolNameError && 'School name is required'}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your email"
              name="email"
              autoComplete="email"
              error={emailError}
              helperText={emailError && 'Email is required'}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={toggle ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              error={passwordError}
              helperText={passwordError && 'Password is required'}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setToggle(!toggle)}>
                      {toggle ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className="flex items-center justify-between">
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white py-2 px-4 rounded  focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-center hover:bg-[#d6140a] bg-[#df5f5a]"
            >
              {loader ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Register'
              )}
            </button>
            <div className="flex items-center justify-center">
              <p className="text-sm text-gray-600">Already have an account?</p>
              <Link
                to="/Adminlogin"
                className="text-[#d6140a] hover:text-[#d6140a] hover:underline ml-2"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side: Image Section */}
      <div
        className="flex hidden md:flex bg-cover bg-center"
        style={{ backgroundImage: `url(${bgpic})` }}
      />

      {/* Popup Component */}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default AdminRegisterPage;
