const ProductForm = ({ formData, handleChange, handleSubmit, handleImageChange }) => {
    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button type="submit">Save</button>
        </form>
    );
};

export default ProductForm;