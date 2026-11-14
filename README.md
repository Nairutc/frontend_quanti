# Frontend Quanti

Aplicación web desarrollada con React para la gestión de la Academia Quanti.

El frontend consume la API REST de Quanti y permite administrar usuarios, profesores, cursos e inscripciones.

## Integrantes

- Nairut Contreras
- Verónica Gallego

## Datos académicos

- Materia: Aplicaciones Híbridas
- Docente: Jonathan Emanuel Cruz
- Comisión: DWN4AV
- Año: 2026

## Funcionalidades

- Registro de usuarios.
- Inicio y cierre de sesión.
- Autenticación mediante JWT.
- Rutas protegidas.
- Acceso según el rol del usuario.
- Panel de administración.
- Panel de estudiantes.
- Panel de profesores.
- Gestión de usuarios.
- Gestión de profesores.
- Gestión de cursos.
- Gestión de inscripciones.
- Actualización de datos personales.
- Carga de foto de perfil.
- Validación de formularios.
- Manejo de mensajes de éxito y error.

## Roles

### Administrador

Puede administrar:

- Usuarios.
- Profesores.
- Cursos.
- Inscripciones.

### Profesor

Puede ingresar a su panel, consultar los cursos que tiene asignados y administrar los datos de su perfil.

### Estudiante

Puede ingresar a su panel, solicitar la inscripción a un curso, consultar sus cursos y administrar los datos de su perfil.

## Tecnologías utilizadas

- React
- Vite
- React Router
- Context API
- JavaScript
- Bootstrap
- CSS
- Fetch API
- JWT Decode

## Requisitos

Para ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm
- La API de Quanti en funcionamiento
- MongoDB en funcionamiento

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Nairutc/frontend_quanti.git
```

Ingresar a la carpeta del proyecto:

```bash
cd frontend_quanti
```

Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto. Se puede tomar como referencia el archivo `.env.example`:

```env
VITE_API_URL=http://localhost:3000
```

La dirección debe coincidir con la URL donde se esté ejecutando la API de Quanti.

## Ejecutar el proyecto

Primero se debe iniciar el backend de Quanti. Luego, desde la carpeta del frontend, ejecutar:

```bash
npm run dev
```

Vite mostrará la dirección local de la aplicación, normalmente:

```text
http://localhost:5173
```

## Comandos disponibles

```bash
npm run dev
```

Inicia el servidor de desarrollo.


## Estructura principal

```text
public/             Archivos públicos, logo y favicon
src/components/     Componentes reutilizables y formularios
src/context/        Estado global de autenticación
src/pages/          Páginas y paneles de la aplicación
src/service/        Funciones para consumir la API REST
src/App.jsx         Definición de rutas
src/main.jsx        Punto de entrada de React
```

## Rutas principales

### Rutas públicas

- `/login`: inicio de sesión.
- `/register`: registro de estudiantes.

### Rutas autenticadas

- `/profile`: consulta y actualización del perfil.
- `/student`: panel del estudiante.
- `/teacher`: panel del profesor.

### Rutas administrativas

- `/`: dashboard administrativo.
- `/courses`: gestión de cursos.
- `/teachers`: gestión de profesores.
- `/enrollments`: gestión de inscripciones.
- `/users`: gestión de usuarios.

Las rutas privadas requieren un token JWT y algunas también verifican el rol del usuario.

## Autenticación

Al iniciar sesión, el backend devuelve un token JWT. El frontend guarda el token en `sessionStorage`, recupera los datos del usuario y lo envía en las solicitudes privadas mediante el encabezado:

```http
Authorization: Bearer TOKEN
```

`AuthContext` administra la sesión y permite iniciar sesión, cerrar sesión y actualizar los datos visibles del usuario.

## Validaciones

Los formularios validan los datos antes de enviarlos a la API. Entre las principales comprobaciones se encuentran:

- Campos obligatorios.
- Longitud mínima del nombre y la contraseña.
- Formato del correo electrónico.
- Coincidencia de contraseñas durante el registro.
- Selección de cursos y profesores.
- Formato y tamaño de la foto de perfil.

El backend vuelve a validar la información recibida antes de guardarla en MongoDB.

## Backend

La API REST utilizada por este frontend está disponible en:

https://github.com/Nairutc/api_quanti

El backend debe estar en funcionamiento antes de iniciar las operaciones que consultan o modifican información.
