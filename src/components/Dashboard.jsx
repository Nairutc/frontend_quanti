import StatCard from './StatCard';
import CourseList from './CourseList';
import EnrollmentTable from './EnrollmentTable';

function Dashboard() {
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
        value: 8,
        description: 'Cursos disponibles',
        },
        {
        id: 4,
        title: 'Inscripciones',
        value: 31,
        description: 'Inscripciones registradas',
        },
    ];

    const courses = [
    {
        id: 1,
        name: 'React desde cero',
        description: 'Introducción al desarrollo de interfaces con React.',
        duration: '3 meses',
        modality: 'Virtual',
        price: 100,
        teacher: 'María Gómez',
    },
    {
        id: 2,
        name: 'Diseño UX/UI',
        description: 'Principios de diseño para productos digitales.',
        duration: '2 meses',
        modality: 'Virtual',
        price: 80,
        teacher: 'Carlos Pérez',
    },
    {
        id: 3,
        name: 'Node.js y APIs',
        description: 'Creación de APIs REST con Node.js y Express.',
        duration: '4 meses',
        modality: 'Presencial',
        price: 120,
        teacher: 'Laura Rodríguez',
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
        <h2 id="dashboard-title">Resumen de la academia</h2>

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
        <h2 id="courses-title">Cursos recientes</h2>
        <CourseList courses={courses} />
        </section>

        <section
        id="enrollments"
        aria-labelledby="enrollments-title"
        >
        <h2 id="enrollments-title">
            Inscripciones recientes
        </h2>

        <EnrollmentTable enrollments={enrollments} />
        </section>
    </>
);
}

export default Dashboard;