import {
    useEffect,
    useState,
    } from 'react';

    import {
    actualizarCurso,
    crearCurso,
    eliminarCurso,
    obtenerCursos,
    obtenerProfesores,
    } from '../service/api.js';

    import CourseForm from '../components/CourseForm.jsx';
    import CourseList from '../components/CourseList.jsx';

    function Courses() {
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] =
        useState([]);

    const [courseToEdit, setCourseToEdit] =
        useState(null);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [cargando, setCargando] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    useEffect(() => {
        async function cargarDatos() {
        try {
            const coursesResult =
            await obtenerCursos();

            const teachersResult =
            await obtenerProfesores();

            setCourses(coursesResult.data);
            setTeachers(teachersResult.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
        }

        cargarDatos();
    }, []);

    async function guardarCurso(courseData) {
        setError('');
        setSuccess('');
        setSaving(true);

        try {
        const selectedTeacher =
            teachers.find(
            (teacher) =>
                teacher._id === courseData.teacher,
            );

        if (courseToEdit) {
            const result = await actualizarCurso(
            courseToEdit._id,
            courseData,
            );

            const updatedCourse = {
            ...result.data,
            teacher: selectedTeacher,
            };

            setCourses(
            courses.map((course) =>
                course._id === courseToEdit._id
                ? updatedCourse
                : course,
            ),
            );

            setSuccess(
            'Curso actualizado correctamente',
            );

            setCourseToEdit(null);

            return true;
        }

        const result =
            await crearCurso(courseData);

        const newCourse = {
            ...result.data,
            teacher: selectedTeacher,
        };

        setCourses([
            newCourse,
            ...courses,
        ]);

        setSuccess(
            'Curso registrado correctamente',
        );

        return true;
        } catch (error) {
        setError(error.message);
        return false;
        } finally {
        setSaving(false);
        }
    }

    function seleccionarCurso(course) {
        setError('');
        setSuccess('');
        setCourseToEdit(course);

        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
    }

    function cancelarEdicion() {
        setCourseToEdit(null);
        setError('');
        setSuccess('');
    }

    async function borrarCurso(course) {
        const confirmation = window.confirm(
        `¿Deseas eliminar el curso "${course.name}"?`,
        );

        if (!confirmation) {
        return;
        }

        setError('');
        setSuccess('');

        try {
        await eliminarCurso(course._id);

        setCourses(
            courses.filter(
            (item) => item._id !== course._id,
            ),
        );

        if (courseToEdit?._id === course._id) {
            setCourseToEdit(null);
        }

        setSuccess(
            'Curso eliminado correctamente',
        );
        } catch (error) {
        setError(error.message);
        }
    }

    return (
        <section
        aria-labelledby="courses-page-title"
        >
        <h2 id="courses-page-title">
            Gestión de cursos
        </h2>

        <p>
            Registra, consulta, edita y elimina
            los cursos de Academia Quanti.
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

        <CourseForm
            courseToEdit={courseToEdit}
            teachers={teachers}
            onSave={guardarCurso}
            onCancel={cancelarEdicion}
            saving={saving}
        />

        <hr />

        <h3>
            Cursos registrados
        </h3>

        {cargando ? (
            <p>Cargando cursos...</p>
        ) : (
            <>
            <p>
                Total de cursos: {courses.length}
            </p>

            {courses.length > 0 ? (
                <CourseList
                courses={courses}
                onEdit={seleccionarCurso}
                onDelete={borrarCurso}
                />
            ) : (
                <p>
                Todavía no hay cursos
                registrados.
                </p>
            )}
            </>
        )}
        </section>
    );
}

export default Courses;
