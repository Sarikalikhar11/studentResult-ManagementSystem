import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = 'zxc';

  const { status, currentUser, currentRole } = useSelector(
    (state) => state.user
  );

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const navigateHandler = (user) => {
    if (user === 'Admin') {
      if (visitor === 'guest') {
        const email = 'yogendra@12';
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === 'Student') {
      if (visitor === 'guest') {
        const rollNum = '1';
        const studentName = 'Dipesh Awasthi';
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === 'Teacher') {
      if (visitor === 'guest') {
        const email = 'tony@12';
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
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
    } else if (status === 'error') {
      setLoader(false);
      setMessage('Network Error');
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat p-8"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div
          className="p-6 text-center bg-[#1f1f38] text-white cursor-pointer rounded-md hover:bg-[#745135] transition duration-300"
          onClick={() => navigateHandler('Admin')}
        >
          <div className="mb-4 flex justify-center">
            <AccountCircle fontSize="large" className="text-white" />
          </div>
          <h2 className="mb-2 text-lg font-semibold">Admin</h2>
          <p className="text-gray-300">
            Login as an administrator to access the dashboard to manage app
            data.
          </p>
        </div>
        <div
          className="p-6 text-center bg-[#1f1f38] text-white cursor-pointer rounded-md hover:bg-[#745135] transition duration-300"
          onClick={() => navigateHandler('Student')}
        >
          <div className="mb-4 flex justify-center">
            <School fontSize="large" className="text-white" />
          </div>
          <h2 className="mb-2 text-lg font-semibold">Student</h2>
          <p className="text-gray-300">
            Login as a student to explore course materials and assignments.
          </p>
        </div>
        <div
          className="p-6 text-center bg-[#1f1f38] text-white cursor-pointer rounded-md hover:bg-[#745135] transition duration-300"
          onClick={() => navigateHandler('Teacher')}
        >
          <div className="mb-4 flex justify-center">
            <Group fontSize="large" className="text-white" />
          </div>
          <h2 className="mb-2 text-lg font-semibold">Teacher</h2>
          <p className="text-gray-300">
            Login as a teacher to create courses, assignments, and track student
            progress.
          </p>
        </div>
      </div>
      {loader && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <CircularProgress color="inherit" />
          <span className="text-white ml-4">Please Wait</span>
        </div>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default ChooseUser;
