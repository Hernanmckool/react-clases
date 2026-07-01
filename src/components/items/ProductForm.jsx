import styles from '../styles/items/ProductForm.module.css';

const CATEGORIES = [
    "Photography",
    "Electronics",
    "Computing",
    "Accessories",
    "Video",
    "Other",
];

const ProductForm = ({ formData, handleChange, handleSubmit, handleImageChange, mode = "add", loading }) => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>
                {mode === "edit" ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label className={styles.label}>Name</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="E.g. Nikon Z6 Camera"
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Description</label>
                    <textarea
                        className={`${styles.input} ${styles.textarea}`}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Product description..."
                        rows={3}
                    />
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Price</label>
                        <div className={styles.inputWithPrefix}>
                            <span className={styles.prefix}>$</span>
                            <input
                                className={`${styles.input} ${styles.inputWithSpacing}`}
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Stock</label>
                        <input
                            className={styles.input}
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                            required
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Category</label>
                    <select
                        className={`${styles.input} ${styles.select}`}
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select category...</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        {mode === "edit" ? "New image (optional)" : "Image"}
                    </label>
                    <label className={styles.fileLabel}>
                        <span className={styles.fileButton}>Choose file</span>
                        <input
                            className={styles.fileInput}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <span className={styles.fileName} id="file-name">
                            No file selected
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    className={styles.saveButton}
                    disabled={loading}
                >
                    {loading ? "Saving..." : mode === "edit" ? "Save changes" : "Add product"}
                </button>

            </form>
        </div>
    );
};

export default ProductForm;
