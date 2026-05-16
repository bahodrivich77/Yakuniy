import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu, FiX, FiShoppingCart, FiHeart,
  FiHome, FiList, FiTool, FiBook, FiInfo,
  FiPhone, FiSearch, FiUser,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useLike } from "../../context/LikeContext";
import { useToast } from "../../context/ToastContext";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { path: "/", label: "Bosh sahifa", icon: <FiHome /> },
  { path: "/cars", label: "Avtomobillar", icon: <FiList /> },
  { path: "/services", label: "Xizmatlar", icon: <FiTool /> },
  { path: "/news", label: "Yangiliklar", icon: <FiBook /> },
  { path: "/faq", label: "FAQ", icon: <FiInfo /> },
  { path: "/about", label: "Biz haqimizda", icon: <FiInfo /> },
  { path: "/contact", label: "Aloqa", icon: <FiPhone /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();
  const { likedItems } = useLike();
  const { user, isAdmin, logout } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        className={`hidden md:block sticky top-0 z-40 w-full transition-all duration-300
          ${scrolled
            ? "bg-zinc-900/95 backdrop-blur-md shadow-2xl"
            : "bg-zinc-900"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="bg-amber-500 text-zinc-900 font-black text-sm px-2.5 py-1.5 rounded-lg tracking-wider">
              AM
            </div>
            <span className="text-white font-black text-xl tracking-tight">
              Auto<span className="text-amber-500">Market</span>
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-lg relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              type="text"
              placeholder="Marka, model yoki yil..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-800 text-zinc-100 placeholder-zinc-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          {/* Nav links */}
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                    ${isActive(link.path)
                      ? "bg-amber-500 text-zinc-900 font-semibold"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800"}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to="/favorites"
              className="relative p-2.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors">
              <FiHeart size={20} />
              {likedItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {likedItems.length}
                </span>
              )}
            </Link>
            <Link to="/cart"
              className="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 px-4 py-2.5 rounded-xl transition-colors text-sm font-bold">
              <FiShoppingCart size={18} />
              Korzina
              {cartItems.length > 0 && (
                <span className="bg-zinc-900 text-amber-400 text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {/* User menu */}
            {user ? (
              <div className="relative group">
                <button type="button" className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-3 py-2.5 rounded-xl transition-colors">
                  <span className="text-lg">{user.avatar}</span>
                  <span className="text-zinc-300 text-sm font-semibold max-w-20 truncate">{user.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="p-2">
                    <Link to="/profile"
                      className="flex items-center gap-2 px-3 py-2.5 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl text-sm transition-colors">
                      👤 Profil
                    </Link>
                    {isAdmin && (
                      <Link to="/admin"
                        className="flex items-center gap-2 px-3 py-2.5 text-amber-400 hover:bg-amber-500/10 rounded-xl text-sm transition-colors font-semibold">
                        ⚡ Admin Panel
                      </Link>
                    )}
                    <button type="button" onClick={() => { logout(); showToast("Chiqildi", "info"); }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl text-sm transition-colors">
                      🚪 Chiqish
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login"
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2.5 rounded-xl transition-colors text-sm font-semibold">
                <FiUser size={16} /> Kirish
              </Link>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-zinc-900 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-amber-500 text-zinc-900 font-black text-xs px-2 py-1 rounded-md">AM</div>
            <span className="text-white font-black text-lg">
              Auto<span className="text-amber-500">Market</span>
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <Link to="/favorites" className="relative p-2 text-zinc-400">
              <FiHeart size={22} />
              {likedItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {likedItems.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 text-zinc-400">
              <FiShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-zinc-900 text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-white transition-colors">
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
            <input
              type="text"
              placeholder="Avtomobil qidiring..."
              className="w-full pl-9 pr-4 py-2.5 bg-zinc-800 text-zinc-100 placeholder-zinc-500 rounded-xl text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/70 z-40"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 h-full w-72 bg-zinc-900 z-50 shadow-2xl flex flex-col border-l border-zinc-800"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
                <span className="text-xl font-black text-white">
                  Auto<span className="text-amber-500">Market</span>
                </span>
                <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-400 hover:text-white">
                  <FiX size={22} />
                </button>
              </div>
              <div className="flex flex-col gap-1 px-4 py-4 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link to={link.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                        ${isActive(link.path)
                          ? "bg-amber-500 text-zinc-900 font-semibold"
                          : "text-zinc-300 hover:bg-zinc-800 hover:text-white"}`}>
                      <span>{link.icon}</span>{link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="px-4 py-4 border-t border-zinc-800 flex flex-col gap-2">
                <Link to="/favorites"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-all">
                  <FiHeart size={18} /> Sevimlilar
                  {likedItems.length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{likedItems.length}</span>
                  )}
                </Link>
                <Link to="/cart"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500 text-zinc-900 text-sm font-bold hover:bg-amber-400 transition-all">
                  <FiShoppingCart size={18} /> Korzina
                  {cartItems.length > 0 && (
                    <span className="ml-auto bg-zinc-900 text-amber-400 text-xs px-2 py-0.5 rounded-full font-black">{cartItems.length}</span>
                  )}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-900 border-t border-zinc-800">
        <div className="flex items-center justify-around py-2">
          {[
            { path: "/", icon: <FiHome size={22} />, label: "Bosh" },
            { path: "/cars", icon: <FiList size={22} />, label: "Katalog" },
            { path: "/favorites", icon: <FiHeart size={22} />, label: "Sevimli" },
            { path: "/cart", icon: <FiShoppingCart size={22} />, label: "Korzina" },
          ].map((item) => (
            <Link key={item.path} to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-colors relative
                ${isActive(item.path) ? "text-amber-500" : "text-zinc-500"}`}>
              {item.path === "/favorites" && likedItems.length > 0 && (
                <span className="absolute -top-1 right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{likedItems.length}</span>
              )}
              {item.path === "/cart" && cartItems.length > 0 && (
                <span className="absolute -top-1 right-2 bg-amber-500 text-zinc-900 text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartItems.length}</span>
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
