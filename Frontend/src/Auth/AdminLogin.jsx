import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

    document.title = "Admin Login";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/login`, { username, password }, { withCredentials: true });
            toast.success(res.data.message);
            // window.location.href = "/admin";
            navigate("/admin");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-black">
            <ToastContainer />
            <form
                onSubmit={handleLogin}
                className="bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-700 w-full max-w-md"
            >
                <h2 className="text-2xl text-white font-bold mb-6 text-center">
                    🔐 Admin Access
                </h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 mb-4 bg-black text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-6 bg-black text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
