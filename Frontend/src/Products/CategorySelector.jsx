import React, { useEffect, useState } from "react";
import axios from "axios";

const CategorySelector = ({ onCategoryChange }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    const allCategory = {
        _id: "",
        name: "All Category"
    }

    const handleCategoryClick = (category) => {
        setActiveCategory(category._id);
        onCategoryChange(category._id);

        
    };

    const getCategories = async () => {
        try {
            const res = await axios.get("/api/product/categories");
            const addAllCategory = res.data;
            addAllCategory.unshift(allCategory);
            setCategories(addAllCategory);
            if (res.data.length > 0) {
                // Select the first category by default
                const defaultCategory = res.data[0];
                setActiveCategory(defaultCategory._id);
                onCategoryChange(defaultCategory._id);
            }
        } catch (err) {
            console.log("Error: ", err);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="p-4">
            {/* Mobile View - Select Dropdown */}
            <div className="block md:hidden mb-4">
                <select
                    onChange={(e) => {
                        const selected = categories.find(c => c._id === e.target.value);
                        handleCategoryClick(selected);
                    }}
                    value={activeCategory || ""}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Desktop View - Sidebar */}
            <div className="hidden md:block w-64 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-3">Categories</h2>
                <div className="flex flex-col gap-2">

                    {categories.map((category) => (
                        <button
                            key={category._id}
                            onClick={() => handleCategoryClick(category)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 text-left
                                ${activeCategory === category._id
                                    ? "bg-blue-600 text-white shadow-lg scale-105"
                                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                                }`}
                        >
                            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategorySelector;
