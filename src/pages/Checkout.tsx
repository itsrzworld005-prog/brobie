import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

const Checkout: React.FC = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/orders/create.php', {
                user_id: user?.id,
                total_amount: cartTotal,
                shipping_address: address,
                items: cart.map(item => ({
                    product_id: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                    variant_info: item.variant
                }))
            });
            clearCart();
            alert("Order placed successfully!");
            navigate('/orders');
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white pt-28 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                    <div className="space-y-3 mb-4">
                        {cart.map((item) => (
                            <div key={`${item.productId}-${item.variant}`} className="flex justify-between text-sm">
                                <span>{item.name} x {item.quantity} {item.variant ? `(${item.variant})` : ''}</span>
                                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 border-t border-gray-200 flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-6">
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
                        <textarea
                            id="address"
                            required
                            rows={4}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your full shipping address"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
