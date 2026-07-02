import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

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
                setProduct({ ...snapshot.data(), id: snapshot.id });
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
                ...doc.data(),
                id: doc.id
            }));

            setReviews(firebaseReviews);
            setReviewsLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    if (!product) return <h2 className="text-center text-zinc-400 py-24">Cargando detalles del producto...</h2>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <div className="rounded-xl overflow-hidden bg-zinc-950 aspect-square">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {product.category && (
                        <span className="self-start text-xs font-semibold uppercase tracking-wide text-zinc-400 bg-white/5 border border-zinc-700 rounded-full px-3 py-1">
                            {product.category}
                        </span>
                    )}
                    <h1 className="text-3xl font-extrabold text-white">{product.name}</h1>
                    <p className="text-zinc-400">{product.description}</p>
                    <p className="text-3xl font-bold text-white">
                        <span className="text-sm text-zinc-400 mr-2">ARS $</span>
                        {Number(product.price).toLocaleString('es-AR')}
                    </p>
                    <p className="text-sm">
                        {product.stock > 0 ? (
                            <span className="text-zinc-400">
                                <strong className="text-white">Stock</strong> {product.stock} unidades
                            </span>
                        ) : (
                            <span className="text-red-400 font-semibold">Sin stock</span>
                        )}
                    </p>
                </div>
            </div>

            <section className="mt-14">
                <h2 className="text-2xl border-l-4 border-white pl-4 mb-6 text-white">Opiniones de la comunidad</h2>

                {reviewsLoading ? (
                    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl text-center text-zinc-400 italic">
                        <p>Cargando opiniones...</p>
                    </div>
                ) : reviews.length === 0 ? (
                    <p className="text-zinc-500">Todavía no hay opiniones para este producto.</p>
                ) : (
                    reviews.map(review => (
                        <div key={review.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl mb-4">
                            <strong className="text-white block mb-2">{review.customerName}</strong>
                            <p className="text-zinc-300">{review.comment}</p>
                            <span className="text-sm text-zinc-500">Calificación: {review.rating} ★</span>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
};

export default ProductDetail;
