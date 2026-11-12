import { useAuth } from '../context/AuthContext.jsx';

function TeacherPanel() {
  const { user, logout } = useAuth();

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

        <button
          type="button"
          onClick={logout}
        >
          Cerrar sesión
        </button>
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

        <p>
          Desde esta sección el profesor podrá
          consultar los cursos que tiene
          asignados.
        </p>
      </section>
    </main>
  );
}

export default TeacherPanel;