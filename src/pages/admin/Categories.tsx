import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Plus, Edit, Trash2 } from "lucide-react";

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await api.get('/categories/read.php');
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800">
                    <Plus size={20} /> Add Category
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-medium text-gray-500">Name</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Slug</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Description</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {categories.map((category) => (
                            <tr key={category.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={category.image} alt={category.name} className="w-10 h-10 rounded object-cover bg-gray-100" />
                                        <span className="font-medium text-gray-900">{category.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{category.slug}</td>
                                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{category.description}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                                        <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;
