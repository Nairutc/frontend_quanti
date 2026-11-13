import {
    useEffect,
    useState,
} from 'react';

const initialProfile = {
    name: '',
    email: '',
    password: '',
};

function ProfileForm({
    profile,
    onSave,
    saving,
}) {
    const [profileData, setProfileData] =
        useState(initialProfile);

    useEffect(() => {
        if (profile) {
            setProfileData({
                name: profile.name || '',
                email: profile.email || '',
                password: '',
            });
        }
    }, [profile]);

    function handleChange(event) {
        const { name, value } =
            event.target;

        setProfileData({
            ...profileData,
            [name]: value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const data = {
            name: profileData.name.trim(),
            email: profileData.email
                .trim()
                .toLowerCase(),
        };

        if (profileData.password) {
            data.password =
                profileData.password;
        }

        const saved = await onSave(data);

        if (saved) {
            setProfileData({
                ...profileData,
                password: '',
            });
        }
    }

    return (
        <form
            className="card border-0 shadow-sm p-4 profile-form"
            onSubmit={handleSubmit}
        >
            <h2>Datos personales</h2>

            <p>
                Actualiza la información de tu
                cuenta.
            </p>

            <div className="mb-3">
                <label
                    className="form-label fw-semibold"
                    htmlFor="profile-name"
                >
                    Nombre
                </label>

                <input
                    className="form-control"
                    id="profile-name"
                    name="name"
                    type="text"
                    value={profileData.name}
                    onChange={handleChange}
                    minLength="3"
                    maxLength="50"
                    required
                />
            </div>

            <div className="mb-3">
                <label
                    className="form-label fw-semibold"
                    htmlFor="profile-email"
                >
                    Correo electrónico
                </label>

                <input
                    className="form-control"
                    id="profile-email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label
                    className="form-label fw-semibold"
                    htmlFor="profile-password"
                >
                    Nueva contraseña
                </label>

                <input
                    className="form-control"
                    id="profile-password"
                    name="password"
                    type="password"
                    value={profileData.password}
                    onChange={handleChange}
                    minLength="4"
                    autoComplete="new-password"
                />

                <small className="form-text text-muted">
                    Déjala vacía para conservar
                    la contraseña actual.
                </small>
            </div>

            <div>
                <button
                    className="btn btn-profile-save"
                    type="submit"
                    disabled={saving}
                >
                    {saving
                        ? 'Guardando datos...'
                        : 'Guardar datos personales'}
                </button>
            </div>
        </form>
    );
}

export default ProfileForm;
