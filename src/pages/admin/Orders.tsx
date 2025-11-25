import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Eye } from "lucide-react";

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await api.get('/orders/read.php');
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        try {
            // Implement update status API call
            // await api.post('/orders/update_status.php', { id: orderId, status: newStatus });
            alert(`Status update to ${newStatus} not fully implemented in this demo.`);
            // Optimistic update
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Orders</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-medium text-gray-500">Order ID</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Customer</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Date</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Total</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                                <td className="px-6 py-4 text-gray-600">{order.user_name || 'Guest'}</td>
                                <td className="px-6 py-4 text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-gray-900">₹{order.total_amount}</td>
                                <td className="px-6 py-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize border-none focus:ring-2 focus:ring-offset-1 ${order.status === 'delivered' ? 'bg-green-100 text-green-800 focus:ring-green-500' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800 focus:ring-red-500' :
                                                    'bg-yellow-100 text-yellow-800 focus:ring-yellow-500'
                                            }`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="p-1 text-gray-600 hover:bg-gray-100 rounded"><Eye size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
