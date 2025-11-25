import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, Layers } from "lucide-react";

const AdminLayout: React.FC = () => {
    const { user, logout, isAdmin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (!user || !isAdmin) {
        // Redirect to login if not admin
        // In a real app, you might want to show a "Access Denied" page or redirect to home
        // For now, let's redirect to login
        // navigate('/login'); // This causes a render loop if called directly in body
        // Better to handle this in a useEffect or a protected route wrapper
        // For simplicity here, we'll just show access denied
        return <div className="min-h-screen flex items-center justify-center">Access Denied</div>;
    }

    const navItems = [
        { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
        { path: "/admin/products", icon: Package, label: "Products" },
        { path: "/admin/categories", icon: Layers, label: "Categories" },
        { path: "/admin/orders", icon: ShoppingBag, label: "Orders" },
        // { path: "/admin/users", icon: Users, label: "Users" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold tracking-wider">ADMIN</h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                    ? "bg-red-600 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={() => { logout(); navigate('/login'); }}
                        className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white w-full transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
