import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCars } from "../../context/CarsContext";
import { useToast } from "../../context/ToastContext";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiSearch } from "react-icons/fi";

const empty = {
  brand: "", model: "", year: 2024, price: 0, color: "",
  mileage: 0, fuelType: "Benzin", transmission: "Avtomat",
  category: "Sedan", image: "", images: [],
  description: "", isNew: true, inStock: true, rating: 4.5,
};

const AdminCars = () => {
  const { cars, addCar, updateCar, deleteCar } = useCars();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = cars.filter(
    (c) =>
      c.brand.toLowerCase().includes(search.toLowerCase()) ||
      c.model.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm(empty); setModal("add"); };
  const openEdit = (car) => { setForm(car); setModal("edit"); };

  const handleSave = () => {
    if (!form.brand || !form.model || !form.price) {
      showToast("Majburiy maydonlarni to'ldiring!", "error"); return;
    }
    const carData = {
      ...form,
      price: Number(form.price),
      year: Number(form.year),
      mileage: Number(form.mileage),
      images: form.image ? [form.image] : [],
    };
    if (modal === "add") {
      addCar(carData);
      showToast("Avtomobil qo'shildi! ✅", "success");
    } else {
      updateCar(form.id, carData);
      showToast("Avtomobil yangilandi! ✅", "success");
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    deleteCar(id);
    setDeleteId(null);
    showToast("Avtomobil o'chirildi", "info");
  };

  const fields = [
    { key: "brand", label: "Marka *", type: "text", placeholder: "Chevrolet" },
    { key: "model", label: "Model *", type: "text", placeholder: "Cobalt" },
    { key: "year", label: "Yil", type: "number", placeholder: "2024" },
    { key: "price", label: "Narx ($) *", type: "number", placeholder: "15000" },
    { key: "color", label: "Rang", type: "text", placeholder: "Oq" },
    { key: "mileage", label: "Yurish (km)", type: "number", placeholder: "0" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Avtomobillar</h1>
          <p className="text-zinc-500 text-sm">{cars.length} ta avtomobil</p>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={openAdd}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-black px-5 py-2.5 rounded-xl text-sm transition-colors">
          <FiPlus /> Qo'shish
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
        <input
          type="text"
          placeholder="Marka yoki model qidiring..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                {["Rasm", "Avtomobil", "Yil", "Narx", "Kategoriya", "Holat", "Amallar"].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filtered.map((car) => (
                <motion.tr key={car.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <img src={car.image} alt={car.model}
                      className="w-16 h-12 object-cover rounded-xl border border-zinc-700" />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white font-bold">{car.brand} {car.model}</p>
                    <p className="text-zinc-500 text-xs">{car.color} • {car.transmission}</p>
                  </td>
                  <td className="px-6 py-4 text-zinc-300 text-sm">{car.year}</td>
                  <td className="px-6 py-4 text-amber-500 font-black">${car.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-lg">{car.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${car.isNew ? "bg-green-500/20 text-green-400" : "bg-zinc-700 text-zinc-400"}`}>
                      {car.isNew ? "Yangi" : "B/U"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(car)}
                        className="p-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all">
                        <FiEdit2 size={15} />
                      </button>
                      <button onClick={() => setDeleteId(car.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-zinc-600">
              <p className="text-4xl mb-2">🚗</p>
              <p>Avtomobil topilmadi</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 rounded-3xl border border-zinc-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-800">
                <h3 className="text-white font-black text-xl">
                  {modal === "add" ? "Yangi avtomobil" : "Tahrirlash"}
                </h3>
                <button onClick={() => setModal(null)} className="text-zinc-400 hover:text-white">
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-8 grid grid-cols-2 gap-4">
                {fields.map((f) => (
                  <div key={f.key}>
                    <label className="text-xs font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key] || ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>
                ))}

                {/* Selects */}
                {[
                  { key: "category", label: "Kategoriya", options: ["Sedan", "SUV", "Hatchback", "Minivan"] },
                  { key: "fuelType", label: "Yoqilg'i", options: ["Benzin", "Dizel", "Elektr", "Gaz"] },
                  { key: "transmission", label: "Uzatmalar", options: ["Avtomat", "Mexanik"] },
                ].map((s) => (
                  <div key={s.key}>
                    <label className="text-xs font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">{s.label}</label>
                    <select
                      value={form[s.key] || ""}
                      onChange={(e) => setForm({ ...form, [s.key]: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
                    >
                      {s.options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}

                {/* IsNew toggle */}
                <div className="flex items-center gap-3">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Yangi?</label>
                  <button
                    onClick={() => setForm({ ...form, isNew: !form.isNew })}
                    className={`w-12 h-6 rounded-full transition-all relative ${form.isNew ? "bg-amber-500" : "bg-zinc-700"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${form.isNew ? "left-6" : "left-0.5"}`} />
                  </button>
                </div>

                {/* Image URL */}
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Rasm URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={form.image || ""}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Tavsif</label>
                  <textarea
                    rows={3}
                    placeholder="Avtomobil haqida..."
                    value={form.description || ""}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>
              </div>
              <div className="px-8 pb-8 flex gap-3">
                <button onClick={() => setModal(null)}
                  className="flex-1 py-3.5 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white font-semibold text-sm transition-colors">
                  Bekor qilish
                </button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
                  className="flex-1 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-900 font-black text-sm flex items-center justify-center gap-2 transition-colors">
                  <FiCheck /> Saqlash
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-zinc-900 rounded-2xl border border-zinc-700 p-8 max-w-sm w-full text-center"
            >
              <p className="text-4xl mb-4">🗑️</p>
              <h3 className="text-white font-black text-xl mb-2">O'chirishni tasdiqlang</h3>
              <p className="text-zinc-500 text-sm mb-6">Bu amalni ortga qaytarib bo'lmaydi</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)}
                  className="flex-1 py-3 border border-zinc-700 text-zinc-400 rounded-xl font-semibold text-sm hover:text-white transition-colors">
                  Bekor
                </button>
                <button onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-black text-sm transition-colors">
                  O'chirish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCars;