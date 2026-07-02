import React, { useState, useContext, createContext } from "react";

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used inside a CartProvider');
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        const itemInCart = cart.find(item => item.id === product.id);
        if (itemInCart) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart(previous => [...previous, { ...product, quantity }]);
        }
    };

    const clearCart = () => setCart([]);

    const getTotalQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const incrementQuantity = (productId) => {
        setCart(previous => previous.map(item =>
            item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    const decrementQuantity = (productId) => {
        setCart(previous => previous.map(item =>
            item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ).filter(item => item.quantity > 0));
    };

    const removeFromCart = (productId) => {
        setCart(previous => previous.filter(item => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, getTotalQuantity, getTotalPrice, incrementQuantity, decrementQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};