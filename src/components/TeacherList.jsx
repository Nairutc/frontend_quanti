import TeacherCard from './TeacherCard.jsx';

function TeacherList({ teachers }) {
    if (teachers.length === 0) {
        return (
        <p>
            No hay profesores registrados.
        </p>
        );
    }

    return (
        <ul className="teacher-list">
        {teachers.map((teacher) => (
            <li key={teacher._id}>
            <TeacherCard
                name={teacher.name}
                email={teacher.email}
                specialty={teacher.specialty}
            />
            </li>
        ))}
        </ul>
    );
}

export default TeacherList;