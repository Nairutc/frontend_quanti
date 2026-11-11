import {
    Navigate,
    Outlet,
    } from 'react-router-dom';

    import { useAuth } from '../context/AuthContext.jsx';

    function RoleRoute({ rolesPermitidos }) {
    const { user, autenticado } = useAuth();

    // Primero comprobamos la autenticación.
    if (!autenticado) {
        return (
        <Navigate
            to="/login"
            replace
        />
        );
    }

    // Luego comprobamos la autorización.
    if (!rolesPermitidos.includes(user?.role)) {
        return (
        <Navigate
            to="/acceso-denegado"
            replace
        />
        );
    }

    return <Outlet />;
}

export default RoleRoute;