import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiHeart, FiHome, FiList, FiTool, FiBook, FiInfo, FiPhone } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useLike } from "../../context/LikeContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/", label: "Bosh sahifa", icon: <FiHome /> },
  { path: "/cars", label: "Avtomobillar", icon: <FiList /> },
  { path: "/services", label: "Xizmatlar", icon: <FiTool /> },
  { path: "/news", label: "Yangiliklar", icon: <FiBook /> },
  { path: "/about", label: "Biz haqimizda", icon: <FiInfo /> },
  { path: "/contact", label: "Aloqa", icon: <FiPhone /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();
  const { likedItems } = useLike();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`hidden md:flex sticky top-0 z-40 w-full transition-all duration-300
          ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white shadow-sm"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between w-full">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Auto<span className="text-gray-800">Market</span>
          </Link>

          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive(link.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link to="/favorites" className="relative p-2 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors">
              <FiHeart size={20} />
              {likedItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {likedItems.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors text-sm font-medium">
              <FiShoppingCart size={18} />
              Korzina
              {cartItems.length > 0 && (
                <span className="bg-white text-blue-600 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-white shadow-sm flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Auto<span className="text-gray-800">Market</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/favorites" className="relative p-2 text-gray-600">
            <FiHeart size={22} />
            {likedItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {likedItems.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative p-2 text-gray-600">
            <FiShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b">
                <span className="text-xl font-bold text-blue-600">
                  Auto<span className="text-gray-800">Market</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <FiX size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-1 px-4 py-6 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                        ${isActive(link.path)
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"}`}
                    >
                      <span className="text-lg">{link.icon}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="px-4 py-6 border-t flex flex-col gap-3">
                <Link
                  to="/favorites"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <FiHeart size={18} /> Sevimlilar
                  {likedItems.length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {likedItems.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all"
                >
                  <FiShoppingCart size={18} /> Korzina
                  {cartItems.length > 0 && (
                    <span className="ml-auto bg-white text-blue-600 text-xs px-2 py-0.5 rounded-full font-bold">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-lg">
        <div className="flex items-center justify-around py-2">
          {[
            { path: "/", icon: <FiHome size={22} />, label: "Bosh" },
            { path: "/cars", icon: <FiList size={22} />, label: "Katalog" },
            { path: "/favorites", icon: <FiHeart size={22} />, label: "Sevimli" },
            { path: "/cart", icon: <FiShoppingCart size={22} />, label: "Korzina" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors relative
                ${isActive(item.path) ? "text-blue-600" : "text-gray-400"}`}
            >
              {item.path === "/favorites" && likedItems.length > 0 && (
                <span className="absolute -top-1 right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {likedItems.length}
                </span>
              )}
              {item.path === "/cart" && cartItems.length > 0 && (
                <span className="absolute -top-1 right-2 bg-blue-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;