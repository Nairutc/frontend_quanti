import {
    Link,
} from 'react-router-dom';

import {
    useAuth,
} from '../context/AuthContext.jsx';

function StudentPanel() {
    const {
        user,
        logout,
    } = useAuth();

    return (
        <main className="role-panel">
            <header className="role-panel__header">
                <div>
                    <p>Academia Quanti</p>

                    <h1>
                        Panel del estudiante
                    </h1>

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
                aria-labelledby="student-profile-title"
            >
                <h2 id="student-profile-title">
                    Mi cuenta
                </h2>

                <dl>
                    <div>
                        <dt>Nombre</dt>
                        <dd>{user.name}</dd>
                    </div>

                    <div>
                        <dt>Rol</dt>
                        <dd>Estudiante</dd>
                    </div>
                </dl>
            </section>

            <section
                aria-labelledby="student-courses-title"
            >
                <h2 id="student-courses-title">
                    Cursos disponibles
                </h2>

                <p>
                    Desde esta sección el
                    estudiante podrá consultar
                    la oferta académica y sus
                    inscripciones.
                </p>
            </section>
        </main>
    );
}

export default StudentPanel;