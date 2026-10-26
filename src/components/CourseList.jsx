import CourseCard from './CourseCard';

function CourseList({ courses }) {
    return (
        <ul className="course-list">
        {courses.map((course) => (
            <li key={course.id}>
            <CourseCard
                name={course.name}
                description={course.description}
                duration={course.duration}
                modality={course.modality}
                price={course.price}
                teacher={course.teacher}
            />
            </li>
        ))}
        </ul>
    );
}

export default CourseList;