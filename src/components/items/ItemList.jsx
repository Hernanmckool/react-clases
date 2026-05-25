// ItemList.jsx
import Item from './Item';
import styles from '../styles/items/ItemList.module.css';

const ItemList = ({ products }) => {
    return (
        <section className={styles.grid}>
            {products.map(product =>
                <Item key={product.id} {...product} />
            )}
        </section>
    );
};

export default ItemList;