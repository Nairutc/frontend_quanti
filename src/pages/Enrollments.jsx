import {
    useEffect,
    useState,
    } from 'react';

    import { obtenerInscripciones } from '../service/api.js';

    import EnrollmentTable from '../components/EnrollmentTable.jsx';

    function Enrollments() {
    const [enrollments, setEnrollments] =
        useState([]);

    const [error, setError] = useState('');
    const [cargando, setCargando] =
        useState(true);

    useEffect(() => {
        async function cargarInscripciones() {
        try {
            const result =
            await obtenerInscripciones();

            setEnrollments(result.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
        }

        cargarInscripciones();
    }, []);

    return (
        <section
        aria-labelledby="enrollments-title"
        >
        <h2 id="enrollments-title">
            Inscripciones
        </h2>

        <p>
            Consulta las solicitudes de inscripción
            registradas en la academia.
        </p>

        {cargando && (
            <p>Cargando inscripciones...</p>
        )}

        {error && (
            <p
            className="form-error"
            role="alert"
            >
            {error}
            </p>
        )}

        {!cargando && !error && (
            <>
            <p>
                Total de inscripciones:{' '}
                {enrollments.length}
            </p>

            <EnrollmentTable
                enrollments={enrollments}
            />
            </>
        )}
        </section>
    );
}

export default Enrollments;