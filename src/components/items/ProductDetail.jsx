import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import styles from '../styles/items/ProductDetail.module.css';

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    // This loading state only affects the reviews
    const [reviewsLoading, setReviewsLoading] = useState(true);

    // Fetches this specific product directly by id, instead of relying on
    // whatever page happens to be loaded in the paginated ProductsContext.
    useEffect(() => {
        const fetchProduct = async () => {
            const snapshot = await getDoc(doc(db, "products", id));
            if (snapshot.exists()) {
                setProduct({ id: snapshot.id, ...snapshot.data() });
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        const reviewsQuery = query(
            collection(db, "reviews"),
            where("productId", "==", id)
        );

        const unsubscribe = onSnapshot(reviewsQuery, snapshot => {
            const firebaseReviews = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setReviews(firebaseReviews);
            setReviewsLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    if (!product) return <h2>Loading product details...</h2>;

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

            <section className={styles.reviewsSection}>
                <h2 className={styles.reviewsTitle}>Community Reviews</h2>

                {reviewsLoading ? (
                    <div className={styles.reviewsLoadingBox}>
                        <p>Loading reviews...</p>
                    </div>
                ) : reviews.length === 0 ? (
                    <p className={styles.noReviews}>No reviews yet for this item.</p>
                ) : (
                    reviews.map(review => (
                        <div key={review.id} className={styles.reviewCard}>
                            <strong className={styles.customerName}>{review.customerName}</strong>
                            <p>{review.comment}</p>
                            <span className={styles.rating}>Rating: {review.rating} ★</span>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
};

export default ProductDetail;