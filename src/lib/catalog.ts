export type Product = {
  id: string;
  name: string;
  price: string;
  tag?: "NEW" | "TRENDING" | "LIMITED";
  colorFrom: string;
  colorTo: string;
  imageUrl: string;
};

export const products: Product[] = [
  { id: "1", name: "Aurora Oversized Tee", price: "₹3,199", tag: "NEW", colorFrom: "from-rose-100", colorTo: "to-rose-300", imageUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1000&auto=format&fit=crop" },
  { id: "2", name: "Midnight Cargo Pants", price: "₹5,699", tag: "TRENDING", colorFrom: "from-gray-100", colorTo: "to-gray-300", imageUrl: "https://images.unsplash.com/photo-1520975659191-37b08d84b0bf?q=80&w=1000&auto=format&fit=crop" },
  { id: "3", name: "Nimbus Hoodie", price: "₹4,899", colorFrom: "from-slate-100", colorTo: "to-slate-300", imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000&auto=format&fit=crop" },
  { id: "4", name: "Pulse Running Shorts", price: "₹2,899", tag: "LIMITED", colorFrom: "from-red-100", colorTo: "to-red-300", imageUrl: "https://images.unsplash.com/photo-1520975659191-37b08d84b0bf?q=80&w=1000&auto=format&fit=crop" },
  { id: "5", name: "Ripple Knit Sweater", price: "₹6,299", colorFrom: "from-amber-100", colorTo: "to-amber-300", imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop" },
  { id: "6", name: "Vibe Track Jacket", price: "₹7,499", tag: "TRENDING", colorFrom: "from-indigo-100", colorTo: "to-indigo-300", imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop" },
  { id: "7", name: "Flux Denim", price: "₹6,599", colorFrom: "from-blue-100", colorTo: "to-blue-300", imageUrl: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1000&auto=format&fit=crop" },
  { id: "8", name: "Echo Rib Tank", price: "₹2,399", colorFrom: "from-emerald-100", colorTo: "to-emerald-300", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop" },
];


