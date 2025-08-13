import { NavLink } from "react-router-dom";

const ProductGrid = ({ products }) => {

    // const handleProductClick = (id) => {
    //     console.log("Clicked product ID:", id);
    // };

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
            {products.length > 0 ? (
                products.map((product) => (
                    <div
                        key={product._id}
                        // onClick={() => handleProductClick(product._id)}
                        className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                    >
                        {/* Image */}
                        <NavLink to={`/view-product/${product._id}`}>
                            <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </NavLink>

                        {/* Content */}
                        <div className="p-3">
                            <h3 className="text-md font-semibold text-gray-800 line-clamp-1">
                                {product.title}
                            </h3>
                            <p className="text-blue-600 font-bold mt-1">
                                ₹{product.price.toLocaleString()}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-yellow-500">⭐</span>
                                <span className="text-sm text-gray-600">
                                    {product.rating.toFixed(1)}
                                </span>
                            </div>
                            <p
                                className={`text-sm mt-1 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
                            >
                                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 col-span-full text-center">No products found for this category.</p>
            )}
        </div>
    );
};

export default ProductGrid;
