function Sidebar() {
    const menuItems = [
        {
        id: 'dashboard',
        label: 'Dashboard',
        },
        {
        id: 'courses',
        label: 'Cursos',
        },
        {
        id: 'teachers',
        label: 'Profesores',
        },
        {
        id: 'enrollments',
        label: 'Inscripciones',
        },
        {
        id: 'users',
        label: 'Usuarios',
        },
    ];

    return (
        <aside className="sidebar">
        <div className="sidebar-brand">
            <img
            src="/logo-quanti.png"
            alt="Academia Quanti"
            />
        </div>

        <nav aria-label="Navegación principal">
            <ul>
            {menuItems.map((item) => (
                <li key={item.id}>
                <a href={`#${item.id}`}>
                    {item.label}
                </a>
                </li>
            ))}
            </ul>
        </nav>
        </aside>
    );
}

export default Sidebar;