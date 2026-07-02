const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-white px-4 py-8 flex flex-col items-center gap-6 border-t border-zinc-700">
            <nav>
                <ul className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 list-none m-0 p-0">
                    <li>
                        <a href="#about" className="text-zinc-300 text-sm no-underline hover:text-yellow-400 hover:underline">
                            Nosotros
                        </a>
                    </li>
                    <li>
                        <a href="#privacy" className="text-zinc-300 text-sm no-underline hover:text-yellow-400 hover:underline">
                            Política de Privacidad
                        </a>
                    </li>
                </ul>
            </nav>

            <hr className="w-full max-w-md border-zinc-700" />

            <div>
                <p className="text-zinc-500 text-sm text-center tracking-wide m-0">
                    © {currentYear} <span className="font-semibold text-zinc-300">HernanMckool Store</span>. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
