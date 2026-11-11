import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main className="access-page">
        <section
            className="access-card"
            aria-labelledby="not-found-title"
        >
            <p className="access-code">
            Error 404
            </p>

            <h1 id="not-found-title">
            Página no encontrada
            </h1>

            <p>
            La dirección solicitada no existe
            en Academia Quanti.
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

export default NotFound;