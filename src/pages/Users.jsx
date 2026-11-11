import {
    useEffect,
    useState,
    } from 'react';

    import { obtenerUsuarios } from '../service/api.js';

    import UserTable from '../components/UserTable.jsx';

    function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [cargando, setCargando] =
        useState(true);


    useEffect(() => {
        async function cargarUsuarios() {
        try {
            const result =
            await obtenerUsuarios();

            setUsers(result.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
        }

        cargarUsuarios();
    }, []);

    return (
        <section
        aria-labelledby="users-title"
        >
        <h2 id="users-title">
            Usuarios
        </h2>

        <p>
            Consulta los usuarios registrados
            en la plataforma.
        </p>

        {cargando && (
            <p>Cargando usuarios...</p>
        )}

        {error && (
            <p
            className="form-error"
            role="alert"
            >
            {error}
            </p>
        )}

        {!cargando && !error && (
            <>
            <p>
                Total de usuarios:{' '}
                {users.length}
            </p>

            <UserTable users={users} />
            </>
        )}
        </section>
    );
}

export default Users;