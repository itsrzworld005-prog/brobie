import React from "react";

type Product = {
  id: string;
  name: string;
  price: string;
  tag?: "NEW" | "TRENDING" | "LIMITED";
  colorFrom: string;
  colorTo: string;
  imageUrl: string;
};

const products: Product[] = [
  { id: "1", name: "Aurora Oversized Tee", price: "₹3,199", tag: "NEW", colorFrom: "from-rose-100", colorTo: "to-rose-300", imageUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1000&auto=format&fit=crop" },
  { id: "2", name: "Midnight Cargo Pants", price: "₹5,699", tag: "TRENDING", colorFrom: "from-gray-100", colorTo: "to-gray-300", imageUrl: "https://images.unsplash.com/photo-1520975659191-37b08d84b0bf?q=80&w=1000&auto=format&fit=crop" },
  { id: "3", name: "Nimbus Hoodie", price: "₹4,899", colorFrom: "from-slate-100", colorTo: "to-slate-300", imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000&auto=format&fit=crop" },
  { id: "4", name: "Pulse Running Shorts Purely made in cotton", price: "₹2,899", tag: "LIMITED", colorFrom: "from-red-100", colorTo: "to-red-300", imageUrl: "https://images.unsplash.com/photo-1520975659191-37b08d84b0bf?q=80&w=1000&auto=format&fit=crop" },
  { id: "5", name: "Ripple Knit Sweater", price: "₹6,299", colorFrom: "from-amber-100", colorTo: "to-amber-300", imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop" },
  { id: "6", name: "Vibe Track Jacket", price: "₹7,499", tag: "TRENDING", colorFrom: "from-indigo-100", colorTo: "to-indigo-300", imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop" },
  { id: "7", name: "Flux Denim", price: "₹6,599", colorFrom: "from-blue-100", colorTo: "to-blue-300", imageUrl: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1000&auto=format&fit=crop" },
  { id: "8", name: "Echo Rib Tank", price: "₹2,399", colorFrom: "from-emerald-100", colorTo: "to-emerald-300", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop" },
];



const new_arrivals: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">New Arrivals</h1>
            <p className="text-gray-600 mt-2">Fresh drops curated for now — limited runs, high impact.</p>
           
          </div>
          <button className="hidden sm:inline-block px-5 py-2 border-2 border-gray-900 text-gray-900 font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-all">View all</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className={`aspect-[4/5] relative bg-gradient-to-br ${p.colorFrom} ${p.colorTo}`}> 
                {p.tag && (
                  <span className="absolute top-3 left-3 z-10 bg-gray-900 text-white text-xs font-bold tracking-widest px-3 py-1">{p.tag}</span>
                )}
                <img src={p.imageUrl} alt={p.name} className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={(e) => { const target = e.currentTarget as HTMLImageElement; target.onerror = null; target.src = `https://picsum.photos/seed/${p.id}/800/1000`; }} />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
                  {/* <span className="text-sm font-medium text-gray-700">{p.price}</span> */}
                </div>
                <div className="mt-3 flex gap-2">
                 
                  <button className="px-3 py-2 border border-white-300 text-blue-700 text-xs font-medium hover:bg-blue-50">Explore Our Items</button>
                  
                    <button type="button" className="px-3 py-2 border border-white-300 text-blue-700 text-xs font-medium hover:bg-blue-50">Product Description</button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default new_arrivals;
