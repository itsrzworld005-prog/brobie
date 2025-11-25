import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface CartItem {
    productId: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    variant?: string; // e.g., "Size: M, Color: Red"
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: number, variant?: string) => void;
    updateQuantity: (productId: number, quantity: number, variant?: string) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (newItem: CartItem) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(
                item => item.productId === newItem.productId && item.variant === newItem.variant
            );

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += newItem.quantity;
                return newCart;
            }
            return [...prevCart, newItem];
        });
    };

    const removeFromCart = (productId: number, variant?: string) => {
        setCart(prevCart => prevCart.filter(
            item => !(item.productId === productId && item.variant === variant)
        ));
    };

    const updateQuantity = (productId: number, quantity: number, variant?: string) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.productId === productId && item.variant === variant) {
                return { ...item, quantity: Math.max(0, quantity) };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
