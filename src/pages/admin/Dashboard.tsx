import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        revenue: 0,
        customers: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [products, orders] = await Promise.all([
                    api.getProducts(),
                    api.getAllOrders()
                ]);

                const revenue = orders.reduce((acc: number, order: any) => acc + Number(order.total_amount), 0);
                const uniqueCustomers = new Set(orders.map((o: any) => o.user_id)).size;

                setStats({
                    products: products.length,
                    orders: orders.length,
                    revenue,
                    customers: uniqueCustomers // Approximate
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: "Total Revenue", value: `₹${stats.revenue.toFixed(2)}`, icon: DollarSign, color: "bg-green-500" },
        { label: "Total Orders", value: stats.orders, icon: ShoppingBag, color: "bg-blue-500" },
        { label: "Total Products", value: stats.products, icon: Package, color: "bg-purple-500" },
        { label: "Active Customers", value: stats.customers, icon: Users, color: "bg-orange-500" },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 text-${stat.color.split('-')[1]}-600`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
