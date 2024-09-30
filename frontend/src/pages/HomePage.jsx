import { Link } from 'react-router-dom';
import Students from '../assets/students.png';
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="flex">
          <img src={Students} alt="students" className="w-full" />
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Welcome to
            <br />
            School Management
            <br />
            System
          </h1>
          <p className="text-center text-gray-600 mt-6 mb-6">
            Streamline school management, class organization, and add students
            and faculty. Seamlessly track attendance, assess performance, and
            provide feedback. Access records, view marks, and communicate
            effortlessly.
          </p>
          <div className="flex flex-col items-center w-full">
            <Link
              to="/choose"
              className="flex w-1/2 items-center justify-center"
            >
              <LightPurpleButton variant="contained" className="w-1/2">
                Login
              </LightPurpleButton>
            </Link>
            <Link
              to="/chooseasguest"
              className="flex w-1/2 items-center justify-center"
            >
              <button className="mt-4 mb-6 w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-2 transition-all duration-300">
                Login as Guest
              </button>
            </Link>
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/Adminregister" className="text-red-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
