function Header({
    title,
    description,
    userName,
    onLogout,
    }) {
    return (
        <header className="topbar">
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>

        <div className="user-session">
            <p className="current-user">
            Usuario: <strong>{userName}</strong>
            </p>

            <button
            type="button"
            onClick={onLogout}
            >
            Cerrar sesión
            </button>
        </div>
        </header>
    );
}

export default Header;