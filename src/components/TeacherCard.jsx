function TeacherCard({
    name,
    email,
    specialty,
    }) {
    return (
        <article className="teacher-card">
        <h3>{name}</h3>

        <dl>
            <div>
            <dt>Especialidad</dt>
            <dd>{specialty}</dd>
            </div>

            <div>
            <dt>Correo</dt>
            <dd>
                <a href={`mailto:${email}`}>
                {email}
                </a>
            </dd>
            </div>
        </dl>
        </article>
    );
}

export default TeacherCard;