import { useState } from 'react';
import {
    Link,
    useNavigate,
} from 'react-router-dom';

import { registrarUsuario } from '../service/api.js';

function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;

        setUser({
        ...user,
        [name]: value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');

        if (user.name.trim().length < 3) {
        setError(
            'El nombre debe tener al menos 3 caracteres.',
        );
        return;
        }

        if (user.password.length < 4) {
        setError(
            'La contraseña debe tener al menos 4 caracteres.',
        );
        return;
        }

        if (
        user.password !== user.confirmPassword
        ) {
        setError(
            'Las contraseñas no coinciden.',
        );
        return;
        }

        setCargando(true);

        try {
        await registrarUsuario(
            user.name.trim(),
            user.email.trim(),
            user.password,
        );

        navigate('/login');
        } catch (error) {
        setError(error.message);
        } finally {
        setCargando(false);
        }
    }

    return (
        <section
        className="auth-page"
        aria-labelledby="register-title"
        >
        <div className="auth-card">
            <h2 id="register-title">
            Crear una cuenta
            </h2>

            <p>
            Completa tus datos para registrarte
            en Quanti.
            </p>

            <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="name">
                Nombre completo
                </label>

                <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                minLength="3"
                required
                />
            </div>

            <div className="form-field">
                <label htmlFor="email">
                Correo electrónico
                </label>

                <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
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
                value={user.password}
                onChange={handleChange}
                minLength="4"
                autoComplete="new-password"
                required
                />
            </div>

            <div className="form-field">
                <label htmlFor="confirmPassword">
                Repetir contraseña
                </label>

                <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                minLength="4"
                autoComplete="new-password"
                required
                />
            </div>

            <button
                type="submit"
                disabled={cargando}
            >
                {cargando
                ? 'Registrando...'
                : 'Registrarme'}
            </button>
            </form>

            <p className="auth-link">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login">
                    Inicia sesión
                </Link>
            </p>

            {error && (
            <p
                className="form-error"
                role="alert"
            >
                {error}
            </p>
            )}
        </div>
        </section>
    );
}

export default Register;