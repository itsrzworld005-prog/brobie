import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { Package } from "lucide-react";

const Profile: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchOrders = async () => {
                try {
                    const data = await api.getOrders(user.id);
                    setOrders(data);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchOrders();
        }
    }, [user]);

    if (!isAuthenticated) return <div className="min-h-screen pt-28 text-center">Please login to view profile.</div>;

    return (
        <div className="min-h-screen bg-white pt-28 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <div className="mt-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <p className="text-lg font-medium text-gray-900">{user?.name}</p>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
                    {loading ? (
                        <div>Loading orders...</div>
                    ) : orders.length === 0 ? (
                        <div className="text-gray-500">No orders found.</div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                                            <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                            <p className="font-bold text-gray-900">₹{order.total_amount}</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {order.items.map((item: any) => (
                                                <div key={item.id} className="flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                                        {/* Placeholder if image not available in order item (it should be if we stored it or joined properly) */}
                                                        {item.product_image ? (
                                                            <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Package className="w-full h-full p-4 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">{item.product_name}</p>
                                                        {item.variant_info && <p className="text-xs text-gray-500">{item.variant_info}</p>}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Qty: {item.quantity}
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        ₹{item.price}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
