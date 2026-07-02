import { useCart } from "../../context/CartContext";
import TrashIcon from "../../assets/icons/TrashIcon";

const Cart = () => {
    const { cart, clearCart, getTotalPrice, incrementQuantity, decrementQuantity, removeFromCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="w-full max-w-4xl mx-auto my-16 px-4">
                <div className="text-center py-20">
                    <span className="text-5xl">🛒</span>
                    <h1 className="mt-5 mb-2 text-4xl font-extrabold text-white">El carrito está vacío</h1>
                    <p className="text-zinc-400">Agregá productos para seguir comprando.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto my-10 px-4">
            <h1 className="mb-7 text-4xl font-extrabold text-white">Carrito de Compras</h1>

            <ul className="list-none p-0 m-0 flex flex-col gap-4">
                {cart.map(item => (
                    <li key={item.id} className="flex items-center gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                            <h4 className="text-lg text-white mb-2.5">{item.name}</h4>
                            <div className="flex items-center gap-4 text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <button
                                        className="w-8 h-8 rounded-lg bg-white text-zinc-900 font-bold"
                                        onClick={() => decrementQuantity(item.id)}
                                    >
                                        -
                                    </button>
                                    <strong className="min-w-6 text-center text-white">{item.quantity}</strong>
                                    <button
                                        className="w-8 h-8 rounded-lg bg-white text-zinc-900 font-bold"
                                        onClick={() => incrementQuantity(item.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <span>Precio unitario: ${Number(item.price).toLocaleString('es-AR')}</span>
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold text-white">${Number(item.price * item.quantity).toLocaleString('es-AR')}</p>
                        <button
                            className="w-9 h-9 flex items-center justify-center text-zinc-400 border border-zinc-700 rounded-lg hover:text-red-400 hover:border-red-400/40"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Quitar del carrito"
                        >
                            <TrashIcon />
                        </button>
                    </li>
                ))}
            </ul>

            <hr className="my-8 border-zinc-800" />

            <div className="flex items-center justify-between gap-6">
                <h3 className="text-3xl text-white">
                    <span className="mr-3.5 text-zinc-400 text-xl">Total a pagar</span> ${Number(getTotalPrice()).toLocaleString('es-AR')}
                </h3>
                <button
                    className="px-7 py-3.5 border border-zinc-700 rounded-lg text-zinc-400 font-extrabold uppercase tracking-wide hover:bg-white hover:text-zinc-900"
                    onClick={clearCart}
                >
                    Vaciar carrito
                </button>
            </div>
        </div>
    );
};

export default Cart;
