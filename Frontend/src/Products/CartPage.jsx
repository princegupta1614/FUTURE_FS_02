import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaceOrder from "./PlaceOrder";
import { toast } from "react-toastify";

export default function CartPage() {
    document.title = "User Cart";
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, { withCredentials: true });
            setCart(res.data.items || []);
        } catch (err) {
            console.error(err);
            toast.error("Please login first.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleOrderPlaced = () => {
        fetchCart();
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) return;
        try {
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/update/${productId}`,
                { quantity },
                { withCredentials: true }
            );
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    const removeItem = async (productId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove/${productId}`, { withCredentials: true });
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading cart...</p>;

    if (!cart.length) {
        return <p className="text-center mt-10 text-gray-500">Your cart is empty</p>;
    }

    return (
        <div>
            <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                {cart.map((item) => (
                    <div
                        key={item.productId._id}
                        className="flex items-center justify-between border-b py-3"
                    >
                        <div>
                            <h2 className="font-medium">{item.productId.title}</h2>
                            <p className="text-gray-500">{item.totalPrice.toFixed(2)} ₹</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() =>
                                    updateQuantity(item.productId._id, item.quantity - 1)
                                }
                                className="px-2 py-1 bg-gray-300 rounded"
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() =>
                                    updateQuantity(item.productId._id, item.quantity + 1)
                                }
                                className="px-2 py-1 bg-gray-300 rounded"
                            >
                                +
                            </button>
                            <button
                                onClick={() => removeItem(item.productId._id)}
                                className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                {/* FIX: pass as object with items */}
                <PlaceOrder cart={{ items: cart }} onOrderPlaced={handleOrderPlaced} />
            </div>
        </div>
    );
}
