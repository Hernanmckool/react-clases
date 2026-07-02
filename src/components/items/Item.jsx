import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Item({ name, stock, price, image, id }) {

    const [quantity, setQuantity] = useState(0);
    const [favorite, setFavorite] = useState(false);
    const { addToCart } = useCart();
    const toggleFavorite = () => setFavorite(!favorite);
    const increment = () => {
        if (quantity < stock) setQuantity(quantity + 1);
    };
    const decrement = () => {
        if (quantity > 0) setQuantity(quantity - 1);
    };
    const handleAddToCart = () => {
        const product = { id, name, price, image };
        if (quantity > 0) addToCart(product, quantity);
    };

    return (
        <article className="w-[280px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-lg">
            <Link to={`/product/${id}`} className="block w-full h-[180px] overflow-hidden bg-zinc-950">
                <img src={image} alt={name} className="w-full h-full object-cover block" />
            </Link>
            <div className="p-4">
                <div className="flex justify-between items-start gap-3">
                    <Link to={`/product/${id}`} className="no-underline">
                        <h2 className="m-0 text-xl text-white">{name}</h2>
                    </Link>
                    <button
                        onClick={toggleFavorite}
                        className={`w-[34px] h-[34px] rounded-lg border border-zinc-600 bg-zinc-800 cursor-pointer ${favorite ? 'text-rose-500' : 'text-white'}`}
                        aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                        {favorite ? '♥' : '♡'}
                    </button>
                </div>
                <p className="mt-3.5 mb-2 text-lg text-white font-bold">
                    <span className="mr-1 text-zinc-400 text-xs">ARS $</span>
                    {Number(price).toLocaleString('es-AR')}
                </p>
                <p className="text-zinc-400 text-sm">
                    {
                        stock > 0
                            ? <><span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1.5" />{stock} disponibles</>
                            : <span className="text-red-400">Sin stock</span>
                    }
                </p>
                <div className="flex items-center gap-2.5 my-3.5">
                    <button
                        onClick={decrement}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed"
                        disabled={quantity === 0}
                        aria-label="Disminuir"
                    >
                        -
                    </button>
                    <span className="text-white font-bold">{quantity}</span>
                    <button
                        onClick={increment}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed"
                        disabled={quantity >= stock}
                        aria-label="Aumentar"
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="w-full rounded-lg p-2.5 bg-white text-zinc-900 cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 0}
                >
                    Agregar {quantity} al carrito
                </button>
            </div>
        </article>
    );
}

export default Item;
