function TeacherCard({
  teacher,
  onEdit,
  onDelete,
}) {
  const showActions =
    Boolean(onEdit) || Boolean(onDelete);

  return (
    <article className="teacher-card">
      <h3>{teacher.name}</h3>

      <dl>
        <div>
          <dt>Correo</dt>
          <dd>{teacher.email}</dd>
        </div>

        <div>
          <dt>Especialidad</dt>
          <dd>{teacher.specialty}</dd>
        </div>
      </dl>

      {showActions && (
        <div className="card-actions">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(teacher)}
            >
              Editar
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              className="button-danger"
              onClick={() => onDelete(teacher)}
            >
              Eliminar
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export default TeacherCard;