import {
    useEffect,
    useState,
    } from 'react';

    const initialTeacher = {
    name: '',
    email: '',
    specialty: '',
    };

    function TeacherForm({
    teacherToEdit,
    onSave,
    onCancel,
    saving,
    }) {
    const [teacher, setTeacher] =
        useState(initialTeacher);

    useEffect(() => {
        if (teacherToEdit) {
        setTeacher({
            name: teacherToEdit.name || '',
            email: teacherToEdit.email || '',
            specialty:
            teacherToEdit.specialty || '',
        });
        } else {
        setTeacher(initialTeacher);
        }
    }, [teacherToEdit]);

    function handleChange(event) {
        const { name, value } = event.target;

        setTeacher({
        ...teacher,
        [name]: value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const saved = await onSave({
        name: teacher.name.trim(),
        email: teacher.email
            .trim()
            .toLowerCase(),
        specialty:
            teacher.specialty.trim(),
        });

        if (saved && !teacherToEdit) {
        setTeacher(initialTeacher);
        }
    }

    return (
    <form
      className="card border-0 shadow-sm p-4 mb-4 teacher-form"
        onSubmit={handleSubmit}
        >
        <h3>
            {teacherToEdit
            ? 'Editar profesor'
            : 'Registrar profesor'}
        </h3>

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="teacher-name">
            Nombre
            </label>

        <input
          className="form-control"
            id="teacher-name"
            name="name"
            type="text"
            value={teacher.name}
            onChange={handleChange}
            minLength="3"
            maxLength="50"
            required
            />
        </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="teacher-email">
            Correo electrónico
            </label>

        <input
          className="form-control"
            id="teacher-email"
            name="email"
            type="email"
            value={teacher.email}
            onChange={handleChange}
            required
            />
        </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="teacher-specialty">
            Especialidad
            </label>

        <input
          className="form-control"
            id="teacher-specialty"
            name="specialty"
            type="text"
            value={teacher.specialty}
            onChange={handleChange}
            placeholder="Ejemplo: Desarrollo web"
            required
            />
        </div>

      <div className="d-flex flex-wrap gap-2">
        <button
          className="btn btn-quanti"
            type="submit"
            disabled={saving}
            >
            {saving
                ? 'Guardando...'
                : teacherToEdit
                ? 'Actualizar profesor'
                : 'Registrar profesor'}
            </button>

            {teacherToEdit && (
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

export default TeacherForm;
