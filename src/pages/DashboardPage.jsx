import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import Dashboard from '../components/Dashboard.jsx';
import Footer from '../components/Footer.jsx';

function DashboardPage() {
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
            <Dashboard />
            </main>

            <Footer />
        </div>
        </div>
    );
}

export default DashboardPage;