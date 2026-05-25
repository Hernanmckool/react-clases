import styles from '../styles/layouts/Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <nav>
                <ul className={styles.footerNav}>
                    <li>
                        <a href="#about" className={styles.footerLink}>About Us</a>
                    </li>
                    <li>
                        <a href="#privacy" className={styles.footerLink}>Privacy Policy</a>
                    </li>
                </ul>
            </nav>

            <hr className={styles.divider} />

            <div className={styles.copyrightContainer}>
                <p className={styles.copyright}>
                    © {currentYear} <span className={styles.brand}>JUANCHO Store</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;