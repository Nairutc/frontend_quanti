import {
  useEffect,
  useState,
} from 'react';

import {
  actualizarProfesor,
  crearProfesor,
  eliminarProfesor,
  obtenerProfesores,
} from '../service/api.js';

import TeacherForm from '../components/TeacherForm.jsx';
import TeacherList from '../components/TeacherList.jsx';

function Teachers() {
  const [teachers, setTeachers] =
    useState([]);

  const [teacherToEdit, setTeacherToEdit] =
    useState(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [cargando, setCargando] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    async function cargarProfesores() {
      try {
        const result =
          await obtenerProfesores();

        setTeachers(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    cargarProfesores();
  }, []);

  async function guardarProfesor(
    teacherData,
  ) {
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      if (teacherToEdit) {
        const result =
          await actualizarProfesor(
            teacherToEdit._id,
            teacherData,
          );

        setTeachers(
          teachers.map((teacher) =>
            teacher._id === teacherToEdit._id
              ? result.data
              : teacher,
          ),
        );

        setTeacherToEdit(null);

        setSuccess(
          'Profesor actualizado correctamente',
        );

        return true;
      }

      const result =
        await crearProfesor(teacherData);

      setTeachers([
        result.data,
        ...teachers,
      ]);

      setSuccess(
        'Profesor registrado correctamente',
      );

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setSaving(false);
    }
  }

  function seleccionarProfesor(teacher) {
    setError('');
    setSuccess('');
    setTeacherToEdit(teacher);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function cancelarEdicion() {
    setTeacherToEdit(null);
    setError('');
    setSuccess('');
  }

  async function borrarProfesor(teacher) {
    const confirmation = window.confirm(
      `¿Deseas eliminar al profesor "${teacher.name}"?`,
    );

    if (!confirmation) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      await eliminarProfesor(teacher._id);

      setTeachers(
        teachers.filter(
          (item) =>
            item._id !== teacher._id,
        ),
      );

      if (
        teacherToEdit?._id === teacher._id
      ) {
        setTeacherToEdit(null);
      }

      setSuccess(
        'Profesor eliminado correctamente',
      );
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section
      aria-labelledby="teachers-title"
    >
      <h2 id="teachers-title">
        Gestión de profesores
      </h2>

      <p>
        Registra, consulta, edita y elimina
        los profesores de Academia Quanti.
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

      <TeacherForm
        teacherToEdit={teacherToEdit}
        onSave={guardarProfesor}
        onCancel={cancelarEdicion}
        saving={saving}
      />

      <hr />

      <h3>Profesores registrados</h3>

      {cargando ? (
        <p>Cargando profesores...</p>
      ) : (
        <>
          <p>
            Total de profesores:{' '}
            {teachers.length}
          </p>

          {teachers.length > 0 ? (
            <TeacherList
              teachers={teachers}
              onEdit={seleccionarProfesor}
              onDelete={borrarProfesor}
            />
          ) : (
            <p>
              Todavía no hay profesores
              registrados.
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default Teachers;