import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import AdminLayout from './components/AdminLayout.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Courses from './pages/Courses.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Teachers from './pages/Teachers.jsx';
import Enrollments from './pages/Enrollments.jsx';
import Users from './pages/Users.jsx';

import './App.css';

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="courses"
            element={<Courses />}
          />

          <Route
            path="teachers"
            element={<Teachers />}
          />

          <Route
            path="enrollments"
            element={<Enrollments />}
          />

          <Route
            path="users"
            element={<Users />}
          />

        </Route>
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;