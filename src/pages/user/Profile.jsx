import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useOrder } from "../../context/OrderContext";
import { useToast } from "../../context/ToastContext";
import { useLike } from "../../context/LikeContext";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiPhone, FiMail, FiLogOut, FiShoppingBag, FiHeart, FiEdit2, FiCheck, FiPackage } from "react-icons/fi";
import CarCard from "../../components/cards/CarCard";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels = {
  pending: "Kutilmoqda",
  confirmed: "Tasdiqlandi",
  delivered: "Yetkazildi",
  cancelled: "Bekor qilindi",
};

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const { getUserOrders } = useOrder();
  const { likedItems } = useLike();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [tab, setTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "" });

  const orders = getUserOrders(user?.id);

  const handleLogout = () => {
    logout();
    showToast("Chiqildi", "info");
    navigate("/");
  };

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    showToast("Profil yangilandi!", "success");
  };

  const tabs = [
    { key: "profile", label: "Profil", icon: <FiUser size={16} /> },
    { key: "orders", label: `Buyurtmalar (${orders.length})`, icon: <FiShoppingBag size={16} /> },
    { key: "favorites", label: `Sevimlilar (${likedItems.length})`, icon: <FiHeart size={16} /> },
  ];

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Header */}
      <div className="bg-zinc-900 py-12 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-3xl">
              {user?.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">{user?.name}</h1>
              <p className="text-zinc-400 text-sm">{user?.email}</p>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-semibold mt-1 inline-block">
                {user?.role === "admin" ? "Admin" : "Foydalanuvchi"}
              </span>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors text-sm font-medium">
            <FiLogOut /> Chiqish
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-2xl p-1.5 border border-zinc-100 shadow-sm w-fit">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
                ${tab === t.key ? "bg-zinc-900 text-amber-500" : "text-zinc-500 hover:text-zinc-700"}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {tab === "profile" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8 max-w-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-zinc-900">Shaxsiy ma'lumotlar</h2>
              {!editing ? (
                <button onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 text-sm text-amber-600 font-semibold hover:text-amber-500">
                  <FiEdit2 size={14} /> Tahrirlash
                </button>
              ) : (
                <button onClick={handleSave}
                  className="flex items-center gap-1.5 text-sm text-green-600 font-semibold hover:text-green-500">
                  <FiCheck size={14} /> Saqlash
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {[
                { label: "Ism", icon: <FiUser size={15} />, key: "name", editable: true },
                { label: "Telefon", icon: <FiPhone size={15} />, key: "phone", editable: true },
                { label: "Email", icon: <FiMail size={15} />, key: "email", editable: false, value: user?.email },
              ].map((f) => (
                <div key={f.label} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{f.label}</label>
                  {editing && f.editable ? (
                    <input
                      value={form[f.key] || ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 bg-zinc-50"
                    />
                  ) : (
                    <div className="flex items-center gap-2 border border-zinc-100 rounded-xl px-4 py-3 bg-zinc-50">
                      <span className="text-zinc-400">{f.icon}</span>
                      <span className="text-sm text-zinc-700">{f.value || user?.[f.key] || "—"}</span>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">A'zo bo'lgan sana</label>
                <div className="flex items-center gap-2 border border-zinc-100 rounded-xl px-4 py-3 bg-zinc-50">
                  <span className="text-sm text-zinc-700">{user?.createdAt}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {tab === "orders" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {orders.length === 0 ? (
              <div className="text-center py-24">
                <FiPackage size={56} className="text-zinc-300 mx-auto mb-4" />
                <h3 className="text-xl font-black text-zinc-700 mb-2">Buyurtmalar yo'q</h3>
                <p className="text-zinc-400 text-sm mb-6">Hali hech narsa buyurtma qilmadingiz</p>
                <Link to="/cars" className="bg-zinc-900 text-amber-500 font-bold px-6 py-3 rounded-xl hover:bg-zinc-800 transition-colors">
                  Katalogga o'tish
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-zinc-400">Buyurtma #{order.id}</p>
                        <p className="text-xs text-zinc-400">{new Date(order.createdAt).toLocaleDateString("uz-UZ")}</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-zinc-700">{item.brand} {item.model}</span>
                          <span className="font-bold text-zinc-900">${item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="text-sm text-zinc-500">Jami</span>
                      <span className="font-black text-amber-600">${order.total.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Favorites Tab */}
        {tab === "favorites" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {likedItems.length === 0 ? (
              <div className="text-center py-24">
                <FiHeart size={56} className="text-zinc-300 mx-auto mb-4" />
                <h3 className="text-xl font-black text-zinc-700 mb-2">Sevimlilar bo'sh</h3>
                <Link to="/cars" className="bg-zinc-900 text-amber-500 font-bold px-6 py-3 rounded-xl hover:bg-zinc-800 transition-colors">
                  Katalogga o'tish
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {likedItems.map((car) => <CarCard key={car.id} car={car} />)}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;