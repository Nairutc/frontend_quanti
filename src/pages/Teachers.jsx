import {
    useEffect,
    useState,
    } from 'react';

    import { obtenerProfesores } from '../service/api.js';
    import TeacherList from '../components/TeacherList.jsx';

    function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        async function cargarProfesores() {
        try {
            const result =
            await obtenerProfesores();

            setTeachers(result.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
        }

        cargarProfesores();
    }, []);

    return (
        <section
        aria-labelledby="teachers-title"
        >
        <h2 id="teachers-title">
            Profesores
        </h2>

        <p>
            Consulta los profesores registrados
            en la academia.
        </p>

        {cargando && (
            <p>Cargando profesores...</p>
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
                Total de profesores:{' '}
                {teachers.length}
            </p>

            <TeacherList
                teachers={teachers}
            />
            </>
        )}
        </section>
    );
}

export default Teachers;