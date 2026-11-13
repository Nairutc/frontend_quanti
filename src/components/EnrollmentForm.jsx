import {
  useEffect,
  useState,
} from 'react';

const initialEnrollment = {
  studentName: '',
  studentEmail: '',
  course: '',
  status: 'pendiente',
};

function EnrollmentForm({
  enrollmentToEdit,
  courses,
  onSave,
  onCancel,
  saving,
}) {
  const [enrollment, setEnrollment] =
    useState(initialEnrollment);

  useEffect(() => {
    if (enrollmentToEdit) {
      setEnrollment({
        studentName:
          enrollmentToEdit.studentName || '',
        studentEmail:
          enrollmentToEdit.studentEmail || '',
        course:
          enrollmentToEdit.course?._id ||
          enrollmentToEdit.course ||
          '',
        status:
          enrollmentToEdit.status ||
          'pendiente',
      });
    } else {
      setEnrollment(initialEnrollment);
    }
  }, [enrollmentToEdit]);

  function handleChange(event) {
    const { name, value } = event.target;

    setEnrollment({
      ...enrollment,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const saved = await onSave({
      studentName:
        enrollment.studentName.trim(),
      studentEmail:
        enrollment.studentEmail
          .trim()
          .toLowerCase(),
      course: enrollment.course,
      status: enrollment.status,
    });

    if (saved && !enrollmentToEdit) {
      setEnrollment(initialEnrollment);
    }
  }

  return (
    <form
      className="card border-0 shadow-sm p-4 mb-4 enrollment-form"
      onSubmit={handleSubmit}
    >
      <h3>
        {enrollmentToEdit
          ? 'Editar inscripción'
          : 'Registrar inscripción'}
      </h3>

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="student-name">
          Nombre del estudiante
        </label>

        <input
          className="form-control"
          id="student-name"
          name="studentName"
          type="text"
          value={enrollment.studentName}
          onChange={handleChange}
          minLength="3"
          maxLength="50"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="student-email">
          Correo del estudiante
        </label>

        <input
          className="form-control"
          id="student-email"
          name="studentEmail"
          type="email"
          value={enrollment.studentEmail}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="enrollment-course">
          Curso
        </label>

        <select
          className="form-select"
          id="enrollment-course"
          name="course"
          value={enrollment.course}
          onChange={handleChange}
          required
        >
          <option value="">
            Selecciona un curso
          </option>

          {courses.map((course) => (
            <option
              key={course._id}
              value={course._id}
            >
              {course.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="enrollment-status">
          Estado
        </label>

        <select
          className="form-select"
          id="enrollment-status"
          name="status"
          value={enrollment.status}
          onChange={handleChange}
          required
        >
          <option value="pendiente">
            Pendiente
          </option>

          <option value="confirmada">
            Confirmada
          </option>

          <option value="cancelada">
            Cancelada
          </option>
        </select>
      </div>

      <div className="d-flex flex-wrap gap-2">
        <button
          className="btn btn-quanti"
          type="submit"
          disabled={saving}
        >
          {saving
            ? 'Guardando...'
            : enrollmentToEdit
              ? 'Actualizar inscripción'
              : 'Registrar inscripción'}
        </button>

        {enrollmentToEdit && (
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

export default EnrollmentForm;
