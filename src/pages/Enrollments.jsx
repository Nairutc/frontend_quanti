import {
  useEffect,
  useState,
} from 'react';

import {
  actualizarInscripcion,
  crearInscripcion,
  eliminarInscripcion,
  obtenerCursos,
  obtenerInscripciones,
} from '../service/api.js';

import EnrollmentForm from '../components/EnrollmentForm.jsx';
import EnrollmentTable from '../components/EnrollmentTable.jsx';

function Enrollments() {
  const [enrollments, setEnrollments] =
    useState([]);

  const [courses, setCourses] =
    useState([]);

  const [
    enrollmentToEdit,
    setEnrollmentToEdit,
  ] = useState(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [cargando, setCargando] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const enrollmentsResult =
          await obtenerInscripciones();

        const coursesResult =
          await obtenerCursos();

        setEnrollments(
          enrollmentsResult.data,
        );

        setCourses(coursesResult.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  async function guardarInscripcion(
    enrollmentData,
  ) {
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const selectedCourse = courses.find(
        (course) =>
          course._id === enrollmentData.course,
      );

      if (enrollmentToEdit) {
        const result =
          await actualizarInscripcion(
            enrollmentToEdit._id,
            enrollmentData,
          );

        const updatedEnrollment = {
          ...result.data,
          course: selectedCourse,
        };

        setEnrollments(
          enrollments.map((enrollment) =>
            enrollment._id ===
            enrollmentToEdit._id
              ? updatedEnrollment
              : enrollment,
          ),
        );

        setEnrollmentToEdit(null);

        setSuccess(
          'Inscripción actualizada correctamente',
        );

        return true;
      }

      const result =
        await crearInscripcion(
          enrollmentData,
        );

      const newEnrollment = {
        ...result.data,
        course: selectedCourse,
      };

      setEnrollments([
        newEnrollment,
        ...enrollments,
      ]);

      setSuccess(
        'Inscripción registrada correctamente',
      );

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setSaving(false);
    }
  }

  function seleccionarInscripcion(
    enrollment,
  ) {
    setError('');
    setSuccess('');
    setEnrollmentToEdit(enrollment);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function cancelarEdicion() {
    setEnrollmentToEdit(null);
    setError('');
    setSuccess('');
  }

  async function borrarInscripcion(
    enrollment,
  ) {
    const confirmation = window.confirm(
      `¿Deseas eliminar la inscripción de "${enrollment.studentName}"?`,
    );

    if (!confirmation) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      await eliminarInscripcion(
        enrollment._id,
      );

      setEnrollments(
        enrollments.filter(
          (item) =>
            item._id !== enrollment._id,
        ),
      );

      if (
        enrollmentToEdit?._id ===
        enrollment._id
      ) {
        setEnrollmentToEdit(null);
      }

      setSuccess(
        'Inscripción eliminada correctamente',
      );
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section
      aria-labelledby="enrollments-title"
    >
      <h2 id="enrollments-title">
        Gestión de inscripciones
      </h2>

      <p>
        Registra, consulta, edita y elimina
        las inscripciones de la academia.
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

      <EnrollmentForm
        enrollmentToEdit={
          enrollmentToEdit
        }
        courses={courses}
        onSave={guardarInscripcion}
        onCancel={cancelarEdicion}
        saving={saving}
      />

      <hr />

      <h3>Inscripciones registradas</h3>

      {cargando ? (
        <p>Cargando inscripciones...</p>
      ) : (
        <>
          <p>
            Total de inscripciones:{' '}
            {enrollments.length}
          </p>

          {enrollments.length > 0 ? (
            <EnrollmentTable
              enrollments={enrollments}
              onEdit={
                seleccionarInscripcion
              }
              onDelete={borrarInscripcion}
            />
          ) : (
            <p>
              Todavía no hay inscripciones
              registradas.
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default Enrollments;