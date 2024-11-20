import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems")
        return savedCart ? JSON.parse(savedCart) : []
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingProduct = prevItems.find(item => item.itemId === product.itemId);
            console.log("existingProduct", prevItems.find(item => item.itemId === product.itemId));

            if (existingProduct) {
                return [...prevItems]
            } else {
                return [...prevItems, { ...product, quantity: 1 }]
            }
        });
    };

    const incrementQuantity = (product) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) =>
                item.itemId === product.itemId ? { ...item, quantity: item.quantity + 1 } : item
            );
        });
    };

    const decrementQuantity = (product) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) => item.itemId === product.itemId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
        })
    }

    const deleteProduct = (product) => {
        setCartItems((prevItems) => {
            return prevItems.filter((item) => item.itemId !== product.itemId)
        })
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, incrementQuantity, decrementQuantity, deleteProduct }}>
            {children}
        </CartContext.Provider>
    );
};