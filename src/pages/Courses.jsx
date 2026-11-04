import {
    useEffect,
    useState,
    } from 'react';

    import { obtenerCursos } from '../service/api.js';
    import CourseList from '../components/CourseList.jsx';

    function Courses() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        async function cargarCursos() {
        try {
            const result = await obtenerCursos();
            setCourses(result.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
        }

        cargarCursos();
    }, []);

    return (
        <section
        aria-labelledby="courses-page-title"
        >
        <h2 id="courses-page-title">
            Cursos
        </h2>

        <p>
            Consulta los cursos disponibles
            en Academia Quanti.
        </p>

        {cargando && (
            <p>Cargando cursos...</p>
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
                Total de cursos: {courses.length}
            </p>

            <CourseList courses={courses} />
            </>
        )}
        </section>
    );
}

export default Courses;