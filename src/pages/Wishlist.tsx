import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Trash2, ShoppingBag } from "lucide-react";

const Wishlist: React.FC = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleMoveToCart = (item: any) => {
        addToCart({
            productId: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
        removeFromWishlist(item.productId);
        alert("Moved to cart!");
    };

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen pt-28 pb-16 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
                <Link to="/collections" className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Explore Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-28 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        <div key={item.productId} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                            <div className="aspect-[4/5] relative bg-gray-100">
                                <img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover object-center" />
                                <button
                                    onClick={() => removeFromWishlist(item.productId)}
                                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-900 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.name}</h3>
                                <p className="text-sm font-medium text-gray-700 mb-4">₹{item.price}</p>

                                <button
                                    onClick={() => handleMoveToCart(item)}
                                    className="w-full py-2 bg-gray-900 text-white text-xs font-semibold tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={14} /> Move to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
