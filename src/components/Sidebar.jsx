import { NavLink } from 'react-router-dom';

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
        {
            id: 'profile',
            label: 'Mi perfil',
            path: '/profile',
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
                <NavLink
                    to={item.path}
                    end={item.path === '/'}
                >
                    {item.label}
                </NavLink>
                </li>
            ))}
            </ul>
        </nav>
        </aside>
    );
}

export default Sidebar;
