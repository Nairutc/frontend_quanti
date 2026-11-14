import {
  useEffect,
  useState,
} from 'react';

import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { obtenerMisCursosProfesor } from '../service/api.js';

function TeacherPanel() {
  const { user, logout } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarCursos() {
      try {
        const result =
          await obtenerMisCursosProfesor();

        setCourses(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    cargarCursos();
  }, []);

  return (
    <main className="role-panel">
      <header className="role-panel__header">
        <div>
          <p>Academia Quanti</p>

          <h1>Panel del profesor</h1>

          <p>
            Bienvenido, {user.name}.
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <Link
              className="btn btn-light"
              to="/profile"
          >
              Mi perfil
          </Link>

          <button
              type="button"
              onClick={logout}
          >
              Cerrar sesión
          </button>
        </div>
      </header>

      <section
        aria-labelledby="teacher-profile-title"
      >
        <h2 id="teacher-profile-title">
          Mi cuenta
        </h2>

        <dl>
          <div>
            <dt>Nombre</dt>
            <dd>{user.name}</dd>
          </div>

          <div>
            <dt>Rol</dt>
            <dd>Profesor</dd>
          </div>
        </dl>
      </section>

      <section
        aria-labelledby="teacher-courses-title"
      >
        <h2 id="teacher-courses-title">
          Mis cursos
        </h2>

        {loading ? (
          <p>Cargando cursos...</p>
        ) : error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : courses.length > 0 ? (
          <ul className="course-list">
            {courses.map((course) => (
              <li key={course._id}>
                <article className="course-card">
                  <h3>{course.name}</h3>

                  <p>{course.description}</p>

                  <dl>
                    <div>
                      <dt>Duración</dt>
                      <dd>{course.duration}</dd>
                    </div>

                    <div>
                      <dt>Modalidad</dt>
                      <dd>{course.modality}</dd>
                    </div>
                  </dl>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes cursos asignados.</p>
        )}
      </section>
    </main>
  );
}

export default TeacherPanel;
