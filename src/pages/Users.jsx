import {
  useEffect,
  useState,
} from 'react';

import {
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario,
  obtenerUsuarios,
} from '../service/api.js';

import { useAuth } from '../context/AuthContext.jsx';

import UserForm from '../components/UserForm.jsx';
import UserTable from '../components/UserTable.jsx';

function Users() {
  const [users, setUsers] = useState([]);

  const [userToEdit, setUserToEdit] =
    useState(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [cargando, setCargando] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const { user: authenticatedUser } =
    useAuth();

  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const result =
          await obtenerUsuarios();

        setUsers(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    cargarUsuarios();
  }, []);

  async function guardarUsuario(userData) {
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      if (userToEdit) {
        const result =
          await actualizarUsuario(
            userToEdit._id,
            userData,
          );

        setUsers(
          users.map((user) =>
            user._id === userToEdit._id
              ? result.data
              : user,
          ),
        );

        setUserToEdit(null);

        setSuccess(
          'Usuario actualizado correctamente',
        );

        return true;
      }

      const result =
        await crearUsuario(userData);

      setUsers([
        result.data,
        ...users,
      ]);

      setSuccess(
        'Usuario registrado correctamente',
      );

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setSaving(false);
    }
  }

  function seleccionarUsuario(user) {
    setError('');
    setSuccess('');
    setUserToEdit(user);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function cancelarEdicion() {
    setUserToEdit(null);
    setError('');
    setSuccess('');
  }

  async function borrarUsuario(user) {
    if (
      user._id === authenticatedUser.id
    ) {
      setError(
        'No puedes eliminar tu propia cuenta mientras tienes la sesión iniciada',
      );

      return;
    }

    const confirmation = window.confirm(
      `¿Deseas eliminar al usuario "${user.name}"?`,
    );

    if (!confirmation) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      await eliminarUsuario(user._id);

      setUsers(
        users.filter(
          (item) => item._id !== user._id,
        ),
      );

      if (userToEdit?._id === user._id) {
        setUserToEdit(null);
      }

      setSuccess(
        'Usuario eliminado correctamente',
      );
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section aria-labelledby="users-title">
      <h2 id="users-title">
        Gestión de usuarios
      </h2>

      <p>
        Administra las cuentas y los roles
        de acceso a Academia Quanti.
      </p>

      {success && (
        <p
          className="form-success"
          role="status"
        >
          {success}
        </p>
      )}

      {error && (
        <p
          className="form-error"
          role="alert"
        >
          {error}
        </p>
      )}

      <UserForm
        userToEdit={userToEdit}
        onSave={guardarUsuario}
        onCancel={cancelarEdicion}
        saving={saving}
      />

      <hr />

      <h3>Usuarios registrados</h3>

      {cargando ? (
        <p>Cargando usuarios...</p>
      ) : (
        <>
          <p>
            Total de usuarios: {users.length}
          </p>

          {users.length > 0 ? (
            <UserTable
              users={users}
              currentUserId={
                authenticatedUser.id
              }
              onEdit={seleccionarUsuario}
              onDelete={borrarUsuario}
            />
          ) : (
            <p>
              Todavía no hay usuarios
              registrados.
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default Users;