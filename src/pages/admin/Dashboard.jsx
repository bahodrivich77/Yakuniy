import { motion } from "framer-motion";
import { useCars } from "../../context/CarsContext";
import { useOrder } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";
import { FiTruck, FiShoppingBag, FiUsers, FiDollarSign, FiTrendingUp, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";

const statusColors = {
  pending: "bg-yellow-500",
  confirmed: "bg-blue-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

const statusLabels = {
  pending: "Kutilmoqda",
  confirmed: "Tasdiqlandi",
  delivered: "Yetkazildi",
  cancelled: "Bekor qilindi",
};

const Dashboard = () => {
  const { cars } = useCars();
  const { orders } = useOrder();
  const { getAllUsers } = useAuth();
  const users = getAllUsers();

  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  const stats = [
    { label: "Jami avtomobil", value: cars.length, icon: <FiTruck size={22} />, color: "bg-blue-500", link: "/admin/cars" },
    { label: "Jami buyurtma", value: orders.length, icon: <FiShoppingBag size={22} />, color: "bg-purple-500", link: "/admin/orders" },
    { label: "Foydalanuvchilar", value: users.length, icon: <FiUsers size={22} />, color: "bg-green-500", link: "/admin/users" },
    { label: "Daromad", value: `$${totalRevenue.toLocaleString()}`, icon: <FiDollarSign size={22} />, color: "bg-amber-500", link: "/admin/stats" },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-black text-white mb-1">Dashboard</h1>
        <p className="text-zinc-500 text-sm">Umumiy ko'rinish</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={stat.link}
              className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-amber-500/50 transition-all group flex flex-col gap-4 block"
            >
              <div className="flex items-center justify-between">
                <div className={`${stat.color} p-3 rounded-xl text-white`}>
                  {stat.icon}
                </div>
                <FiTrendingUp className="text-zinc-600 group-hover:text-amber-500 transition-colors" size={16} />
              </div>
              <div>
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="text-zinc-500 text-sm mt-1">{stat.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <h3 className="text-white font-black">So'nggi buyurtmalar</h3>
            <Link to="/admin/orders" className="text-amber-500 text-xs font-semibold hover:text-amber-400">
              Barchasi →
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="text-center py-12 text-zinc-600">
              <FiShoppingBag size={32} className="mx-auto mb-2" />
              <p className="text-sm">Buyurtmalar yo'q</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {recentOrders.map((order) => (
                <div key={order.id} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors">
                  <div>
                    <p className="text-white text-sm font-semibold">{order.userName}</p>
                    <p className="text-zinc-500 text-xs flex items-center gap-1 mt-0.5">
                      <FiClock size={10} />
                      {new Date(order.createdAt).toLocaleDateString("uz-UZ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-amber-500 font-black text-sm">${order.total.toLocaleString()}</span>
                    <span className={`text-white text-xs px-2.5 py-1 rounded-full font-semibold ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick stats */}
        <div className="flex flex-col gap-4">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <h3 className="text-white font-black mb-4">Buyurtma holati</h3>
            <div className="flex flex-col gap-3">
              {Object.entries(statusLabels).map(([key, label]) => {
                const count = orders.filter((o) => o.status === key).length;
                const pct = orders.length ? Math.round((count / orders.length) * 100) : 0;
                return (
                  <div key={key}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">{label}</span>
                      <span className="text-white font-semibold">{count}</span>
                    </div>
                    <div className="bg-zinc-800 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${statusColors[key]}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-amber-500 rounded-2xl p-6">
            <p className="text-zinc-900 text-xs font-semibold mb-1">Kutilayotgan</p>
            <p className="text-5xl font-black text-zinc-900">{pendingOrders}</p>
            <p className="text-zinc-800 text-xs mt-1">ta buyurtma tasdiqlanmadi</p>
            <Link to="/admin/orders"
              className="mt-4 block text-center bg-zinc-900 text-amber-500 py-2.5 rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors">
              Ko'rish →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;