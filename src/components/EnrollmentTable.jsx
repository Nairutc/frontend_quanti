function EnrollmentTable({
  enrollments,
  onEdit,
  onDelete,
}) {
  if (enrollments.length === 0) {
    return (
      <p>
        No hay inscripciones registradas.
      </p>
    );
  }

  const showActions =
    Boolean(onEdit) || Boolean(onDelete);

  return (
    <div className="table-container table-responsive shadow-sm">
      <table className="table table-hover align-middle mb-0 enrollment-table">
        <caption className="caption-top">
          Inscripciones registradas
        </caption>

        <thead>
          <tr>
            <th scope="col">
              Estudiante
            </th>

            <th scope="col">
              Correo
            </th>

            <th scope="col">
              Curso
            </th>

            <th scope="col">
              Estado
            </th>

            {showActions && (
              <th scope="col">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {enrollments.map(
            (enrollment) => (
              <tr key={enrollment._id}>
                <td>
                  {enrollment.studentName}
                </td>

                <td>
                  {enrollment.studentEmail}
                </td>

                <td>
                  {enrollment.course?.name ??
                    'Curso no disponible'}
                </td>

                <td>
                  <span
                    className={
                      `status status--${enrollment.status}`
                    }
                  >
                    {enrollment.status}
                  </span>
                </td>

                {showActions && (
                  <td>
                    <div className="table-actions">
                      {onEdit && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-quanti"
                          onClick={() =>
                            onEdit(enrollment)
                          }
                        >
                          Editar
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            onDelete(enrollment)
                          }
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EnrollmentTable;
