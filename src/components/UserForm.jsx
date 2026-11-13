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
      className="card border-0 shadow-sm p-4 mb-4 user-form"
      onSubmit={handleSubmit}
    >
      <h3>
        {userToEdit
          ? 'Editar usuario'
          : 'Registrar usuario'}
      </h3>

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="user-name">
          Nombre
        </label>

        <input
          className="form-control"
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

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="user-email">
          Correo electrónico
        </label>

        <input
          className="form-control"
          id="user-email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="user-password">
          {userToEdit
            ? 'Nueva contraseña'
            : 'Contraseña'}
        </label>

        <input
          className="form-control"
          id="user-password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          minLength="4"
          required={!userToEdit}
        />

        {userToEdit && (
          <small className="form-text text-muted">
            Déjala vacía para conservar la
            contraseña actual.
          </small>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="user-role">
          Rol
        </label>

        <select
          className="form-select"
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

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          id="user-active"
          name="active"
          type="checkbox"
          checked={user.active}
          onChange={handleChange}
        />

        <label className="form-check-label" htmlFor="user-active">
          Usuario activo
        </label>
      </div>

      <div className="d-flex flex-wrap gap-2">
        <button
          className="btn btn-quanti"
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
            className="btn btn-outline-secondary"
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
