import Nav from "./Nav";
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from '../styles/layouts/Header.module.css';

const Header = () => {
    const { getTotalQuantity } = useCart();
    const totalItems = getTotalQuantity();

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>VendiFy</Link>
            <Nav />
            <Link to="/cart" className={styles.cartLink}>
                Cart 🛒 {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
            </Link>
        </header>
    );
};

export default Header;