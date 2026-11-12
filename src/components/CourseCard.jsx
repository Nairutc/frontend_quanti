function CourseCard({
    course,
    onEdit,
    onDelete,
    }) {
    const teacherName =
        course.teacher?.name ||
        'Profesor no asignado';

    const showActions =
        Boolean(onEdit) || Boolean(onDelete);

    return (
        <article className="course-card">
        <h3>{course.name}</h3>

        <p>{course.description}</p>

        <dl>
            <div>
            <dt>Profesor</dt>
            <dd>{teacherName}</dd>
            </div>

            <div>
            <dt>Duración</dt>
            <dd>{course.duration}</dd>
            </div>

            <div>
            <dt>Modalidad</dt>
            <dd>{course.modality}</dd>
            </div>

            <div>
            <dt>Precio</dt>
            <dd>${course.price}</dd>
            </div>
        </dl>

        {showActions && (
            <div className="card-actions">
            {onEdit && (
                <button
                type="button"
                onClick={() => onEdit(course)}
                >
                Editar
                </button>
            )}

            {onDelete && (
                <button
                type="button"
                className="button-danger"
                onClick={() => onDelete(course)}
                >
                Eliminar
                </button>
            )}
            </div>
        )}
        </article>
    );
}

export default CourseCard;