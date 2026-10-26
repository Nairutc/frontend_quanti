function Header({
    title,
    description,
    userName,
    }) {
    return (
        <header className="topbar">
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>

        <p className="current-user">
            Usuario: <strong>{userName}</strong>
        </p>
        </header>
    );
}

export default Header;