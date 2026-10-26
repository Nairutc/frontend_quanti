function StatCard({ title, value, description }) {
    return (
        <article className="stat-card">
        <h3>{title}</h3>
        <p className="stat-card__value">{value}</p>
        <p>{description}</p>
        </article>
    );
}

export default StatCard;