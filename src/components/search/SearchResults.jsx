import { useEffect, useState } from "react";
import { useSearch } from "../../context/SearchContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/search/SearchResults.module.css";
import cardStyles from "../styles/items/Item.module.css";

const SearchResults = () => {
    const { search } = useSearch();
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    // Search needs every product, not just the current paginated page,
    // so it fetches the full collection separately from ProductsContext.
    useEffect(() => {
        const fetchAllProducts = async () => {
            const snapshot = await getDocs(collection(db, "products"));
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllProducts(items);
        };

        fetchAllProducts();
    }, []);

    // Redirect to the product list if the search is cleared
    useEffect(() => {
        if (!search || search.trim() === "")
            navigate("/products");

    }, [search, navigate]);

    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Products Found</h2>
            <div className={styles.grid}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <article key={product.id} className={cardStyles.card}>
                            <Link to={`/product/${product.id}`} className={cardStyles.imageWrapper}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className={cardStyles.image}
                                />
                                <div className={cardStyles.imageOverlay} />
                            </Link>

                            <div className={cardStyles.body}>
                                <div className={cardStyles.header}>
                                    <Link to={`/product/${product.id}`} className={cardStyles.nameLink}>
                                        <h2 className={cardStyles.name}>{product.name}</h2>
                                    </Link>
                                </div>

                                <p className={cardStyles.price}>
                                    <span className={cardStyles.currency}>ARS</span>
                                    {Number(product.price).toLocaleString("es-AR")}
                                </p>

                                <Link to={`/product/${product.id}`} className={cardStyles.detailButton}>
                                    View Detail
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className={styles.noResults}>
                        No products match your search.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
