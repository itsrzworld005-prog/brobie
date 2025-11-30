import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { Star, Truck, ShieldCheck, ArrowRight } from "lucide-react";

import { useToast } from "../context/ToastContext";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [reviews, setReviews] = useState<any[]>([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
    const [submittingReview, setSubmittingReview] = useState(false);
    const { addToCart } = useCart();
    const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
    const { user, isAuthenticated } = useAuth();
    const { showToast } = useToast();

    useEffect(() => {
        const fetchProductAndReviews = async () => {
            try {
                if (!id) return;
                const [productData, reviewsData] = await Promise.all([
                    api.getProduct(id),
                    api.getReviews(id)
                ]);
                setProduct(productData);
                setReviews(reviewsData);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductAndReviews();
    }, [id]);

    if (loading) return <div className="min-h-screen pt-40 text-center">Loading...</div>;
    if (!product) return <div className="min-h-screen pt-40 text-center">Product not found</div>;

    const handleAddToCart = () => {
        addToCart({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            quantity: 1,
            variant: selectedSize && selectedColor ? `Size: ${selectedSize}, Color: ${selectedColor}` : undefined
        });
        showToast("Added to cart!", "success");
    };

    const toggleWishlist = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            showToast("Removed from wishlist", "info");
        } else {
            addToWishlist({
                productId: product.id,
                name: product.name,
                price: Number(product.price),
                image: product.image
            });
            showToast("Added to wishlist!", "success");
        }
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated || !user) {
            showToast("Please login to submit a review", "error");
            return;
        }
        setSubmittingReview(true);
        try {
            await api.addReview({
                product_id: product.id,
                user_id: String(user.id),
                user_name: user.name || user.email.split('@')[0],
                rating: newReview.rating,
                comment: newReview.comment
            });
            // Refresh reviews
            const updatedReviews = await api.getReviews(product.id);
            setReviews(updatedReviews);
            setNewReview({ rating: 5, comment: "" });
            showToast("Review submitted successfully!", "success");
        } catch (error) {
            console.error("Error submitting review:", error);
            showToast("Failed to submit review.", "error");
        } finally {
            setSubmittingReview(false);
        }
    };

    return (
        <div className="min-h-screen bg-white pt-40 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
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
                                    <span className="text-sm font-medium text-gray-700 ml-1">
                                        {reviews.length > 0
                                            ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                                            : "New"}
                                        {' '}({reviews.length} reviews)
                                    </span>
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

                {/* Reviews Section */}
                <div className="border-t border-gray-200 pt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Review Form */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Write a Review</h3>
                                {isAuthenticated ? (
                                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                                        className="focus:outline-none"
                                                    >
                                                        <Star
                                                            size={24}
                                                            fill={star <= newReview.rating ? "currentColor" : "none"}
                                                            className={star <= newReview.rating ? "text-yellow-500" : "text-gray-300"}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                                            <textarea
                                                required
                                                rows={4}
                                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-gray-900 focus:border-gray-900"
                                                value={newReview.comment}
                                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                                placeholder="Share your thoughts..."
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={submittingReview}
                                            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-black transition-colors disabled:opacity-50"
                                        >
                                            {submittingReview ? "Submitting..." : "Submit Review"}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-center py-6">
                                        <p className="text-gray-600 mb-4">Please log in to write a review.</p>
                                        <a href="/login" className="text-red-600 font-medium hover:underline">Log in here</a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Reviews List */}
                        <div className="lg:col-span-2 space-y-8">
                            {reviews.length === 0 ? (
                                <p className="text-gray-500 italic">No reviews yet. Be the first to review this product!</p>
                            ) : (
                                reviews.map((review) => (
                                    <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-gray-600">
                                                    {review.user_name?.[0]?.toUpperCase() || 'A'}
                                                </div>
                                                <span className="font-medium text-gray-900">{review.user_name}</span>
                                            </div>
                                            <span className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex text-yellow-500 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                                            ))}
                                        </div>
                                        <p className="text-gray-600">{review.comment}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
