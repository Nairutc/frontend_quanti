import CourseCard from './CourseCard.jsx';

function CourseList({
    courses,
    onEdit,
    onDelete,
    }) {
    return (
        <ul className="course-list">
        {courses.map((course) => (
            <li key={course._id}>
            <CourseCard
                course={course}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            </li>
        ))}
    </ul>
    );
}

export default CourseList;