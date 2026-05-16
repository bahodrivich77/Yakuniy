import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import {
  FiGrid, FiTruck, FiUsers, FiShoppingBag,
  FiLogOut, FiMenu, FiX, FiBarChart2,
  FiSettings, FiChevronRight,
} from "react-icons/fi";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: <FiGrid size={18} /> },
  { path: "/admin/cars", label: "Avtomobillar", icon: <FiTruck size={18} /> },
  { path: "/admin/orders", label: "Buyurtmalar", icon: <FiShoppingBag size={18} /> },
  { path: "/admin/users", label: "Foydalanuvchilar", icon: <FiUsers size={18} /> },
  { path: "/admin/stats", label: "Statistika", icon: <FiBarChart2 size={18} /> },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast("Admin paneldan chiqildi", "info");
    navigate("/");
  };

  const isActive = (path) =>
    path === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25 }}
            className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col flex-shrink-0"
          >
            {/* Logo */}
            <div className="px-6 py-5 border-b border-zinc-800">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-amber-500 text-zinc-900 font-black text-xs px-2 py-1 rounded-lg">AM</div>
                <span className="text-white font-black">Auto<span className="text-amber-500">Market</span></span>
              </Link>
              <p className="text-zinc-500 text-xs mt-1">Admin Panel</p>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group
                    ${isActive(item.path)
                      ? "bg-amber-500 text-zinc-900"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
                >
                  {item.icon}
                  {item.label}
                  {isActive(item.path) && <FiChevronRight className="ml-auto" size={14} />}
                </Link>
              ))}
            </nav>

            {/* User info */}
            <div className="px-3 py-4 border-t border-zinc-800">
              <div className="flex items-center gap-3 px-4 py-3 bg-zinc-800 rounded-xl mb-2">
                <div className="text-2xl">{user?.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-bold truncate">{user?.name}</p>
                  <p className="text-zinc-500 text-xs truncate">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-medium"
              >
                <FiLogOut size={16} /> Chiqish
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
            <h2 className="text-white font-black text-lg">
              {navItems.find((n) => isActive(n.path))?.label || "Admin Panel"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/"
              className="text-xs text-zinc-400 hover:text-amber-500 transition-colors font-medium">
              ← Saytga qaytish
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;