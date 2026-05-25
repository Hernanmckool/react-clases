import React from "react";
import { useCart } from "../../context/CartContext";
import styles from "../styles/pages/Cart.module.css";

const Cart = () => {
    const { cart, clearCart, getTotalPrice, incrementQuantity, decrementQuantity } = useCart();

    if (cart.length === 0) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.empty}>
                    <span className={styles.emptyIcon}>🛒</span>
                    <h1 className={styles.emptyTitle}>The cart is empty</h1>
                    <p className={styles.emptyText}>Add products to continue shopping.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Shopping Cart</h1>
            <ul className={styles.list}>
                {cart.map(item => (
                    <li key={item.id} className={styles.item}>
                        <div>
                            <h4 className={styles.itemName}>{item.name}</h4>
                            <div className={styles.itemMeta}>
                                <div className={styles.quantityControls}>
                                    <button className={styles.btnQty} onClick={() => decrementQuantity(item.id)}>-</button>
                                    <strong className={styles.qty}>{item.quantity}</strong>
                                    <button className={styles.btnQty} onClick={() => incrementQuantity(item.id)}>+</button>
                                </div>
                                <span>Unit price: ${item.price}</span>
                            </div>
                        </div>
                        <p className={styles.itemSubtotal}>
                            ${item.price * item.quantity}
                        </p>
                    </li>
                ))}
            </ul>
            <hr className={styles.divider} />
            <div className={styles.footer}>
                <h3 className={styles.total}>
                    <span>Total to pay</span> ${getTotalPrice()}
                </h3>
                <button className={styles.btnClear} onClick={clearCart}>
                    Clear cart
                </button>
            </div>
        </div>
    );
};

export default Cart;