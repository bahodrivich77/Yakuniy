import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiHeart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useLike } from "../../context/LikeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const { likedItems } = useLike();
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Bosh sahifa" },
    { path: "/cars", label: "Avtomobillar" },
    { path: "/services", label: "Xizmatlar" },
    { path: "/news", label: "Yangiliklar" },
    { path: "/about", label: "Biz haqimizda" },
    { path: "/contact", label: "Aloqa" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Auto<span className="text-gray-800">Market</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600
                  ${isActive(link.path) ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-600"}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Favorites */}
          <Link to="/favorites" className="relative text-gray-600 hover:text-red-500 transition-colors">
            <FiHeart size={22} />
            {likedItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {likedItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors">
            <FiShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Burger Menu */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium transition-colors hover:text-blue-600
                ${isActive(link.path) ? "text-blue-600" : "text-gray-600"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;