import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../Img/logo.png"

export default function AdminDashboard() {
    document.title = "Admin Dashboard";
    const [activeTab, setActiveTab] = useState("products");
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Fetch Products
    useEffect(() => {
        if (activeTab === "products") {
            axios.get("/api/product/by-category?id=")
                .then(res => setProducts(res.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [activeTab]);

    // Fetch Orders
    useEffect(() => {
        if (activeTab === "orders") {
            axios.get("/api/admin/orders", { withCredentials: true })
                .then(res => setOrders(res.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [activeTab]);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`/api/admin/orders/${id}/status`, { status }, { withCredentials: true });
            setOrders(prev =>
                prev.map(order =>
                    order._id === id ? { ...order, status } : order
                )
            );
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update status");
        }
    };

    const deleteProduct = (id) => {
        toast.success(`Delete product with ID: ${id}`);
    };

    const handleLogout = () => {
        axios
            .post("/api/admin/logout", {}, { withCredentials: true })
            .then(() => {
                // window.location.href = "/admin-login";
                navigate("/admin-login");
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="p-6">

            <ToastContainer />
            {/* Navbar */}
            <div className="flex items-center justify-between px-4">
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setActiveTab("products")}
                        className={`px-4 py-2 rounded ${activeTab === "products" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab("orders")}
                        className={`px-4 py-2 rounded ${activeTab === "orders" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    >
                        Orders
                    </button>
                </div>
                <div className="flex items-center justify-center py-2 gap-4">
                    <img src={logo} alt="logo.png" className="w-[130px]" />
                    <div className="font-thin font-mono text-[20px] text-gray-600">
                        <p>-----Admin-Dashboard</p>
                    </div>
                </div>
                <div>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <p>Loading...</p>
            ) : activeTab === "products" ? (
                <div>
                    <h2 className="text-xl font-bold mb-4">All Products</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Image</th>
                                <th className="border p-2">Title</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Rating</th>
                                <th className="border p-2">Stock</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id} className="text-center">
                                    <td className="border p-2">
                                        <img
                                            src={product.images?.[0]}
                                            alt={product.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="border p-2">{product.title}</td>
                                    <td className="border p-2">₹{(product.price).toFixed(2)}</td>
                                    <td className="border p-2">{product.rating}</td>
                                    <td className="border p-2">{product.stock}</td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => deleteProduct(product._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-bold mb-4">All Orders</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Order ID</th>
                                <th className="border p-2">Customer</th>
                                <th className="border p-2">Total</th>
                                <th className="border p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td className="border p-2">{order._id}</td>
                                    <td className="border p-2">{order.userId?.fullName}</td>
                                    <td className="border p-2">
                                        {/* ₹{order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0)} */}
                                        ₹{order.totalPrice}
                                    </td>
                                    <td className="border p-2">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            className="border rounded p-1"
                                        >
                                            <option>Placed</option>
                                            <option>Shipped</option>
                                            <option>Out for delivery</option>
                                            <option>Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
