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
        : "bg-white/90 backdrop-blur-sm"
        }`}
    >
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex items-center justify-between h-24">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-900 hover:text-red-600 transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Logo - Centered on mobile, Left on desktop */}
          <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105 flex justify-center md:justify-start flex-1 md:flex-none">
            <Link to="/" className="block" aria-label="Brob ie home">
              <img
                src="/brob_ie.png"
                alt="Brob ie logo"
                className="h-20 sm:h-24 w-auto object-contain drop-shadow-md contrast-125"
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearchSubmit(); }}
                placeholder="Search for products..."
                className="w-full bg-gray-100 border-none rounded-full py-2 px-4 pl-10 focus:ring-2 focus:ring-red-600 focus:bg-white transition-all"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button onClick={() => setShowSearchMobile(!showSearchMobile)} className="md:hidden text-gray-900">
              <Search size={24} />
            </button>

            <Link to="/wishlist" className="text-gray-900 hover:text-red-600 transition-colors relative">
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group hidden md:block">
                <button className="text-gray-900 hover:text-red-600 transition-colors flex items-center gap-2">
                  <User size={24} />
                  <span className="text-sm font-medium max-w-[100px] truncate">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right border border-gray-100">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Orders</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-900 hover:text-red-600 transition-colors hidden md:block">
                <User size={24} />
              </Link>
            )}

            <Link to="/cart" className="text-gray-900 hover:text-red-600 transition-colors relative">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Category Ribbon (Desktop) */}
      <div className="hidden md:block border-t border-gray-100 bg-white/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 h-12">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wider">Home</Link>
            <Link to="/collections?category=vortex" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wider">Vortex</Link>
            <Link to="/collections?category=hoodies-and-sweatshirt" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wider">Hoodies</Link>
            <Link to="/collections?category=jackets" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wider">Jackets</Link>
            <Link to="/collections?category=t-shirt" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wider">T-Shirts</Link>
            <Link to="/collections?category=bottoms" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wider">Bottoms</Link>
            <Link to="/collections?category=headwear" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wider">Headwear</Link>
            <Link to="/collections?category=accessories" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wider">Accessories</Link>
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
        className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          } overflow-y-auto bg-white border-t border-gray-100 shadow-xl`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/collections?category=vortex" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>Vortex</Link>
          <Link to="/collections?category=hoodies-and-sweatshirt" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>Hoodies</Link>
          <Link to="/collections?category=jackets" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>Jackets</Link>
          <Link to="/collections?category=t-shirt" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>T-Shirts</Link>
          <Link to="/collections?category=bottoms" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>Bottoms</Link>
          <Link to="/collections?category=headwear" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>Headwear</Link>
          <Link to="/collections?category=accessories" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>Accessories</Link>

          <div className="border-t border-gray-200 pt-4 mt-4">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-sm font-medium text-gray-500">Signed in as {user?.name}</div>
                <Link to="/profile" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                <Link to="/orders" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>Orders</Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50 rounded-md">Sign out</button>
              </>
            ) : (
              <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
