import { useState } from 'react';
import styles from '../styles/items/Item.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Item({ name, stock, price, image, id }) {

    const [quantity, setQuantity] = useState(0);
    const [favorite, setFavorite] = useState(false);
    const { addToCart } = useCart();
    const toggleFavorite = () => setFavorite(!favorite);
    const increment = () => {
        if (quantity < stock) setQuantity(quantity + 1);
    };
    const decrement = () => {
        if (quantity > 0) setQuantity(quantity - 1);
    };
    const handleAddToCart = () => {
        const product = { id, name, price, image };
        if (quantity > 0) addToCart(product, quantity);
    };

    return (
        <article className={styles.card}>
            <Link to={`/product/${id}`} className={styles.imageWrapper}>
                <img src={image} alt={name} className={styles.image} />
                <div className={styles.imageOverlay} />
            </Link>
            <div className={styles.body}>
                <div className={styles.header}>
                    <Link to={`/product/${id}`} className={styles.nameLink}>
                        <h2 className={styles.name}>{name}</h2>
                    </Link>
                    <button onClick={toggleFavorite} className={`${styles.favorite} ${favorite ? styles.favoriteActive : ''}`} aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
                        {favorite ? '♥' : '♡'}
                    </button>
                </div>
                <p className={styles.price}>
                    <span className={styles.currency}>ARS</span>
                    {Number(price).toLocaleString('es-AR')}
                </p>
                <p className={styles.stock}>
                    {
                        stock > 0
                            ? <><span className={styles.stockDot} />{stock} available</>
                            : <span className={styles.outOfStock}>Out of stock</span>
                    }
                </p>
                <div className={styles.quantityWrapper}>
                    <button onClick={decrement} className={styles.quantityButton} disabled={quantity === 0} aria-label="Decrease">
                        -
                    </button>
                    <span className={styles.quantity}>{quantity}</span>
                    <button onClick={increment} className={styles.quantityButton} disabled={quantity >= stock} aria-label="Increase">
                        +
                    </button>
                </div>
                <button onClick={handleAddToCart} className={styles.detailButton} disabled={quantity <= 0}>
                    Add {quantity} to Cart
                </button>
            </div>
        </article>
    );
}

export default Item;