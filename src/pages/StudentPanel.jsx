import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

import {
    crearInscripcion,
    obtenerCursos,
    obtenerMisInscripciones,
} from '../service/api.js';

function StudentPanel() {
    const { user, logout } = useAuth();

    const [courses, setCourses] = useState([]);

    const [selectedCourse, setSelectedCourse] = useState('');

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');

    const [misInscripciones, setMisInscripciones] = useState([]);

    useEffect(() => {
        async function loadStudentData() {
            try {
                const coursesResult = await obtenerCursos();

                const enrollmentsResult = await obtenerMisInscripciones();

                setCourses(coursesResult.data);

                setMisInscripciones(enrollmentsResult.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadStudentData();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        setError('');
        setSuccess('');

        if (!selectedCourse) {
            setError('Debes seleccionar un curso.');
            return;
        }

        setSaving(true);

        try {
            const result = await crearInscripcion({
                course: selectedCourse,
            });

            const enrollmentsResult = await obtenerMisInscripciones();

            setMisInscripciones(enrollmentsResult.data);

            setSuccess(result.message);
            setSelectedCourse('');
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <main className="role-panel">
            <header className="role-panel__header">
                <div>
                    <p>Academia Quanti</p>

                    <h1>Panel del estudiante</h1>

                    <p>Bienvenido, {user.name}.</p>
                </div>

                <div className="d-flex flex-wrap gap-2">
                    <Link className="btn btn-light" to="/profile">
                        Mi perfil
                    </Link>

                    <button type="button" onClick={logout}>
                        Cerrar sesión
                    </button>
                </div>
            </header>

            <section aria-labelledby="student-profile-title">
                <h2 id="student-profile-title">Mi cuenta</h2>

                <dl>
                    <div>
                        <dt>Nombre</dt>
                        <dd>{user.name}</dd>
                    </div>

                    <div>
                        <dt>Rol</dt>
                        <dd>Estudiante</dd>
                    </div>
                </dl>
            </section>

            <section aria-labelledby="student-enrollment-title">
                <h2 id="student-enrollment-title">Inscribirme a un curso</h2>

                <p>Selecciona uno de los cursos disponibles en la academia.</p>

                <form
                    className="card border-0 shadow-sm p-4"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-3">
                        <label
                            className="form-label fw-semibold"
                            htmlFor="student-course"
                        >
                            Curso
                        </label>

                        <select
                            className="form-select"
                            id="student-course"
                            value={selectedCourse}
                            onChange={(event) =>
                                setSelectedCourse(event.target.value)
                            }
                            disabled={loading}
                            required
                        >
                            <option value="">
                                {loading
                                    ? 'Cargando cursos...'
                                    : 'Selecciona un curso'}
                            </option>

                            {courses.map((course) => (
                                <option key={course._id} value={course._id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button
                            className="btn btn-quanti"
                            type="submit"
                            disabled={saving || loading || !selectedCourse}
                        >
                            {saving
                                ? 'Enviando inscripción...'
                                : 'Solicitar inscripción'}
                        </button>
                    </div>
                </form>

                {success && (
                    <p className="form-success" role="status">
                        {success}
                    </p>
                )}

                {error && (
                    <p className="form-error" role="alert">
                        {error}
                    </p>
                )}
            </section>

            <section aria-labelledby="my-courses-title">
                <h2 id="my-courses-title">Mis cursos</h2>

                {loading ? (
                    <p>Cargando inscripciones...</p>
                ) : misInscripciones.length === 0 ? (
                    <p>Todavía no tienes inscripciones registradas.</p>
                ) : (
                    <ul className="course-list">
                        {misInscripciones.map((inscripcion) => (
                            <li key={inscripcion._id}>
                                <article className="course-card">
                                    <h3>
                                        {inscripcion.course?.name ||
                                            'Curso no disponible'}
                                    </h3>

                                    <p>{inscripcion.course?.description}</p>

                                    <dl>
                                        <div>
                                            <dt>Modalidad</dt>
                                            <dd>
                                                {inscripcion.course?.modality}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt>Duración</dt>
                                            <dd>
                                                {inscripcion.course?.duration}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt>Estado</dt>
                                            <dd>{inscripcion.status}</dd>
                                        </div>
                                    </dl>
                                </article>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}

export default StudentPanel;
