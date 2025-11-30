import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Star, Truck, ShieldCheck, ArrowRight } from "lucide-react";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const { addToCart } = useCart();
    const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!id) return;
                const found = await api.getProduct(id);
                setProduct(found);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen pt-28 text-center">Loading...</div>;
    if (!product) return <div className="min-h-screen pt-28 text-center">Product not found</div>;

    const handleAddToCart = () => {
        addToCart({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            quantity: 1,
            variant: selectedSize && selectedColor ? `Size: ${selectedSize}, Color: ${selectedColor}` : undefined
        });
        alert("Added to cart!");
    };

    const toggleWishlist = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist({
                productId: product.id,
                name: product.name,
                price: Number(product.price),
                image: product.image
            });
        }
    };

    return (
        <div className="min-h-screen bg-white pt-28 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{product.name}</h1>
                            <div className="mt-2 flex items-center gap-4">
                                <p className="text-2xl font-medium text-gray-900">₹{product.price}</p>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-sm font-medium text-gray-700 ml-1">4.8 (120 reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-sm text-gray-600 mb-8">
                            <p>{product.description}</p>
                        </div>

                        {/* Variants (Dummy for now) */}
                        <div className="space-y-6 mb-8">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                                <div className="flex gap-3">
                                    {['Black', 'White', 'Navy'].map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 border text-sm font-medium rounded-md transition-all ${selectedColor === color
                                                ? 'border-gray-900 bg-gray-900 text-white'
                                                : 'border-gray-200 text-gray-900 hover:border-gray-900'
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                                <div className="flex gap-3">
                                    {['S', 'M', 'L', 'XL'].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 flex items-center justify-center border text-sm font-medium rounded-md transition-all ${selectedSize === size
                                                ? 'border-gray-900 bg-gray-900 text-white'
                                                : 'border-gray-200 text-gray-900 hover:border-gray-900'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                Add to Cart <ArrowRight size={20} />
                            </button>
                            <button
                                onClick={toggleWishlist}
                                className={`p-4 border rounded-lg transition-colors ${isInWishlist(product.id)
                                    ? 'border-red-200 bg-red-50 text-red-600'
                                    : 'border-gray-200 text-gray-900 hover:border-gray-900'
                                    }`}
                            >
                                <Star size={24} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
                            <div className="flex items-start gap-3">
                                <Truck className="text-gray-400" size={24} />
                                <div>
                                    <h4 className="font-medium text-gray-900">Free Shipping</h4>
                                    <p className="text-sm text-gray-500">On orders over ₹2000</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="text-gray-400" size={24} />
                                <div>
                                    <h4 className="font-medium text-gray-900">2 Year Warranty</h4>
                                    <p className="text-sm text-gray-500">Full coverage</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
