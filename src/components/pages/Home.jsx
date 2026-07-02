import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center px-6 py-24 gap-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
                Bienvenido a VendiFy
            </h1>
            <p className="text-zinc-400 max-w-md">
                Los mejores productos de tecnología al mejor precio.
            </p>
            <Link
                to="/products"
                className="bg-white text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-zinc-200"
            >
                Ver Productos
            </Link>
        </section>
    );
};

export default Home;
