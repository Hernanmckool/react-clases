import { useState } from "react";
import FormContainer from "./FormContainer";
import { useProducts } from "../../context/ProductsContext";
import styles from "../styles/forms/Dashboard.module.css";
import TrashIcon from "../../assets/icons/TrashIcon";
import EditIcon from "../../assets/icons/EditIcon";
import Pagination from "../Pagination";

const Dashboard = () => {
    const {
        products,
        deleteProduct,
        currentPage,
        totalPages,
        loadPage,
        loading
    } = useProducts();

    const [editingProduct, setEditingProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const openAdd = () => {
        setEditingProduct(null);
        setModalOpen(true);
    };

    const openEdit = (product) => {
        setEditingProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingProduct(null);
    };

    const handleDelete = async (id) => {
        const ok = window.confirm("Delete this product permanently?");
        if (ok) await deleteProduct(id);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Inventory</h1>
                <button className={styles.newButton} onClick={openAdd}>
                    + Add Product
                </button>
            </header>

            {modalOpen && (
                <div className={styles.overlay}>
                    <div className={styles.modal}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            &times;
                        </button>
                        <FormContainer
                            closeModal={closeModal}
                            editingProduct={editingProduct}
                        />
                    </div>
                </div>
            )}

            {loading && products.length === 0 ? (
                <div className={styles.stateWrapper}>
                    <p className={styles.stateText}>Loading inventory...</p>
                </div>
            ) : (
                <>
                    <div className={styles.body}>
                        <ul className={styles.list}>
                            {products.map(product => (
                                <li key={product.id} className={styles.item}>
                                    {product.image && (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className={styles.itemImg}
                                        />
                                    )}

                                    <div className={styles.itemInfo}>
                                        <h4>{product.name}</h4>
                                        <div className={styles.itemMeta}>
                                            <span className={styles.price}>${product.price}</span>
                                            {product.category && (
                                                <span className={styles.category}>{product.category}</span>
                                            )}
                                            <span className={styles.stock}>Stock: {product.stock}</span>
                                        </div>
                                    </div>

                                    <div className={styles.itemActions}>
                                        <button
                                            className={styles.editButton}
                                            onClick={() => openEdit(product)}
                                            aria-label="Edit product"
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDelete(product.id)}
                                            aria-label="Delete product"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        loadPage={loadPage}
                        loading={loading}
                    />
                </>
            )}
        </div>
    );
};

export default Dashboard;
