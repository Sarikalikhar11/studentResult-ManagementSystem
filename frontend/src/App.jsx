import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Homepage from './components/HomePage';
import AdminDashboard from './components/pages/admin/AdminDashboard';
// import StudentDashboard from './pages/student/StudentDashboard';
// import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './components/LoginPage';
import AdminRegisterPage from './components/pages/admin/AdminRegister';
import ChooseUser from './components/ChooseUser';

const App = () => {
  const { currentRole } = useSelector((state) => state.user);

  return (
    <Router>
      {currentRole === null && (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route
            path="/chooseasguest"
            element={<ChooseUser visitor="guest" />}
          />

          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

          <Route path="/Adminregister" element={<AdminRegisterPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}

      {currentRole === 'Admin' && (
        <>
          <AdminDashboard />
        </>
      )}

      {currentRole === 'Student' && (
        <>
          <StudentDashboard />
        </>
      )}

      {currentRole === 'Teacher' && (
        <>
          <TeacherDashboard />
        </>
      )}
    </Router>
  );
};

export default App;
