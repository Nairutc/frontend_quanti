function UserTable({ users }) {
    if (users.length === 0) {
        return (
        <p>
            No hay usuarios registrados.
        </p>
        );
    }

    return (
        <div className="table-container">
        <table className="user-table">
            <caption>
            Usuarios registrados
            </caption>

            <thead>
            <tr>
                <th scope="col">
                Nombre
                </th>

                <th scope="col">
                Correo
                </th>

                <th scope="col">
                Rol
                </th>

                <th scope="col">
                Estado
                </th>
            </tr>
            </thead>

            <tbody>
            {users.map((user) => (
                <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                    <span className="user-role">
                    {user.role}
                    </span>
                </td>

                <td>
                    {user.active
                    ? 'Activo'
                    : 'Inactivo'}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default UserTable;