import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrder } from "../../context/OrderContext";
import { FiSearch, FiEye, FiX, FiCheck, FiTruck, FiXCircle } from "react-icons/fi";

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusLabels = {
  pending: "Kutilmoqda",
  confirmed: "Tasdiqlandi",
  delivered: "Yetkazildi",
  cancelled: "Bekor qilindi",
};

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useOrder();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = orders.filter((o) => {
    const matchSearch = o.userName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-white">Buyurtmalar</h1>
        <p className="text-zinc-500 text-sm">{orders.length} ta buyurtma</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input type="text" placeholder="Mijoz nomi..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>
        <div className="flex gap-2">
          {["all", ...Object.keys(statusLabels)].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border
                ${filterStatus === s
                  ? "bg-amber-500 text-zinc-900 border-amber-500"
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600"}`}>
              {s === "all" ? "Barchasi" : statusLabels[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                {["#", "Mijoz", "Mahsulotlar", "Jami", "Sana", "Holat", "Amallar"].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 text-zinc-500 text-xs">#{order.id.toString().slice(-4)}</td>
                  <td className="px-6 py-4">
                    <p className="text-white font-semibold text-sm">{order.userName}</p>
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">{order.items.length} ta</td>
                  <td className="px-6 py-4 text-amber-500 font-black">${order.total.toLocaleString()}</td>
                  <td className="px-6 py-4 text-zinc-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString("uz-UZ")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => setSelected(order)}
                      className="p-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all">
                      <FiEye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-zinc-600">
              <p className="text-4xl mb-2">📦</p>
              <p className="text-sm">Buyurtma topilmadi</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 rounded-3xl border border-zinc-700 w-full max-w-lg"
            >
              <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-800">
                <h3 className="text-white font-black text-lg">
                  Buyurtma #{selected.id.toString().slice(-4)}
                </h3>
                <button onClick={() => setSelected(null)} className="text-zinc-400 hover:text-white">
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-zinc-400 text-xs mb-1">Mijoz</p>
                    <p className="text-white font-bold">{selected.userName}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${statusColors[selected.status]}`}>
                    {statusLabels[selected.status]}
                  </span>
                </div>

                <div className="bg-zinc-800 rounded-2xl p-4 mb-6">
                  <p className="text-zinc-400 text-xs mb-3 font-semibold uppercase tracking-wider">Mahsulotlar</p>
                  <div className="flex flex-col gap-3">
                    {selected.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img src={item.image} alt={item.model}
                          className="w-14 h-10 object-cover rounded-xl border border-zinc-700" />
                        <div className="flex-1">
                          <p className="text-white text-sm font-semibold">{item.brand} {item.model}</p>
                          <p className="text-zinc-500 text-xs">{item.year}</p>
                        </div>
                        <p className="text-amber-500 font-black text-sm">${item.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-zinc-700 mt-4 pt-4 flex justify-between">
                    <span className="text-zinc-400 text-sm">Jami</span>
                    <span className="text-amber-500 font-black">${selected.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Status actions */}
                <div className="grid grid-cols-2 gap-3">
                  {selected.status === "pending" && (
                    <>
                      <button
                        onClick={() => { updateOrderStatus(selected.id, "confirmed"); setSelected({ ...selected, status: "confirmed" }); }}
                        className="flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-sm transition-colors">
                        <FiCheck size={15} /> Tasdiqlash
                      </button>
                      <button
                        onClick={() => { updateOrderStatus(selected.id, "cancelled"); setSelected({ ...selected, status: "cancelled" }); }}
                        className="flex items-center justify-center gap-2 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm transition-colors">
                        <FiXCircle size={15} /> Bekor qilish
                      </button>
                    </>
                  )}
                  {selected.status === "confirmed" && (
                    <button
                      onClick={() => { updateOrderStatus(selected.id, "delivered"); setSelected({ ...selected, status: "delivered" }); }}
                      className="col-span-2 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-sm transition-colors">
                      <FiTruck size={15} /> Yetkazildi deb belgilash
                    </button>
                  )}
                  {(selected.status === "delivered" || selected.status === "cancelled") && (
                    <div className="col-span-2 text-center text-zinc-500 text-sm py-2">
                      Bu buyurtma yakunlangan
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminOrders;