function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
        <p>
            Academia Quanti · Aplicaciones Híbridas · {currentYear}
        </p>
        </footer>
    );
}

export default Footer;