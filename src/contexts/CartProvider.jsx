import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    // Load cart from backend on mount
    useEffect(() => {
        const loadCart = async () => {
            try {
                const response = await axiosSecure.get(`/cart`);
                setCartItems(response.data.items || []);
            } catch (error) {
                console.error('Error loading cart from backend:', error);
                setCartItems([]);
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, [axiosSecure]);

    // Add item to cart or update quantity if already exists
    const addToCart = async (coffee) => {
        try {
            const response = await axiosSecure.post(`/cart`, { coffee });
            setCartItems(response.data.items || []);
        } catch (error) {
            console.error('Error adding to cart:', error.response?.data || error.message);
        }
    };

    // Remove item from cart
    const removeFromCart = async (coffeeId) => {

        const result = await Swal.fire({
            title: "Remove Item?",
            text: "Do you want to remove this coffee from your cart?",
            showCancelButton: true, confirmButtonText: "Yes, Remove", cancelButtonText: "No"
        })

        if (result.isConfirmed) {
            try {
                const response = await axiosSecure.delete(`/cart/${coffeeId}`)
                setCartItems(response.data.items || [])

                const Toast = Swal.mixin({
                    toast: true, position: "top-end", showConfirmButton: false, timer: 1500, timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer
                        toast.onmouseleave = Swal.resumeTimer
                    }
                })
                Toast.fire({
                    icon: "success", title: "  Cart remove successfully"
                })
            } catch (error) {
                console.error("Error removing from cart:", error)

                Swal.fire({
                    title: "Error!", text: "Could not remove item. Please try again.", icon: "error"
                })
            }
        }
    }


    // Update quantity of an item
    const updateQuantity = async (coffeeId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(coffeeId);
            return;
        }

        try {
            const response = await axiosSecure.patch(`/cart/${coffeeId}`, { quantity });
            setCartItems(response.data.items || []);
        } catch (error) {
            console.error('Error updating quantity:', error.response?.data || error.message);
        }
    };

    // Clear entire cart without confirmation (for payment success)
    const silentClearCart = async () => {
        try {
            setCartItems([]);
            await axiosSecure.delete(`/cart`);
        } catch (error) {
            console.error("Error clearing cart:", error)
        }
    };

    // Clear entire cart
    const clearCart = async () => {

        const result = await Swal.fire({
            title: "Remove Item?",
            text: "Do you want to remove this coffee from your cart?",
            showCancelButton: true, confirmButtonText: "Yes, Remove", cancelButtonText: "No"
        })

        if (result.isConfirmed) {
            try {
                const response = await axiosSecure.delete(`/cart`);
                setCartItems(response.data.items || []);

                const Toast = Swal.mixin({
                    toast: true, position: "top-end", showConfirmButton: false, timer: 1500, timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer
                        toast.onmouseleave = Swal.resumeTimer
                    }
                })
                Toast.fire({
                    icon: "success", title: " Clear successfully"
                })
            } catch (error) {
                console.error("Error clearing cart:", error)
                Swal.fire({
                    title: "Error!", text: "Could not clear cart. Please try again.", icon: "error"
                })
            }
        }
    };

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + (item.price * item.cartQuantity),
            0
        );
    };

    // Calculate total items count
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.cartQuantity, 0);
    };

    const value = {
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        silentClearCart,
        calculateTotal,
        getTotalItems,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
