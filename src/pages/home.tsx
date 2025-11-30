import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { api } from "../services/api";

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
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
    fetchData();
  }, []);

  const newArrivals = products.slice(0, 4);
  const featuredCategories = categories.slice(0, 3);

  function slugify(text: string): string {
  return text
    .toLowerCase()                         // convert to lowercase
    .trim()                                // remove spaces around
    .replace(/[\s\_]+/g, "-")              // spaces & underscores → -
    .replace(/[^a-z0-9\-]/g, "")           // remove all non-url-safe chars
    .replace(/\-+/g, "-");                 // collapse multiple dashes
}

  return (
    <div>
      <HeroSection />

      {/* Collections Preview */}
      <section className="bg-white py-4 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Collections</h2>
              <p className="text-gray-600 mt-2">Browse by vibe — find your next uniform.</p>
            </div>
            <Link to="/collections" className="hidden sm:inline-block px-5 py-2 border-2 border-gray-900 text-gray-900 font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-all">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((c) => (
              <Link key={c.id} to={`/collections?category=${slugify(c.name)}`} className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[16/10] relative bg-gray-100">
                  <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = `https://picsum.photos/seed/${c.id}/1200/800`; }} />
                  {/* <span className="absolute top-3 right-3 bg-gray-900 text-white text-xs font-bold tracking-widest px-3 py-1 rounded-full">{c.count} items</span> */}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">{c.name}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/collections" className="inline-block px-5 py-2 border-2 border-gray-900 text-gray-900 font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-all">See all</Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Preview */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">New Arrivals</h2>
              <p className="text-gray-600 mt-2">Fresh fits just dropped.</p>
            </div>
            <Link to="/new-arrivals" className="hidden sm:inline-block px-5 py-2 border-2 border-gray-900 text-gray-900 font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-all">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-[4/5] relative bg-gray-100">
                  <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = `https://picsum.photos/seed/${p.id}/800/1000`; }} />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
                    <span className="text-sm font-medium text-gray-700">₹{p.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/new-arrivals" className="inline-block px-5 py-2 border-2 border-gray-900 text-gray-900 font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-all">See all</Link>
          </div>
        </div>
      </section>


      {/* About Preview */}
      <section className="bg-white pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-red-600 font-medium tracking-[0.25em] text-xs uppercase">About</p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Built for expressive minimalism</h2>
              <p className="mt-3 text-gray-600">Everyday pieces for people who move fast and care about craft. From fabrics to fit, every detail is considered.</p>
              <div className="mt-6 flex gap-3">
                <Link to="/about" className="px-5 py-2 bg-gray-900 text-white text-sm font-semibold tracking-wider hover:bg-gray-800">Learn more</Link>
                <Link to="/new-arrivals" className="px-5 py-2 border border-gray-300 text-sm text-gray-800 font-medium hover:bg-gray-50">Shop new arrivals</Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl overflow-hidden border border-gray-200">
                <img src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop" alt="About visual" className="h-full w-full object-cover" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.onerror = null; t.src = `https://picsum.photos/seed/about/1200/1500`; }} />
              </div>
              <div className="-mt-10 ml-10 w-40 h-40 bg-white rounded-xl shadow-xl border border-gray-200 flex items-center justify-center">
                <div>
                  <p className="text-xs tracking-widest text-gray-500 uppercase">founded</p>
                  <p className="text-xl font-bold text-gray-900">2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
