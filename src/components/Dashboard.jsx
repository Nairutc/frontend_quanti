import {
    useEffect,
    useState,
    } from 'react';

    import {
    obtenerCursos,
    obtenerProfesores,
    obtenerInscripciones,
    obtenerUsuarios,
    } from '../service/api.js';

import CourseList from './CourseList.jsx';
import EnrollmentTable from './EnrollmentTable.jsx';
import StatCard from './StatCard.jsx';

function Dashboard() {
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [enrollments, setEnrollments] =
        useState([]);
    const [users, setUsers] = useState([]);

    const [error, setError] = useState('');
    const [cargando, setCargando] =
        useState(true);

useEffect(() => {
        async function cargarDashboard() {
        try {
            setError('');

            const coursesResult =
            await obtenerCursos();

            const teachersResult =
            await obtenerProfesores();

            const enrollmentsResult =
            await obtenerInscripciones();

            const usersResult =
            await obtenerUsuarios();

            setCourses(coursesResult.data);
            setTeachers(teachersResult.data);
            setEnrollments(enrollmentsResult.data);
            setUsers(usersResult.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
        }

        cargarDashboard();
    }, []);

    const students = users.filter(
        (user) => user.role === 'student',
    );

    const stats = [
        {
        id: 1,
        title: 'Estudiantes',
        value: students.length,
        description: 'Estudiantes activos',
        },
        {
        id: 2,
        title: 'Profesores',
        value: teachers.length,
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
        value: enrollments.length,
        description: 'Inscripciones registradas',
        },
    ];

    const recentCourses = courses.slice(0, 3);

    const recentEnrollments =
        enrollments.slice(0, 5);

    if (cargando) {
        return (
        <section aria-live="polite">
            <h2>Cargando panel administrativo...</h2>

            <p>
            Estamos consultando los datos de la
            academia.
            </p>
        </section>
        );
    }

    if (error) {
        return (
        <section
            className="form-error"
            role="alert"
        >
            <h2>No se pudo cargar el dashboard</h2>

            <p>{error}</p>
        </section>
        );
    }

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

            {recentCourses.length > 0 ? (
            <CourseList
                courses={recentCourses}
            />
            ) : (
            <p>
                Todavía no hay cursos registrados.
            </p>
            )}
        </section>

        <section
            id="enrollments"
            aria-labelledby="enrollments-title"
        >
            <h2 id="enrollments-title">
            Inscripciones recientes
            </h2>

            {recentEnrollments.length > 0 ? (
            <EnrollmentTable
                enrollments={recentEnrollments}
            />
            ) : (
            <p>
                Todavía no hay inscripciones
                registradas.
            </p>
            )}
        </section>
        </>
    );
}

export default Dashboard;