import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useOrder } from "../../context/OrderContext";
import { FiSearch, FiUser, FiShoppingBag, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";

const AdminUsers = () => {
  const { getAllUsers } = useAuth();
  const { orders } = useOrder();
  const [search, setSearch] = useState("");
  const users = getAllUsers();

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-white">Foydalanuvchilar</h1>
        <p className="text-zinc-500 text-sm">{users.length} ta foydalanuvchi</p>
      </div>

      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
        <input type="text" placeholder="Ism yoki email..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((user, i) => {
          const userOrders = orders.filter((o) => o.userId === user.id);
          const totalSpent = userOrders
            .filter((o) => o.status === "delivered")
            .reduce((s, o) => s + o.total, 0);

          return (
            <motion.div key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 hover:border-amber-500/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-2xl border border-zinc-700">
                  {user.avatar}
                </div>
                <div>
                  <p className="text-white font-black">{user.name}</p>
                  <p className="text-zinc-500 text-xs">{user.email}</p>
                </div>
                <span className={`ml-auto text-xs font-bold px-2.5 py-1 rounded-full
                  ${user.role === "admin"
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-zinc-800 text-zinc-400"}`}>
                  {user.role === "admin" ? "Admin" : "User"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <FiShoppingBag size={14} />, value: userOrders.length, label: "Buyurtma" },
                  { icon: <FiUser size={14} />, value: `$${totalSpent.toLocaleString()}`, label: "Sarflagan" },
                  { icon: <FiCalendar size={14} />, value: user.createdAt, label: "A'zo" },
                ].map((s) => (
                  <div key={s.label} className="bg-zinc-800 rounded-xl p-3 text-center">
                    <div className="text-amber-500 flex justify-center mb-1">{s.icon}</div>
                    <p className="text-white font-bold text-sm">{s.value}</p>
                    <p className="text-zinc-500 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>

              {user.phone && (
                <p className="text-zinc-500 text-xs mt-3 border-t border-zinc-800 pt-3">
                  📞 {user.phone}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-zinc-600">
          <FiUser size={40} className="mx-auto mb-3" />
          <p>Foydalanuvchi topilmadi</p>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;