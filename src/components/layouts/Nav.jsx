import { Link } from 'react-router-dom';
import styles from '../styles/layouts/Nav.module.css';

const Nav = () => {
    return (
        <nav className={styles.navContainer}>
            <ul className={styles.navList}>
                <li>
                    <Link to="/" className={styles.navLink}>Home</Link>
                </li>
                <li>
                    <Link to="/products" className={styles.navLink}>Products</Link>
                </li>
                <li>
                    <Link to="/contact" className={styles.navLink}>Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;