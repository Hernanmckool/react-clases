import { useEffect, useState } from "react";
import { useSearch } from "../../context/SearchContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";

const SearchResults = () => {
    const { search } = useSearch();
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    // Search needs every product, not just the current paginated page,
    // so it fetches the full collection separately from ProductsContext.
    useEffect(() => {
        const fetchAllProducts = async () => {
            const snapshot = await getDocs(collection(db, "products"));
            const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
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
        <div className="max-w-6xl mx-auto px-5 py-10">
            <h2 className="text-3xl font-normal text-white mb-6">Productos encontrados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <article key={product.id} className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-lg">
                            <Link to={`/product/${product.id}`} className="block w-full h-[180px] overflow-hidden bg-zinc-950">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover block"
                                />
                            </Link>

                            <div className="p-4">
                                <Link to={`/product/${product.id}`} className="no-underline">
                                    <h2 className="m-0 text-xl text-white">{product.name}</h2>
                                </Link>

                                <p className="mt-3.5 mb-2 text-lg text-white font-bold">
                                    <span className="mr-1 text-zinc-400 text-xs">ARS $</span>
                                    {Number(product.price).toLocaleString("es-AR")}
                                </p>

                                <Link
                                    to={`/product/${product.id}`}
                                    className="block text-center w-full rounded-lg p-2.5 bg-white text-zinc-900 font-bold no-underline"
                                >
                                    Ver Detalle
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className="text-zinc-500 text-center py-10 col-span-full">
                        No hay productos que coincidan con tu búsqueda.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
