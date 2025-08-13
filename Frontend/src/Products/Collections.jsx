import React, { useState } from 'react';
import axios from 'axios';
import CategorySelector from './CategorySelector';
import ProductGrid from './ProductGrid';

const Collections = () => {
    document.title = "Product Collections - E-commerce App";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProductsByCategory = async (categoryId) => {
        setLoading(true);
        try {
            // const res = await axios.get(`/api/product/all-products`);
            const res = await axios.get(`/api/product/by-category?id=${categoryId}`);
            setProducts(res.data);
        } catch (err) {
            console.log("Error fetching products:", err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* The CategorySelector component, which will handle the onCategoryChange event */}
            <div className="md:w-auto">
                <CategorySelector onCategoryChange={getProductsByCategory} />
            </div>

            {/* The main content area for products */}
            <div className="flex-1 p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Collection</h1>
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <ProductGrid products={products} />
                )}
            </div>
        </div>
    );
};

export default Collections;
