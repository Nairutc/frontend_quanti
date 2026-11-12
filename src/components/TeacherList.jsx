import TeacherCard from './TeacherCard.jsx';

function TeacherList({
  teachers,
  onEdit,
  onDelete,
}) {
  return (
    <ul className="teacher-list">
      {teachers.map((teacher) => (
        <li key={teacher._id}>
          <TeacherCard
            teacher={teacher}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}

export default TeacherList;