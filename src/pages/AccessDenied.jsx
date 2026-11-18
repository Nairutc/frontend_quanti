import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

function AccessDenied() {
    const { user } = useAuth();

    const homePath =
        user?.role === 'teacher'
            ? '/teacher'
            : user?.role === 'student'
                ? '/student'
                : '/';

    return (
        <main className="access-page">
            <section
                className="access-card"
                aria-labelledby="access-denied-title"
            >
                <p className="access-code">
                    Error 403
                </p>

                <h1 id="access-denied-title">
                    Acceso denegado
                </h1>

                <p>
                    No tienes permisos para acceder a esta
                    sección de Academia Quanti.
                </p>

                <Link
                    className="access-link"
                    to={homePath}
                >
                    Regresar a mi panel
                </Link>
            </section>
        </main>
    );
}

export default AccessDenied;