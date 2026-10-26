function CourseCard({
    name,
    description,
    duration,
    modality,
    price,
    teacher,
}) {
    return (
        <article className="course-card">
        <h3>{name}</h3>
        <p>{description}</p>

        <dl>
            <div>
            <dt>Profesor</dt>
            <dd>{teacher}</dd>
            </div>

            <div>
            <dt>Duración</dt>
            <dd>{duration}</dd>
            </div>

            <div>
            <dt>Modalidad</dt>
            <dd>{modality}</dd>
            </div>

            <div>
            <dt>Precio</dt>
            <dd>${price}</dd>
            </div>
        </dl>
        </article>
    );
}

export default CourseCard;