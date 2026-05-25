import { useState, useEffect } from 'react';
import ItemList from './ItemList';
import styles from '../styles/items/ItemListContainer.module.css';

const ItemListContainer = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch('/data/products.json')
            .then((response) => {

                if (!response.ok)
                    throw new Error('Could not load product information');

                return response.json();

            })
            .then(data => setProducts(data))
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));

    }, []);

    if (loading) {
        return (
            <div className={styles.statusWrapper}>
                <div className={styles.spinner} aria-label="Loading" />
                <p className={styles.statusText}>Loading products…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${styles.statusWrapper} ${styles.errorWrapper}`}>
                <span className={styles.errorIcon}>⚠</span>
                <p className={styles.statusText}>{error}</p>
            </div>
        );
    }

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Products</h1>
            </header>
            <ItemList products={products} />
        </main>
    );
};

export default ItemListContainer;