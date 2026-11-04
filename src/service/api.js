const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerCursos() {
    const response = await fetch(`${API_URL}/api/courses`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(
        data.message || 'No se pudieron obtener los cursos',
        );
    }

    return data;
    }
export async function obtenerProfesores() {
    const response = await fetch(
        `${API_URL}/api/teachers`,
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
        data.message ||
        'No se pudieron obtener los profesores',
        );
    }

    return data;
}

export async function iniciarSesion(email, password) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        email,
        password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
        data.message || 'No se pudo iniciar sesión',
        );
    }

    return data;
    }

    export async function registrarUsuario(name, email, password) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        name,
        email,
        password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
        data.message || 'No se pudo registrar el usuario',
        );
    }

    return data;
}

    export async function obtenerInscripciones(token) {
    const response = await fetch(
        `${API_URL}/api/enrollments`,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
        data.message ||
        'No se pudieron obtener las inscripciones',
        );
    }

    return data;
}

export async function obtenerUsuarios(token) {
    const response = await fetch(
        `${API_URL}/api/users`,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
        data.message ||
        'No se pudieron obtener los usuarios',
        );
    }

    return data;
}