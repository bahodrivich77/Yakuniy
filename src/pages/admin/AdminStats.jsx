import { motion } from "framer-motion";
import { useCars } from "../../context/CarsContext";
import { useOrder } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";
import { FiTrendingUp, FiDollarSign, FiShoppingBag, FiUsers } from "react-icons/fi";

const AdminStats = () => {
  const { cars } = useCars();
  const { orders } = useOrder();
  const { getAllUsers } = useAuth();
  const users = getAllUsers();

  const delivered = orders.filter((o) => o.status === "delivered");
  const totalRevenue = delivered.reduce((s, o) => s + o.total, 0);
  const avgOrder = delivered.length ? Math.round(totalRevenue / delivered.length) : 0;

  const categoryStats = cars.reduce((acc, car) => {
    acc[car.category] = (acc[car.category] || 0) + 1;
    return acc;
  }, {});

  const brandStats = cars.reduce((acc, car) => {
    acc[car.brand] = (acc[car.brand] || 0) + 1;
    return acc;
  }, {});

  const statusStats = {
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const bigStats = [
    { label: "Umumiy daromad", value: `$${totalRevenue.toLocaleString()}`, icon: <FiDollarSign size={20} />, color: "bg-amber-500" },
    { label: "Jami buyurtma", value: orders.length, icon: <FiShoppingBag size={20} />, color: "bg-blue-500" },
    { label: "O'rtacha buyurtma", value: `$${avgOrder.toLocaleString()}`, icon: <FiTrendingUp size={20} />, color: "bg-green-500" },
    { label: "Foydalanuvchilar", value: users.length, icon: <FiUsers size={20} />, color: "bg-purple-500" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-white">Statistika</h1>
        <p className="text-zinc-500 text-sm">Umumiy ko'rsatkichlar</p>
      </div>

      {/* Big stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {bigStats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6"
          >
            <div className={`${s.color} p-3 rounded-xl text-white w-fit mb-4`}>{s.icon}</div>
            <p className="text-3xl font-black text-white">{s.value}</p>
            <p className="text-zinc-500 text-sm mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
          <h3 className="text-white font-black mb-5">Kategoriya bo'yicha</h3>
          <div className="flex flex-col gap-4">
            {Object.entries(categoryStats).map(([cat, count]) => {
              const pct = Math.round((count / cars.length) * 100);
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-zinc-300">{cat}</span>
                    <span className="text-amber-500 font-bold">{count} ta</span>
                  </div>
                  <div className="bg-zinc-800 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-2 bg-amber-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
          <h3 className="text-white font-black mb-5">Marka bo'yicha</h3>
          <div className="flex flex-col gap-4">
            {Object.entries(brandStats).map(([brand, count]) => {
              const pct = Math.round((count / cars.length) * 100);
              return (
                <div key={brand}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-zinc-300">{brand}</span>
                    <span className="text-blue-400 font-bold">{count} ta</span>
                  </div>
                  <div className="bg-zinc-800 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="h-2 bg-blue-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Orders status */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
          <h3 className="text-white font-black mb-5">Buyurtma holati</h3>
          <div className="flex flex-col gap-4">
            {[
              { key: "pending", label: "Kutilmoqda", color: "bg-yellow-500" },
              { key: "confirmed", label: "Tasdiqlandi", color: "bg-blue-500" },
              { key: "delivered", label: "Yetkazildi", color: "bg-green-500" },
              { key: "cancelled", label: "Bekor", color: "bg-red-500" },
            ].map((s) => {
              const count = statusStats[s.key];
              const pct = orders.length ? Math.round((count / orders.length) * 100) : 0;
              return (
                <div key={s.key}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-zinc-300">{s.label}</span>
                    <span className="text-white font-bold">{count}</span>
                  </div>
                  <div className="bg-zinc-800 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className={`h-2 ${s.color} rounded-full`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top cars */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
        <h3 className="text-white font-black mb-5">Barcha avtomobillar narxi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...cars].sort((a, b) => b.price - a.price).map((car) => (
            <div key={car.id} className="flex items-center gap-3 bg-zinc-800 rounded-xl p-3">
              <img src={car.image} alt={car.model}
                className="w-14 h-10 object-cover rounded-lg border border-zinc-700" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold truncate">{car.brand} {car.model}</p>
                <p className="text-zinc-500 text-xs">{car.year}</p>
              </div>
              <p className="text-amber-500 font-black text-sm flex-shrink-0">${car.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;