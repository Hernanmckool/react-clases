import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import FormContainer from "./FormContainer";
import { useProducts } from "../../context/ProductsContext";
import { useSearch } from "../../context/SearchContext";
import TrashIcon from "../../assets/icons/TrashIcon";
import EditIcon from "../../assets/icons/EditIcon";
import Pagination from "../Pagination";
import ConfirmModal from "../ConfirmModal";

const Dashboard = () => {
    const {
        products,
        deleteProduct,
        currentPage,
        totalPages,
        loadPage,
        loading
    } = useProducts();

    const { search } = useSearch();
    const [allProducts, setAllProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const isSearching = search.trim() !== "";

    // While searching, the header search bar filters the whole inventory
    // instead of navigating away to /search, so it needs every product, not
    // just the currently loaded page.
    useEffect(() => {
        if (!isSearching) return;

        const fetchAllProducts = async () => {
            const snapshot = await getDocs(collection(db, "products"));
            const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setAllProducts(items);
        };

        fetchAllProducts();
    }, [isSearching]);

    const displayedProducts = isSearching
        ? allProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
        : products;

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

    const confirmDelete = async () => {
        await deleteProduct(deletingProduct.id);
        setDeletingProduct(null);
    };

    return (
        <div className="min-h-screen w-full max-w-5xl mx-auto text-white px-6 py-10">
            <header className="flex items-center justify-between gap-4 mb-8 pb-5 border-b border-zinc-800">
                <h1 className="text-2xl font-extrabold">Inventario</h1>
                <button
                    className="px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-zinc-900 bg-white rounded-lg hover:opacity-85"
                    onClick={openAdd}
                >
                    + Agregar Producto
                </button>
            </header>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-9 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                        <button
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-lg text-zinc-400 border border-zinc-700 rounded-md hover:text-white hover:border-white"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <FormContainer
                            closeModal={closeModal}
                            editingProduct={editingProduct}
                        />
                    </div>
                </div>
            )}

            <ConfirmModal
                open={!!deletingProduct}
                title="Eliminar producto"
                message={`¿Eliminar "${deletingProduct?.name}" permanentemente?`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmDelete}
                onCancel={() => setDeletingProduct(null)}
            />

            {loading && products.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-zinc-400">Cargando inventario...</p>
                </div>
            ) : (
                <>
                    <div className="mt-2">
                        <ul className="list-none flex flex-col gap-2.5 p-0">
                            {displayedProducts.map(product => (
                                <li
                                    key={product.id}
                                    className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600"
                                >
                                    {product.image && (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-[90px] h-20 object-cover rounded-lg border border-zinc-800 flex-shrink-0"
                                        />
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-lg font-semibold text-white truncate mb-1">{product.name}</h4>
                                        <div className="flex items-center flex-wrap gap-2.5">
                                            <span className="text-white">${Number(product.price).toLocaleString('es-AR')}</span>
                                            {product.category && (
                                                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400 bg-white/5 border border-zinc-800 rounded px-2 py-0.5">
                                                    {product.category}
                                                </span>
                                            )}
                                            <span className="text-zinc-400">Stock: {product.stock}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-1.5 flex-shrink-0">
                                        <button
                                            className="flex items-center justify-center w-9 h-9 bg-transparent border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-white"
                                            onClick={() => openEdit(product)}
                                            aria-label="Editar producto"
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            className="flex items-center justify-center w-9 h-9 bg-transparent border border-zinc-800 rounded-lg text-zinc-400 hover:text-red-400 hover:border-red-400/40"
                                            onClick={() => setDeletingProduct(product)}
                                            aria-label="Eliminar producto"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {!isSearching && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            loadPage={loadPage}
                            loading={loading}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;
