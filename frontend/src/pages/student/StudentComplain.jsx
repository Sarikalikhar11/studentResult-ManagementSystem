import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';

const StudentComplain = () => {
  const [complaint, setComplaint] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();

  const { status, currentUser, error } = useSelector((state) => state.user);

  const user = currentUser._id;
  const school = currentUser.school._id;
  const address = 'Complain';

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const fields = {
    user,
    date,
    complaint,
    school,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      setLoader(false);
      setShowPopup(true);
      setMessage('Done Successfully');
    } else if (error) {
      setLoader(false);
      setShowPopup(true);
      setMessage('Network Error');
    }
  }, [status, error]);

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        <div className="max-w-md w-full px-4 py-12">
          <div>
            <h1 className="text-3xl font-bold mb-6">Complain</h1>
            <form onSubmit={submitHandler} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="complaint"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Write your complain
                  </label>
                  <textarea
                    id="complaint"
                    value={complaint}
                    onChange={(event) => setComplaint(event.target.value)}
                    required
                    rows="4"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <BlueButton
                fullWidth
                size="large"
                className="mt-4"
                type="submit"
                disabled={loader}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Add'
                )}
              </BlueButton>
            </form>
          </div>
        </div>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default StudentComplain;
