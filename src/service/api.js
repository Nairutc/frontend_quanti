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

export async function obtenerInscripciones() {
    return fetchPrivado('/api/enrollments');
}

export async function obtenerUsuarios() {
    return fetchPrivado('/api/users');
}

export async function crearCurso(course) {
    return fetchPrivado('/api/courses', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
    });
}

export async function actualizarCurso(
    id,
    course,
    ) {
    return fetchPrivado(
        `/api/courses/${id}`,
        {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
        },
    );
}

export async function eliminarCurso(id) {
    return fetchPrivado(
        `/api/courses/${id}`,
        {
        method: 'DELETE',
        },
    );
}

export async function crearProfesor(teacher) {
    return fetchPrivado('/api/teachers', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacher),
    });
    }

    export async function actualizarProfesor(
    id,
    teacher,
    ) {
    return fetchPrivado(
        `/api/teachers/${id}`,
        {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacher),
        },
    );
    }

export async function eliminarProfesor(id) {
    return fetchPrivado(
        `/api/teachers/${id}`,
        {
        method: 'DELETE',
        },
    );
}

export async function crearInscripcion(
  enrollment,
) {
  return fetchPrivado(
    '/api/enrollments',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrollment),
    },
  );
}

export async function actualizarInscripcion(
  id,
  enrollment,
) {
  return fetchPrivado(
    `/api/enrollments/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrollment),
    },
  );
}

export async function eliminarInscripcion(id) {
  return fetchPrivado(
    `/api/enrollments/${id}`,
    {
      method: 'DELETE',
    },
  );
}

export async function crearUsuario(user) {
  return fetchPrivado('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}

export async function actualizarUsuario(
  id,
  user,
) {
  return fetchPrivado(
    `/api/users/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  );
}

export async function eliminarUsuario(id) {
  return fetchPrivado(
    `/api/users/${id}`,
    {
      method: 'DELETE',
    },
  );
}

export async function obtenerPerfil() {
    return fetchPrivado(
        '/api/users/profile',
    );
}

export async function actualizarPerfil(
    profileData,
) {
    return fetchPrivado(
        '/api/users/profile',
        {
            method: 'PUT',
            headers: {
                'Content-Type':
                    'application/json',
            },
            body: JSON.stringify(
                profileData,
            ),
        },
    );
}

export async function subirImagenPerfil(
    imageFile,
) {
    const formData = new FormData();

    formData.append(
        'profileImage',
        imageFile,
    );

    return fetchPrivado(
        '/api/users/profile-image',
        {
            method: 'POST',
            body: formData,
        },
    );
}

export function obtenerUrlImagen(
    imagePath,
) {
    if (!imagePath) {
        return null;
    }

    return `${API_URL}${imagePath}`;
}

export async function fetchPrivado(
    endpoint,
    options = {},
    ) {
    const token = sessionStorage.getItem('token');

    if (!token) {
        throw new Error(
        'No existe una sesión activa',
        );
    }

    const headers = new Headers(
        options.headers || {},
    );

    headers.set(
        'Authorization',
        `Bearer ${token}`,
    );

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
        ...options,
        headers,
        },
    );

    const data = await response
        .json()
        .catch(() => null);

    if (response.status === 401) {
        throw new Error(
        'La sesión es inválida o expiró',
        );
    }

    if (response.status === 403) {
        throw new Error(
        'No tienes permisos para realizar esta acción',
        );
    }

    if (!response.ok) {
        throw new Error(
        data?.message || 'Error del servidor',
        );
    }

    return data;
}
