import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function ViewProduct() {
    
    const productId = useLocation().pathname.split("/")[2];
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const imgRef = useRef();

    const handleAddToCart = async (productId) => {
        try {
            const res = await axios.post(
                '/api/cart/add',
                { productId },
                { withCredentials: true }
            );
            toast.success("Added to cart!");
        } catch (err) {
            console.error(err);
            toast.error("Please login first.");
        }
    };


    const getProduct = async () => {
        try {
            const res = await axios.get(`/api/product/view-product/${productId}`);
            setProduct(res.data[0]); // Adjust depending on your API response
            document.title = res.data[0].title;
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (!product) return <p className="text-center py-10">No product found</p>;

    return (
        <div className="max-w-6xl mx-auto p-4 font-sans">

            {/* Product Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 mb-8">

                {/* Images Section */}
                <div className="flex-1">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        ref={imgRef}
                        className="w-full rounded-lg shadow-md object-cover"
                    />

                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Product ${index}`}
                                onClick={() => { imgRef.current.src = img; }}
                                className="w-20 h-20 object-cover rounded-md border hover:scale-105 transition-transform duration-200 cursor-pointer"
                            />
                        ))}
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex-1 space-y-3">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="text-gray-500 text-sm">{product.brand} • {product.category}</p>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                        <span className="text-red-600 text-2xl font-bold">
                            ₹{(product.price).toFixed(2)}
                        </span>
                        <span className="line-through text-gray-400">₹{(product.price + (product.price * product.discountPercentage) / 100).toFixed(2)}</span>
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                            {product.discountPercentage}% OFF
                        </span>
                    </div>

                    <button
                        onClick={() => handleAddToCart(product._id)}
                        className="self-start px-8 py-3 mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
                    >
                        🛒 Add to Cart
                    </button>

                    {/* Extra Info */}
                    <p className="text-sm"><strong>⭐ Rating:</strong> {product.rating}</p>
                    <p className="text-sm"><strong>Stock:</strong> {product.stock} available</p>
                    <p className="text-sm"><strong>Warranty:</strong> {product.warrantyInformation}</p>

                    {/* Dimensions */}
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        <strong>Dimensions:</strong>
                        <ul className="list-disc ml-5">
                            <li>Width: {product.dimensions.width} cm</li>
                            <li>Height: {product.dimensions.height} cm</li>
                            <li>Depth: {product.dimensions.depth} cm</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="border border-gray-200 p-4 rounded-lg bg-gray-50 hover:shadow transition-shadow duration-200">
                                <p className="text-sm"><strong>User:</strong> {review.userId}</p>
                                <p className="text-sm"><strong>Rating:</strong> ⭐ {review.rating}</p>
                                <p className="text-gray-700">{review.comment}</p>
                                <small className="text-xs text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </small>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )}
            </div>
        </div>
    );
}

export default ViewProduct;
