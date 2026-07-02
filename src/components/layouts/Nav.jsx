import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul className="flex gap-6 list-none m-0 p-0">
                <li>
                    <Link to="/" className="text-zinc-300 no-underline hover:text-white">Inicio</Link>
                </li>
                <li>
                    <Link to="/products" className="text-zinc-300 no-underline hover:text-white">Productos</Link>
                </li>
                <li>
                    <Link to="/contact" className="text-zinc-300 no-underline hover:text-white">Contacto</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
