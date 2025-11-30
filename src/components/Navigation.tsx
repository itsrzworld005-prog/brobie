import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, User, Search, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  const handleSearchSubmit = () => {
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/collections?search=${encodeURIComponent(q)}`);
    setSearchQuery("");
    setShowSearchMobile(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled
        ? "bg-white/95 backdrop-blur-md shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <Link to="/" className="block" aria-label="Brob ie home">
              <img
                src="/brob_ie.png"
                alt="Brob ie logo"
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-md contrast-125"
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide uppercase">Home</Link>
            <Link to="/collections?category=vortex" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide uppercase">Vortex</Link>
            <Link to="/collections?category=hoodies-and-sweatshirt" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide uppercase">Hoodies</Link>
            <Link to="/collections?category=jackets" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide uppercase">Jackets</Link>
            <Link to="/collections?category=t-shirt" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide uppercase">T-Shirts</Link>
            <Link to="/collections?category=bottoms" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide uppercase">Bottoms</Link>
            <Link to="/collections?category=headwear" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide uppercase">Headwear</Link>
            <Link to="/collections?category=accessories" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide uppercase">Accessories</Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search - expands on hover */}
            <div className="group relative flex items-center text-gray-900 hover:text-red-600 transition-colors">
              <Search size={20} className="shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearchSubmit(); }}
                placeholder="Search"
                className="ml-2 w-0 group-hover:w-56 focus:w-56 transition-all duration-300 bg-transparent border-b border-gray-300 focus:border-red-600 outline-none text-sm placeholder-gray-400"
                aria-label="Search"
              />
            </div>

            <Link to="/wishlist" className="text-gray-900 hover:text-red-600 transition-colors relative">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="text-gray-900 hover:text-red-600 transition-colors flex items-center gap-2">
                  <User size={20} />
                  <span className="text-xs font-medium max-w-[100px] truncate hidden lg:block">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-900 hover:text-red-600 transition-colors">
                <User size={20} />
              </Link>
            )}

            <Link to="/cart" className="text-gray-900 hover:text-red-600 transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Search toggle */}
            <button
              onClick={() => setShowSearchMobile((s) => !s)}
              className="text-gray-900 hover:text-red-600 transition-colors"
              aria-label="Open search"
              title="Search"
            >
              <Search size={22} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-900 hover:text-red-600 transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className={`md:hidden transition-all duration-300 ${showSearchMobile ? "max-h-24 opacity-100" : "max-h-0 opacity-0"} overflow-hidden bg-white border-t border-gray-200`}>
        <div className="px-4 py-3 flex items-center gap-3">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearchSubmit(); }}
            placeholder="Search products..."
            className="flex-1 border-b border-gray-300 focus:border-red-600 outline-none text-sm py-1"
            aria-label="Search"
          />
          <button onClick={handleSearchSubmit} className="text-sm font-semibold text-gray-900 hover:text-red-600">Go</button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden bg-white`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          <Link
            to="/"
            className="block text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide py-2 uppercase"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/collections?category=vortex"
            className="block text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide py-2 uppercase"
            onClick={() => setMobileMenuOpen(false)}
          >
            Vortex
          </Link>
          <Link
            to="/collections?category=hoodies-and-sweatshirt"
            className="block text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide py-2 uppercase"
            onClick={() => setMobileMenuOpen(false)}
          >
            Hoodies
          </Link>
          <Link
            to="/collections?category=jackets"
            className="block text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide py-2 uppercase"
            onClick={() => setMobileMenuOpen(false)}
          >
            Jackets
          </Link>
          <Link
            to="/collections?category=t-shirt"
            className="block text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide py-2 uppercase"
            onClick={() => setMobileMenuOpen(false)}
          >
            T-Shirts
          </Link>
          <Link
            to="/collections?category=bottoms"
            className="block text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide py-2 uppercase"
            onClick={() => setMobileMenuOpen(false)}
          >
            Bottoms
          </Link>
          <Link
            to="/collections?category=headwear"
            className="block text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide py-2 uppercase"
            onClick={() => setMobileMenuOpen(false)}
          >
            Headwear
          </Link>
          <Link
            to="/collections?category=accessories"
            className="block text-sm font-medium text-gray-900 hover:text-red-600 transition-colors tracking-wide py-2 uppercase"
            onClick={() => setMobileMenuOpen(false)}
          >
            Accessories
          </Link>

          {/* Icons */}
          <div className="flex items-center justify-around pt-4 border-t border-gray-200">
            <Link to="/wishlist" className="text-gray-900 hover:text-red-600 transition-colors flex flex-col items-center gap-1">
              <div className="relative">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-xs">Wishlist</span>
            </Link>

            {isAuthenticated ? (
              <Link to="/profile" className="text-gray-900 hover:text-red-600 transition-colors flex flex-col items-center gap-1">
                <User size={20} />
                <span className="text-xs">Profile</span>
              </Link>
            ) : (
              <Link to="/login" className="text-gray-900 hover:text-red-600 transition-colors flex flex-col items-center gap-1">
                <User size={20} />
                <span className="text-xs">Login</span>
              </Link>
            )}

            <Link to="/cart" className="text-gray-900 hover:text-red-600 transition-colors flex flex-col items-center gap-1">
              <div className="relative">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
