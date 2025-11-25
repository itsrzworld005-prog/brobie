import React from "react";
import { Link } from "react-router-dom"; // <-- import Link
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
          
          {/* Logo + About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-red-600 px-4 py-2">
                <span className="text-white font-bold text-2xl tracking-tight">brob</span>
              </div>
              <div className="bg-red-600 px-4 py-2">
                <span className="text-white font-bold text-2xl tracking-tight">ie</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Redefine your style with comfort and confidence. 
              Brobie is your go-to fashion brand for Gen Z essentials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Home</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-red-500 transition-colors">New Arrivals</Link></li>
              <li><Link to="/collections" className="hover:text-red-500 transition-colors">Collections</Link></li>
              <li><Link to="/about" className="hover:text-red-500 transition-colors">About</Link></li>
              {/* <li><Link to="/contact" className="hover:text-red-500 transition-colors">Contact</Link></li> */}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg tracking-wide">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg tracking-wide">Stay Connected</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe for updates on new collections and offers.</p>
            <form className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} <span className="text-white font-semibold">brobie</span>. All rights reserved.
          </p>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-red-500 transition-colors"><Facebook size={18} /></a>
            <a href="#" className="hover:text-red-500 transition-colors"><Instagram size={18} /></a>
            <a href="#" className="hover:text-red-500 transition-colors"><Twitter size={18} /></a>
            <a href="#" className="hover:text-red-500 transition-colors"><Youtube size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
