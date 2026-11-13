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
            Usuario: <strong className="user-badge">{userName}</strong>
            </p>

            <button
            type="button"
            className="btn btn-sm btn-outline-quanti"
            onClick={onLogout}
            >
            Cerrar sesión
            </button>
        </div>
        </header>
    );
}

export default Header;
