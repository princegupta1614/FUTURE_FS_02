import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discountPercentage: {
        type: Number,
        default: 0,
        min: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: [String],
        required: true,
    },
    warrantyInformation: {
        type: String,
        required: false,
    },
    dimensions: {
        type: {
            width: { type: Number, required: false },
            height: { type: Number, required: false },
            depth: { type: Number, required: false }
        },
        required: false
    },
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
            rating: { type: Number, required: true, min: 1, max: 5 },
            comment: { type: String, required: false },
            createdAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;