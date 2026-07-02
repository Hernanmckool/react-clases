import ItemList from './ItemList';
import { useProducts } from '../../context/ProductsContext';
import Pagination from '../Pagination';

const ItemListContainer = () => {

    const { products, loading, currentPage, totalPages, loadPage } = useProducts();

    if (loading && products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-24">
                <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" aria-label="Cargando" />
                <p className="text-zinc-400">Cargando productos…</p>
            </div>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-6 py-10">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-white">Productos</h1>
            </header>
            <ItemList products={products} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                loadPage={loadPage}
                loading={loading}
            />
        </main>
    );
};

export default ItemListContainer;
