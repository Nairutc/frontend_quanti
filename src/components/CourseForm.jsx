import {
    useEffect,
    useState,
} from 'react';

const initialCourse = {
    name: '',
    description: '',
    duration: '',
    modality: 'Virtual',
    price: '',
    teacher: '',
};

function CourseForm({
    courseToEdit,
    teachers,
    onSave,
    onCancel,
    saving,
}) {
    const [course, setCourse] =
    useState(initialCourse);

useEffect(() => {
    if (courseToEdit) {
        setCourse({
            name: courseToEdit.name || '',
            description:
            courseToEdit.description || '',
            duration: courseToEdit.duration || '',
            modality:
            courseToEdit.modality || 'Virtual',
            price: courseToEdit.price ?? '',
            teacher:
            courseToEdit.teacher?._id ||
            courseToEdit.teacher ||
            '',
        });
        } else {
        setCourse(initialCourse);
        }
    }, [courseToEdit]);

function handleChange(event) {
        const { name, value } = event.target;

        setCourse({
        ...course,
        [name]: value,
        });
    }

async function handleSubmit(event) {
    event.preventDefault();

    const saved = await onSave({
        ...course,
        price: Number(course.price),
    });

    if (saved && !courseToEdit) {
        setCourse(initialCourse);
    }
}

    return (
        <form
        className="course-form"
        onSubmit={handleSubmit}
        >
        <h3>
            {courseToEdit
            ? 'Editar curso'
            : 'Registrar curso'}
        </h3>

        <div className="form-group">
            <label htmlFor="course-name">
            Nombre
            </label>

            <input
            id="course-name"
            name="name"
            type="text"
            value={course.name}
            onChange={handleChange}
            minLength="3"
            maxLength="50"
            required
            />
        </div>

        <div className="form-group">
            <label htmlFor="course-description">
            Descripción
            </label>

            <textarea
            id="course-description"
            name="description"
            value={course.description}
            onChange={handleChange}
            rows="4"
            required
            />
        </div>

        <div className="form-group">
            <label htmlFor="course-duration">
            Duración
            </label>

            <input
            id="course-duration"
            name="duration"
            type="text"
            value={course.duration}
            onChange={handleChange}
            placeholder="Ejemplo: 3 meses"
            required
            />
        </div>

        <div className="form-group">
            <label htmlFor="course-modality">
            Modalidad
            </label>

            <select
            id="course-modality"
            name="modality"
            value={course.modality}
            onChange={handleChange}
            required
            >
            <option value="Virtual">
                Virtual
            </option>

            <option value="Presencial">
                Presencial
            </option>
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="course-price">
            Precio
            </label>

            <input
            id="course-price"
            name="price"
            type="number"
            value={course.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            />
        </div>

        <div className="form-group">
            <label htmlFor="course-teacher">
            Profesor
            </label>

            <select
            id="course-teacher"
            name="teacher"
            value={course.teacher}
            onChange={handleChange}
            required
            >
            <option value="">
                Selecciona un profesor
            </option>

            {teachers.map((teacher) => (
                <option
                key={teacher._id}
                value={teacher._id}
                >
                {teacher.name} —{' '}
                {teacher.specialty}
                </option>
            ))}
            </select>
        </div>

        <div className="form-actions">
            <button
            type="submit"
            disabled={saving}
            >
            {saving
                ? 'Guardando...'
                : courseToEdit
                ? 'Actualizar curso'
                : 'Crear curso'}
            </button>

            {courseToEdit && (
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

export default CourseForm;