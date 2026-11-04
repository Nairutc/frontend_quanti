import {
    useEffect,
    useState,
    } from 'react';

    import { obtenerCursos } from '../service/api.js';

    import StatCard from './StatCard.jsx';
    import CourseList from './CourseList.jsx';
    import EnrollmentTable from './EnrollmentTable.jsx';

    function Dashboard() {
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

    const stats = [
        {
        id: 1,
        title: 'Estudiantes',
        value: 24,
        description: 'Estudiantes activos',
        },
        {
        id: 2,
        title: 'Profesores',
        value: 6,
        description: 'Profesores registrados',
        },
        {
        id: 3,
        title: 'Cursos',
        value: courses.length,
        description: 'Cursos disponibles',
        },
        {
        id: 4,
        title: 'Inscripciones',
        value: 31,
        description: 'Inscripciones registradas',
        },
    ];

    const enrollments = [
        {
        id: 1,
        student: 'Ana Martínez',
        course: 'React desde cero',
        status: 'pendiente',
        },
        {
        id: 2,
        student: 'Luis Herrera',
        course: 'Node.js y APIs',
        status: 'confirmada',
        },
        {
        id: 3,
        student: 'Sofía Ramírez',
        course: 'Diseño UX/UI',
        status: 'cancelada',
        },
    ];

    return (
        <>
        <section
            id="dashboard"
            aria-labelledby="dashboard-title"
        >
            <h2 id="dashboard-title">
            Resumen de la academia
            </h2>

            <ul className="stats-grid">
            {stats.map((stat) => (
                <li key={stat.id}>
                <StatCard
                    title={stat.title}
                    value={stat.value}
                    description={stat.description}
                />
                </li>
            ))}
            </ul>
        </section>

        <section
            id="courses"
            aria-labelledby="courses-title"
        >
            <h2 id="courses-title">
            Cursos recientes
            </h2>

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
            <CourseList courses={courses} />
            )}
        </section>

        <section
            id="enrollments"
            aria-labelledby="enrollments-title"
        >
            <h2 id="enrollments-title">
            Inscripciones recientes
            </h2>

            <EnrollmentTable
            enrollments={enrollments}
            />
        </section>
        </>
    );
}

export default Dashboard;