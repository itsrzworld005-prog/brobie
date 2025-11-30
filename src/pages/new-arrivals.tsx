import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        // Assuming the API returns products sorted by creation date or we just take the last few
        // For now, let's reverse them to show "newest" if they are appended sequentially
        setProducts(data.reverse().slice(0, 8));
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="min-h-screen pt-40 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white pt-40 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">New Arrivals</h1>
            <p className="text-gray-600 mt-2">Fresh drops curated for now — limited runs, high impact.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="aspect-[4/5] relative bg-gray-100">
                <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
                  <span className="text-sm font-medium text-gray-900">₹{p.price}</span>
                </div>
                <div className="mt-3">
                  <span className="text-xs font-medium text-blue-600 hover:underline">View Details</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
