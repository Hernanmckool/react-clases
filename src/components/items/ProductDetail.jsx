import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch("/data/products.json")
            .then(response => response.json())
            .then(data => {
                const foundProduct = data.find(p => p.id === parseInt(id));
                setProduct(foundProduct);
            })
            .catch(error => console.error("Error loading product:", error));
    }, [id]);

    if (!product) return <h2>Loading product details...</h2>;

    if (!product.id) return <h2>Product not found.</h2>;

    return (
        <div>
            <h1>ID {product.id}</h1>
            <h2>Product Detail: {product.name}</h2>
            <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: "400px" }}
            />
            <h3>${product.price}</h3>
            <p>{product.description}</p>
        </div>
    );
};

export default ProductDetail;