import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Plus, Edit, Trash2 } from "lucide-react";

const Products: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    // const [loading, setLoading] = useState(true);
    // Simple state for adding product - in real app would be a modal or separate page
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        category_id: "",
        description: "",
        image: ""
    });
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [productsData, categoriesData] = await Promise.all([
                api.getProducts(),
                api.getCategories()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                // Implement delete API call
                // await api.post('/products/delete.php', { id });
                alert("Delete functionality not fully implemented in this demo.");
                // Refresh list
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Implement create API call
            // await api.post('/products/create.php', newProduct);
            alert("Create functionality not fully implemented in this demo.");
            setShowAddForm(false);
            // Refresh list
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
                >
                    <Plus size={20} /> Add Product
                </button>
            </div>

            {showAddForm && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                    <h2 className="text-lg font-bold mb-4">Add New Product</h2>
                    <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text" placeholder="Product Name" className="border p-2 rounded"
                            value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <input
                            type="number" placeholder="Price" className="border p-2 rounded"
                            value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <select
                            className="border p-2 rounded"
                            value={newProduct.category_id} onChange={e => setNewProduct({ ...newProduct, category_id: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <input
                            type="text" placeholder="Image URL" className="border p-2 rounded"
                            value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                        <textarea
                            placeholder="Description" className="border p-2 rounded md:col-span-2"
                            value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 md:col-span-2">
                            Save Product
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-medium text-gray-500">Product</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Category</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Price</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Stock</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover bg-gray-100" />
                                        <span className="font-medium text-gray-900">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{product.category_name}</td>
                                <td className="px-6 py-4 text-gray-900">₹{product.price}</td>
                                <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(product.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
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

export default Products;
