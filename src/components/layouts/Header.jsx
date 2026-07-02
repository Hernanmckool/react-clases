import { useState } from "react";
import Nav from "./Nav";
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../search/SearchBar';

const Header = () => {
    const { getTotalQuantity } = useCart();
    const { user, logout } = useAuth();
    const totalItems = getTotalQuantity();
    const [menuOpen, setMenuOpen] = useState(false);

    const capitalize = (string) => {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const getDisplayName = () => {
        if (user?.name) {
            const firstName = user.name.split(" ")[0];
            return capitalize(firstName);
        }

        if (user?.email) {
            const emailUser = user.email.split("@")[0].split(".")[0].split("-")[0];
            return capitalize(emailUser);
        }

        return "Usuario";
    };

    return (
        <header className="relative w-full bg-zinc-900 border-b border-zinc-800 px-6 md:px-10 py-4">
            <div className="flex items-center justify-between gap-4">
                <Link to="/" className="text-white text-2xl font-extrabold">VendiFy</Link>

                <button
                    className="md:hidden text-white text-2xl leading-none"
                    onClick={() => setMenuOpen(open => !open)}
                    aria-label="Abrir menú"
                >
                    ☰
                </button>

                <div
                    className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-end gap-4 md:gap-6
                        w-full md:w-auto absolute md:static top-full left-0
                        bg-zinc-900 md:bg-transparent border-b md:border-0 border-zinc-800
                        px-6 md:px-0 pb-6 md:pb-0`}
                >
                    <Nav />
                    <div className="md:w-56">
                        <SearchBar />
                    </div>

                    <ul className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 list-none m-0 p-0">
                        {user ? (
                            <>
                                <li>
                                    <span className="text-zinc-400 text-sm whitespace-nowrap">
                                        Hola, {getDisplayName()}
                                    </span>
                                </li>

                                {user.role === "admin" && (
                                    <li>
                                        <Link
                                            to="/dashboard"
                                            className="whitespace-nowrap text-white font-bold text-sm border border-zinc-600 rounded-lg px-3 py-1.5 hover:border-white"
                                        >
                                            Admin
                                        </Link>
                                    </li>
                                )}

                                <li>
                                    <button
                                        onClick={logout}
                                        className="whitespace-nowrap bg-transparent border border-zinc-600 rounded-lg text-zinc-400 text-sm px-3 py-1.5 cursor-pointer hover:text-white hover:border-white"
                                    >
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link
                                    to="/login"
                                    className="whitespace-nowrap text-white font-bold text-sm border border-zinc-600 rounded-lg px-3 py-1.5 hover:border-white"
                                >
                                    Iniciar sesión
                                </Link>
                            </li>
                        )}
                    </ul>

                    <Link to="/cart" className="whitespace-nowrap text-white font-bold flex items-center gap-2 no-underline shrink-0">
                        Carrito 🛒 {totalItems > 0 && (
                            <span className="w-6 h-6 rounded-full bg-white text-zinc-900 flex items-center justify-center text-xs font-extrabold">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
