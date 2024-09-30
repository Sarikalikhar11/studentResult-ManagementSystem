import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';

const Logout = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-purple-100 rounded-lg shadow-md">
      <h1 className="text-lg font-bold mb-4">{currentUser?.name}</h1>
      <p className="text-center mb-4 text-base">
        Are you sure you want to log out?
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-2 rounded-md mb-2 hover:bg-red-700 transition duration-300"
      >
        Log Out
      </button>
      <button
        onClick={handleCancel}
        className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition duration-300"
      >
        Cancel
      </button>
    </div>
  );
};

export default Logout;
