function UserTable({
  users,
  currentUserId,
  onEdit,
  onDelete,
}) {
  if (users.length === 0) {
    return (
      <p>
        No hay usuarios registrados.
      </p>
    );
  }

  const showActions =
    Boolean(onEdit) || Boolean(onDelete);

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

            {showActions && (
              <th scope="col">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const isCurrentUser =
              user._id === currentUserId;

            return (
              <tr key={user._id}>
                <td>
                  {user.name}

                  {isCurrentUser && (
                    <strong>
                      {' '}(Tu cuenta)
                    </strong>
                  )}
                </td>

                <td>{user.email}</td>

                <td>
                  <span className="user-role">
                    {user.role}
                  </span>
                </td>

                <td>
                  <span
                    className={
                      user.active
                        ? 'status status--confirmada'
                        : 'status status--cancelada'
                    }
                  >
                    {user.active
                      ? 'Activo'
                      : 'Inactivo'}
                  </span>
                </td>

                {showActions && (
                  <td>
                    <div className="table-actions">
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() =>
                            onEdit(user)
                          }
                        >
                          Editar
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          className="button-danger"
                          disabled={isCurrentUser}
                          title={
                            isCurrentUser
                              ? 'No puedes eliminar tu propia cuenta'
                              : 'Eliminar usuario'
                          }
                          onClick={() =>
                            onDelete(user)
                          }
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;