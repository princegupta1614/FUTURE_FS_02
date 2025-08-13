import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            min: 0, max: 80
        },
        address: {
            type: String
        },
        phone: {
            type: String,
            required: false
        },
        profilePicture: {
            type: String,
            required: false
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);