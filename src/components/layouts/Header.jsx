import Nav from "./Nav";
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import styles from '../styles/layouts/Header.module.css';
import SearchBar from '../search/SearchBar';

const Header = () => {
    const { getTotalQuantity } = useCart();
    const { user, logout } = useAuth();
    const totalItems = getTotalQuantity();

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

        return "User";
    };

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>VendiFy</Link>
            <Nav />
            <SearchBar />

            <ul className={styles.authList}>
                {user ? (
                    <>
                        <li>
                            <span className={styles.greeting}>
                                Hi, {getDisplayName()}
                            </span>
                        </li>

                        {user.role === "admin" && (
                            <li>
                                <Link to="/dashboard" className={styles.adminLink}>
                                    Admin
                                </Link>
                            </li>
                        )}

                        <li>
                            <button onClick={logout} className={styles.logoutButton}>
                                Log out
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/login" className={styles.loginLink}>
                            Log in
                        </Link>
                    </li>
                )}
            </ul>

            <Link to="/cart" className={styles.cartLink}>
                Cart 🛒 {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
            </Link>
        </header>
    );
};

export default Header;