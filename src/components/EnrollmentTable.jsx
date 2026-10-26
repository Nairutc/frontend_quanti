function EnrollmentTable({ enrollments }) {
    return (
        <div className="table-container">
        <table className="enrollment-table">
            <caption>
            Últimas solicitudes recibidas
            </caption>

            <thead>
            <tr>
                <th scope="col">Estudiante</th>
                <th scope="col">Curso</th>
                <th scope="col">Estado</th>
            </tr>
            </thead>

            <tbody>
            {enrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                <td>{enrollment.student}</td>
                <td>{enrollment.course}</td>
                <td>
                    <span
                    className={`status status--${enrollment.status}`}
                    >
                    {enrollment.status}
                    </span>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default EnrollmentTable;