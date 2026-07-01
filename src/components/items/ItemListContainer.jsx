import ItemList from './ItemList';
import styles from '../styles/items/ItemListContainer.module.css';
import { useProducts } from '../../context/ProductsContext';
import Pagination from '../Pagination';

const ItemListContainer = () => {

    const { products, loading, currentPage, totalPages, loadPage } = useProducts();

    if (loading && products.length === 0) {
        return (
            <div className={styles.statusWrapper}>
                <div className={styles.spinner} aria-label="Loading" />
                <p className={styles.statusText}>Loading products…</p>
            </div>
        );
    }

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Products</h1>
            </header>
            <ItemList products={products} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                loadPage={loadPage}
                loading={loading}
            />
        </main>
    );
};

export default ItemListContainer;