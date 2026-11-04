import {
    Outlet,
    useNavigate,
    } from 'react-router-dom';

    import { useAuth } from '../context/AuthContext.jsx';

    import Sidebar from './Sidebar.jsx';
    import Header from './Header.jsx';
    import Footer from './Footer.jsx';

    function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function cerrarSesion() {
        logout();
        navigate('/login');
    }

    return (
        <div className="app-shell">
        <Sidebar />

        <div className="app-page">
            <Header
            title="Panel administrativo"
            description="Gestión académica de Quanti"
            userName={user.name}
            onLogout={cerrarSesion}
            />

            <main>
            <Outlet />
            </main>

            <Footer />
        </div>
        </div>
    );
}

export default AdminLayout;