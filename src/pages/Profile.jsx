import {
    useEffect,
    useState,
} from 'react';

import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

import {
    actualizarPerfil,
    obtenerPerfil,
    obtenerUrlImagen,
    subirImagenPerfil,
} from '../service/api.js';

import ProfileForm from '../components/ProfileForm.jsx';
import ProfileImageForm from '../components/ProfileImageForm.jsx';

function Profile() {
    const {
                user,
                updateUser,
            } = useAuth();

    const [profile, setProfile] =
        useState(null);

    const [error, setError] =
        useState('');

    const [success, setSuccess] =
        useState('');

    const [loading, setLoading] =
        useState(true);

    const [
        savingProfile,
        setSavingProfile,
    ] = useState(false);

    const [
        savingImage,
        setSavingImage,
    ] = useState(false);

    useEffect(() => {
        async function loadProfile() {
            try {
                const result =
                    await obtenerPerfil();

                setProfile(result.data);
                
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    async function saveProfile(
        profileData,
    ) {
        setError('');
        setSuccess('');
        setSavingProfile(true);

        try {
            const result =
                await actualizarPerfil(
                    profileData,
                );

            setProfile(result.data);
            updateUser(result.data);

            setSuccess(
                'Datos personales actualizados correctamente.',
            );

            return true;
        } catch (error) {
            setError(error.message);
            return false;
        } finally {
            setSavingProfile(false);
        }
    }

    async function saveProfileImage(
        imageFile,
    ) {
        setError('');
        setSuccess('');
        setSavingImage(true);

        try {
            const result =
                await subirImagenPerfil(
                    imageFile,
                );

            setProfile(result.data);
            updateUser(result.data);

            setSuccess(
                'Foto de perfil actualizada correctamente.',
            );

            return true;
        } catch (error) {
            setError(error.message);
            return false;
        } finally {
            setSavingImage(false);
        }
    }

    const homePath =
        user.role === 'admin'
            ? '/'
            : user.role === 'teacher'
                ? '/teacher'
                : '/student';

    const roleNames = {
        admin: 'Administrador',
        teacher: 'Profesor',
        student: 'Estudiante',
    };

    if (loading) {
        return (
            <main className="profile-page">
                <p>Cargando perfil...</p>
            </main>
        );
    }

    return (
        <main className="profile-page">
            <header className="profile-header">
                <div>
                    <p>Academia Quanti</p>

                    <h1>Mi perfil</h1>

                    <p>
                        Administra tus datos
                        personales y tu foto.
                    </p>
                </div>

                <Link
                    className="btn btn-light"
                    to={homePath}
                >
                    Volver al panel
                </Link>
            </header>

            {success && (
                <p
                    className="form-success"
                    role="status"
                >
                    {success}
                </p>
            )}

            {error && (
                <p
                    className="form-error"
                    role="alert"
                >
                    {error}
                </p>
            )}

            {profile && (
                <>
                    <section
                        className="profile-summary"
                        aria-labelledby="profile-summary-title"
                    >
                        <div>
                            <p
                                id="profile-summary-title"
                            >
                                Cuenta actual
                            </p>

                            <h2>{profile.name}</h2>

                            <p>{profile.email}</p>
                        </div>

                        <span
                            className={
                                `user-role user-role--${profile.role}`
                            }
                        >
                            {roleNames[
                                profile.role
                            ]}
                        </span>
                    </section>

                    <div className="profile-grid">
                        <ProfileImageForm
                            imageUrl={
                                obtenerUrlImagen(
                                    profile.profileImage,
                                )
                            }
                            userName={
                                profile.name
                            }
                            onSave={
                                saveProfileImage
                            }
                            saving={
                                savingImage
                            }
                        />

                        <ProfileForm
                            profile={profile}
                            onSave={saveProfile}
                            saving={
                                savingProfile
                            }
                        />
                    </div>
                </>
            )}
        </main>
    );
}

export default Profile;