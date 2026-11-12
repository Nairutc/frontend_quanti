import { useState } from 'react';
import {
    Link,
    useNavigate,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        setError('');
        setCargando(true);

        try {
            const authenticatedUser =
            await login(email, password);

            if (authenticatedUser.role === 'admin') {
            navigate('/');
            } else if (
            authenticatedUser.role === 'teacher'
            ) {
            navigate('/teacher');
            } else {
            navigate('/student');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    }

    return (
        <section
        className="auth-page"
        aria-labelledby="login-title"
        >
        <div className="auth-card">
            <h2 id="login-title">
            Iniciar sesión
            </h2>

            <p>
            Ingresa tus credenciales para acceder
            al panel de Quanti.
            </p>

            <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="email">
                Correo electrónico
                </label>

                <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) =>
                    setEmail(event.target.value)
                }
                autoComplete="email"
                required
                />
            </div>

            <div className="form-field">
                <label htmlFor="password">
                Contraseña
                </label>

                <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) =>
                    setPassword(event.target.value)
                }
                autoComplete="current-password"
                required
                />
            </div>

            <button
                type="submit"
                disabled={cargando}
            >
                {cargando
                ? 'Ingresando...'
                : 'Ingresar'}
            </button>
            </form>


            <p className="auth-link">
                ¿Todavía no tienes una cuenta?{' '}
                <Link to="/register">
                    Regístrate
                </Link>
            </p>
            
            {error && (
            <p
                className="form-message form-message--error"
                role="alert"
            >
                {error}
            </p>
            )}
        </div>
        </section>
    );
}

export default Login;