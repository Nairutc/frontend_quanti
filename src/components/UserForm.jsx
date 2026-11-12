import {
  useEffect,
  useState,
} from 'react';

const initialUser = {
  name: '',
  email: '',
  password: '',
  role: 'student',
  active: true,
};

function UserForm({
  userToEdit,
  onSave,
  onCancel,
  saving,
}) {
  const [user, setUser] =
    useState(initialUser);

  useEffect(() => {
    if (userToEdit) {
      setUser({
        name: userToEdit.name || '',
        email: userToEdit.email || '',
        password: '',
        role:
          userToEdit.role || 'student',
        active:
          userToEdit.active ?? true,
      });
    } else {
      setUser(initialUser);
    }
  }, [userToEdit]);

  function handleChange(event) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setUser({
      ...user,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      name: user.name.trim(),
      email: user.email
        .trim()
        .toLowerCase(),
      role: user.role,
      active: user.active,
    };

    if (user.password) {
      userData.password = user.password;
    }

    const saved = await onSave(userData);

    if (saved && !userToEdit) {
      setUser(initialUser);
    }
  }

  return (
    <form
      className="user-form"
      onSubmit={handleSubmit}
    >
      <h3>
        {userToEdit
          ? 'Editar usuario'
          : 'Registrar usuario'}
      </h3>

      <div className="form-group">
        <label htmlFor="user-name">
          Nombre
        </label>

        <input
          id="user-name"
          name="name"
          type="text"
          value={user.name}
          onChange={handleChange}
          minLength="3"
          maxLength="50"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="user-email">
          Correo electrónico
        </label>

        <input
          id="user-email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="user-password">
          {userToEdit
            ? 'Nueva contraseña'
            : 'Contraseña'}
        </label>

        <input
          id="user-password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          minLength="4"
          required={!userToEdit}
        />

        {userToEdit && (
          <small>
            Déjala vacía para conservar la
            contraseña actual.
          </small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="user-role">
          Rol
        </label>

        <select
          id="user-role"
          name="role"
          value={user.role}
          onChange={handleChange}
          required
        >
          <option value="student">
            Estudiante
          </option>

          <option value="teacher">
            Profesor
          </option>

          <option value="admin">
            Administrador
          </option>
        </select>
      </div>

      <div className="form-check">
        <input
          id="user-active"
          name="active"
          type="checkbox"
          checked={user.active}
          onChange={handleChange}
        />

        <label htmlFor="user-active">
          Usuario activo
        </label>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={saving}
        >
          {saving
            ? 'Guardando...'
            : userToEdit
              ? 'Actualizar usuario'
              : 'Registrar usuario'}
        </button>

        {userToEdit && (
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;