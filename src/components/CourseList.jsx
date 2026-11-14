import CourseCard from './CourseCard.jsx';

function CourseList({
    courses,
    onEdit,
    onDelete,
    headingLevel = 3,
    }) {
    return (
        <ul className="course-list">
        {courses.map((course) => (
            <li key={course._id}>
            <CourseCard
                course={course}
                onEdit={onEdit}
                onDelete={onDelete}
                headingLevel={headingLevel}
            />
            </li>
        ))}
    </ul>
    );
}

export default CourseList;
