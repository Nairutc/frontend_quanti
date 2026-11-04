function EnrollmentTable({ enrollments }) {
    if (enrollments.length === 0) {
        return (
        <p>
            No hay inscripciones registradas.
        </p>
        );
    }

    return (
        <div className="table-container">
        <table className="enrollment-table">
            <caption>
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
                </tr>
                ),
            )}
            </tbody>
        </table>
        </div>
    );
}

export default EnrollmentTable;