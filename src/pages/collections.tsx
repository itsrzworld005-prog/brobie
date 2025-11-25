import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { api } from "../services/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Collections: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const categoryId = params.get("category");
  const searchQuery = params.get("search");

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.get(categoryId ? `/products/read.php?category_id=${categoryId}` : '/products/read.php'),
          api.get('/categories/read.php')
        ]);

        let filteredProducts = productsData;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filteredProducts = productsData.filter((p: any) =>
            p.name.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q)
          );
        }

        setProducts(filteredProducts);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryId, searchQuery]);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity: 1
    });
    alert("Added to cart!");
  };

  const handleAddToWishlist = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addToWishlist({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image
    });
    alert("Added to wishlist!");
  };

  if (loading) return <div className="min-h-screen pt-28 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {searchQuery ? `Search results for "${searchQuery}"` :
              categoryId ? categories.find(c => c.id == categoryId)?.name || "Collection" : "All Collections"}
          </h1>
          <p className="text-gray-600 mt-2">
            {products.length} item{products.length === 1 ? "" : "s"} found
          </p>
        </div>

        {/* Categories Grid (only show if no specific category selected) */}
        {!categoryId && !searchQuery && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((c) => (
              <Link key={c.id} to={`/collections?category=${c.id}`} className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[16/10] relative bg-gray-100">
                  <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = `https://picsum.photos/seed/${c.id}/1200/800`; }} />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">{c.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{c.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="aspect-[4/5] relative bg-gray-100">
                <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={(e) => { const target = e.currentTarget as HTMLImageElement; target.onerror = null; target.src = `https://picsum.photos/seed/${p.id}/800/1000`; }} />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
                  <span className="text-sm font-medium text-gray-700">₹{p.price}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={(e) => handleAddToCart(e, p)} className="flex-1 py-2 bg-gray-900 text-white text-xs font-semibold tracking-wider hover:bg-gray-800 transition-colors">Add to cart</button>
                  <button onClick={(e) => handleAddToWishlist(e, p)} className="px-3 py-2 border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50">
                    <HeartIcon filled={false} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center text-gray-500 py-12">No products found.</div>
        )}
      </div>
    </div>
  );
};

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export default Collections;
