import {
    useEffect,
    useState,
} from 'react';

function ProfileImageForm({
    imageUrl,
    userName,
    onSave,
    saving,
}) {
    const [imageFile, setImageFile] =
        useState(null);

    const [preview, setPreview] =
        useState(imageUrl);

    const [error, setError] =
        useState('');

    useEffect(() => {
        setPreview(imageUrl);
    }, [imageUrl]);

    function handleImageChange(event) {
        const file = event.target.files[0];

        setError('');

        if (!file) {
            setImageFile(null);
            return;
        }

        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
        ];

        if (
            !allowedTypes.includes(file.type)
        ) {
            setError(
                'Selecciona una imagen JPG, PNG o WebP.',
            );

            event.target.value = '';
            setImageFile(null);
            return;
        }

        const maximumSize =
            2 * 1024 * 1024;

        if (file.size > maximumSize) {
            setError(
                'La imagen no puede superar los 2 MB.',
            );

            event.target.value = '';
            setImageFile(null);
            return;
        }

        setImageFile(file);

        const reader = new FileReader();

        reader.onload = () => {
            setPreview(reader.result);
        };

        reader.readAsDataURL(file);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');

        if (!imageFile) {
            setError(
                'Debes seleccionar una imagen.',
            );
            return;
        }

        const saved =
            await onSave(imageFile);

        if (saved) {
            setImageFile(null);
        }
    }

    const initial =
        userName?.charAt(0).toUpperCase() ||
        'Q';

    return (
        <form
            className="card border-0 shadow-sm p-4 profile-image-form"
            onSubmit={handleSubmit}
        >
            <h2>Foto de perfil</h2>

            <p>
                Selecciona una imagen para
                identificar tu cuenta.
            </p>

            <div className="profile-avatar">
                {preview ? (
                    <img
                        src={preview}
                        alt={`Foto de perfil de ${userName}`}
                    />
                ) : (
                    <span>{initial}</span>
                )}
            </div>

            <div className="mb-3">
                <label
                    className="form-label fw-semibold"
                    htmlFor="profile-image"
                >
                    Seleccionar imagen
                </label>

                <input
                    className="form-control"
                    id="profile-image"
                    name="profileImage"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                />

                <small className="form-text text-muted">
                    Formatos permitidos: JPG,
                    PNG y WebP. Máximo 2 MB.
                </small>
            </div>

            {error && (
                <p
                    className="form-error"
                    role="alert"
                >
                    {error}
                </p>
            )}

            {imageFile && (
                <div>
                    <button
                        className="btn btn-profile-photo"
                        type="submit"
                        disabled={saving}
                    >
                        {saving
                            ? 'Subiendo foto...'
                            : 'Guardar nueva foto'}
                    </button>
                </div>
            )}
        </form>
    );
}

export default ProfileImageForm;
