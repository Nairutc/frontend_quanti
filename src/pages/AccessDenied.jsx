import {
    Link,
    } from 'react-router-dom';

    function AccessDenied() {
    return (
        <main className="access-page">
        <section
            className="access-card"
            aria-labelledby="access-denied-title"
        >
            <p className="access-code">Error 403</p>

            <h1 id="access-denied-title">
            Acceso denegado
            </h1>

            <p>
            No tienes permisos para acceder a esta
            sección de Academia Quanti.
            </p>

            <Link
            className="access-link"
            to="/"
            >
            Regresar al inicio
            </Link>
        </section>
        </main>
    );
}

export default AccessDenied;