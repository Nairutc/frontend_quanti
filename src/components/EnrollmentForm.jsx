import {
  useEffect,
  useState,
} from 'react';

const initialEnrollment = {
  student: '',
  course: '',
  status: 'pendiente',
};

function EnrollmentForm({
  enrollmentToEdit,
  courses,
  students,
  onSave,
  onCancel,
  saving,
}) {
  const [enrollment, setEnrollment] =
    useState(initialEnrollment);

  useEffect(() => {
    if (enrollmentToEdit) {
      setEnrollment({
        student:
          enrollmentToEdit.student?._id ||
          enrollmentToEdit.student ||
          '',
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
      student: enrollment.student,
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
        <label className="form-label fw-semibold" htmlFor="enrollment-student">
          Estudiante
        </label>

        <select
          className="form-select"
          id="enrollment-student"
          name="student"
          value={enrollment.student}
          onChange={handleChange}
          required
        >
          <option value="">
            Selecciona un estudiante
          </option>

          {students.map((student) => (
            <option
              key={student._id}
              value={student._id}
            >
              {student.name} ({student.email})
            </option>
          ))}
        </select>
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
