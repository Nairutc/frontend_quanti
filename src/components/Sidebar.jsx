import { Link } from 'react-router-dom';

function Sidebar() {
    const menuItems = [
        {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/',
        },
        {
        id: 'courses',
        label: 'Cursos',
        path: '/courses',
        },
        {
        id: 'teachers',
        label: 'Profesores',
        path: '/teachers',
        },
        {
        id: 'enrollments',
        label: 'Inscripciones',
        path: '/enrollments',
        },
        {
        id: 'users',
        label: 'Usuarios',
        path: '/users',
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
                <Link to={item.path}>
                    {item.label}
                </Link>
                </li>
            ))}
            </ul>
        </nav>
        </aside>
    );
}

export default Sidebar;