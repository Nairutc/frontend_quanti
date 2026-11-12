import {
  Route,
  Routes,
} from 'react-router-dom';

import AdminLayout from './components/AdminLayout.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RoleRoute from './components/RoleRoute.jsx';

import AccessDenied from './pages/AccessDenied.jsx';
import Courses from './pages/Courses.jsx';
import Enrollments from './pages/Enrollments.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import Register from './pages/Register.jsx';
import StudentPanel from './pages/StudentPanel.jsx';
import TeacherPanel from './pages/TeacherPanel.jsx';
import Teachers from './pages/Teachers.jsx';
import Users from './pages/Users.jsx';

import './App.css';

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Rutas para usuarios autenticados */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="acceso-denegado"
          element={<AccessDenied />}
        />

        {/* Rutas del administrador */}
        <Route
          element={
            <RoleRoute
              rolesPermitidos={['admin']}
            />
          }
        >
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

        {/* Ruta del profesor */}
        <Route
          element={
            <RoleRoute
              rolesPermitidos={['teacher']}
            />
          }
        >
          <Route
            path="teacher"
            element={<TeacherPanel />}
          />
        </Route>

        {/* Ruta del estudiante */}
        <Route
          element={
            <RoleRoute
              rolesPermitidos={['student']}
            />
          }
        >
          <Route
            path="student"
            element={<StudentPanel />}
          />
        </Route>
      </Route>

      {/* Cualquier dirección inexistente */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;