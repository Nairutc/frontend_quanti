import CourseCard from './CourseCard.jsx';

function CourseList({ courses }) {
    if (courses.length === 0) {
        return (
        <p>
            No hay cursos disponibles.
        </p>
        );
    }

    return (
        <ul className="course-list">
        {courses.map((course) => (
            <li key={course._id}>
            <CourseCard
                name={course.name}
                description={course.description}
                duration={course.duration}
                modality={course.modality}
                price={course.price}
                teacher={
                course.teacher?.name ??
                'Profesor no asignado'
                }
            />
            </li>
        ))}
        </ul>
    );
}

export default CourseList;