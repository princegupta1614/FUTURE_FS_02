import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function MyOrders() {
    document.title = "My Orders - E-commerce App";
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/orders/myorders", { withCredentials: true })
            .then((res) => {
                setOrders(res.data.orders || []);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Please login to view your orders.");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading orders...</p>;
    }

    if (!orders.length) {
        return <p className="text-center mt-10 text-gray-500">You have no orders yet.</p>;
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Placed":
                return "bg-yellow-100 text-yellow-800";
            case "Shipped":
                return "bg-blue-100 text-blue-800";
            case "Out for delivery":
                return "bg-orange-100 text-orange-800";
            case "Delivered":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            {orders.map((order) => (
                <div
                    key={order._id}
                    className="mb-6 border-b pb-4"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Placed on: {new Date(order.placedAt).toLocaleDateString()}
                        </p>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                        >
                            {order.status}
                        </span>
                    </div>
                    <div className="mt-3">
                        {order.items.map((item) => (
                            <div
                                key={item.productId?._id}
                                className="flex justify-between py-1 border-b last:border-b-0"
                            >
                                <span>{item.productId?.title || "Product removed"}</span>
                                <span>x {item.quantity}</span>
                                <span>₹{item.totalPrice?.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-3 font-semibold">
                        Total: ₹{order.totalPrice.toFixed(2)}
                    </p>
                </div>
            ))}
        </div>
    );
}
