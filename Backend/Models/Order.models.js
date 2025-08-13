import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Placed", "Shipped", "Out for delivery", "Delivered"],
    default: "Placed"
  },
  placedAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model("Order", orderSchema);
