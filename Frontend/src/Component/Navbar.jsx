import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Img/logo.png";
import search from "../Img/search.png";
import userLogo from "../Img/userLogo.png";
import cart from "../Img/cart.png";
import hamberger from "../Img/hamberger.png";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, { credentials: "include" })
            .then(res => {
                if (res.ok) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch(() => setIsLoggedIn(false));
    }, []);

    const handleUserClick = () => {
        if (isLoggedIn) {
            navigate("/profile");
        } else {
            navigate("/login");
        }
    };

    const linkBaseClasses =
        "px-3 py-2 rounded-md transition-all duration-700 hover:underline hover:underline-offset-4";
    const activeLinkClasses = "bg-blue-100 text-blue-700 font-medium";

    return (
        <nav className="w-[82vw] m-auto sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between py-4">
                {/* Logo */}
                <div className="w-[130px]">
                    <img src={logo} alt="logo.png" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:block">
                    <ul className="flex gap-[10px] items-center">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `${linkBaseClasses} ${isActive ? activeLinkClasses : ""}`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/collections"
                                className={({ isActive }) =>
                                    `${linkBaseClasses} ${isActive ? activeLinkClasses : ""}`
                                }
                            >
                                Collections
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `${linkBaseClasses} ${isActive ? activeLinkClasses : ""}`
                                }
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    `${linkBaseClasses} ${isActive ? activeLinkClasses : ""}`
                                }
                            >
                                Contact us
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Desktop Icons */}
                <div className="hidden md:block">
                    <ul className="flex gap-[20px] items-center">
                        <li>
                            <img src={search} alt="search" className="w-[20px]" />
                        </li>
                        <li>
                            <button onClick={handleUserClick}>
                                <img src={userLogo} alt="user" className="w-[20px]" />
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigate("/cart")}>
                                <img src={cart} alt="cart" className="w-[20px]" />
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(true)}>
                        <img src={hamberger} alt="menu" className="w-[25px]" />
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <span className="text-lg font-semibold">Menu</span>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 text-2xl">
                        &times;
                    </button>
                </div>

                <ul className="flex flex-col gap-4 p-4">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${linkBaseClasses} ${isActive ? activeLinkClasses : ""}`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/collections"
                            className={({ isActive }) =>
                                `${linkBaseClasses} ${isActive ? activeLinkClasses : ""}`
                            }
                        >
                            Collections
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `${linkBaseClasses} ${isActive ? activeLinkClasses : ""}`
                            }
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                `${linkBaseClasses} ${isActive ? activeLinkClasses : ""}`
                            }
                        >
                            Contact us
                        </NavLink>
                    </li>
                    <li className="flex gap-8 mt-4">
                        <img src={search} alt="search" className="w-[20px]" />
                        <button onClick={handleUserClick}>
                            <img src={userLogo} alt="user" className="w-[20px]" />
                        </button>
                        <button onClick={() => navigate("/cart")}>
                            <img src={cart} alt="cart" className="w-[20px]" />
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
