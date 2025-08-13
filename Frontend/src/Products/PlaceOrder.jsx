import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function PlaceOrder({ cart, onOrderPlaced }) {
  const [loading, setLoading] = useState(!cart);
  const [error, setError] = useState(null);
  const [localCart, setLocalCart] = useState(cart);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  useEffect(() => {
    if (!cart) {
      axios.get("/api/cart", { withCredentials: true })
        .then((res) => {
          setLocalCart(res.data);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load cart");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [cart]);

  if (loading) {
    return <p className="mt-4 text-gray-600">Loading cart...</p>;
  }

  const itemsArray = Array.isArray(localCart) ? localCart : localCart?.items || [];

  if (!itemsArray.length) {
    return <p className="mt-4 text-gray-600">Your cart is empty.</p>;
  }

  const totalPrice = itemsArray.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

  const handlePlaceOrder = async () => {
    setError(null);
    try {
      await axios.post("/api/orders/place", {}, { withCredentials: true });
      toast.success(`Order placed successfully with ${paymentMethod}!`);
      onOrderPlaced?.();
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <p><strong>Total Items:</strong> {itemsArray.length}</p>
      <p><strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}</p>

      <div className="mt-3">
        <label className="mr-4">
          <input
            type="radio"
            name="payment"
            value="Cash"
            checked={paymentMethod === "Cash"}
            onChange={() => setPaymentMethod("Cash")}
          /> Cash
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={() => setPaymentMethod("UPI")}
          /> UPI
        </label>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={handlePlaceOrder}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );
}
