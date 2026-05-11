import { useState, useEffect } from "react";
import { cars, categories, brands, fuelTypes } from "../data/cars";
import CarCard from "../components/cards/CarCard";
import { CarCardSkeleton } from "../components/ui/Skeleton";
import { FiSearch, FiFilter, FiX, FiGrid, FiList } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Cars = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [selectedBrand, setSelectedBrand] = useState("Barchasi");
  const [selectedFuel, setSelectedFuel] = useState("Barchasi");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const filtered = cars.filter((car) => {
    const matchSearch =
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "Barchasi" || car.category === selectedCategory;
    const matchBrand = selectedBrand === "Barchasi" || car.brand === selectedBrand;
    const matchFuel = selectedFuel === "Barchasi" || car.fuelType === selectedFuel;
    const matchPrice = car.price <= maxPrice;
    return matchSearch && matchCategory && matchBrand && matchFuel && matchPrice;
  });

  const resetFilters = () => {
    setSearch(""); setSelectedCategory("Barchasi");
    setSelectedBrand("Barchasi"); setSelectedFuel("Barchasi"); setMaxPrice(100000);
  };

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Header */}
      <div className="bg-zinc-900 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black mb-2"
          >
            Avtomobillar <span className="text-amber-500">katalogi</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400"
          >
            {cars.length} ta avtomobil mavjud
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search + Filter */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Marka yoki model qidiring..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-sm"
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                <FiX size={16} />
              </button>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl border font-semibold text-sm transition-all shadow-sm
              ${showFilter
                ? "bg-zinc-900 text-amber-500 border-zinc-900"
                : "bg-white text-zinc-700 border-zinc-200 hover:border-amber-400"}`}
          >
            <FiFilter /> Filter
          </motion.button>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 mb-6 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {[
                  { label: "Kategoriya", value: selectedCategory, onChange: setSelectedCategory, options: categories },
                  { label: "Marka", value: selectedBrand, onChange: setSelectedBrand, options: brands },
                  { label: "Yoqilg'i", value: selectedFuel, onChange: setSelectedFuel, options: fuelTypes },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-semibold text-zinc-500 mb-2 block uppercase tracking-wider">{f.label}</label>
                    <select
                      value={f.value}
                      onChange={(e) => f.onChange(e.target.value)}
                      className="w-full border border-zinc-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 bg-zinc-50"
                    >
                      {f.options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
                <div>
                  <label className="text-xs font-semibold text-zinc-500 mb-2 block uppercase tracking-wider">
                    Max narx: <span className="text-amber-600">${maxPrice.toLocaleString()}</span>
                  </label>
                  <input
                    type="range" min={5000} max={100000} step={1000}
                    value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-amber-500 mt-2"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 pt-4 border-t border-zinc-100">
                <button onClick={resetFilters}
                  className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 font-medium">
                  <FiX size={14} /> Filterni tozalash
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {!loading && (
          <p className="text-sm text-zinc-500 mb-5 font-medium">
            <span className="text-zinc-900 font-bold">{filtered.length}</span> ta avtomobil topildi
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => <CarCardSkeleton key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car, i) => (
              <motion.div key={car.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-32 text-zinc-400"
          >
            <p className="text-6xl mb-4">🚗</p>
            <p className="text-xl font-bold text-zinc-700">Avtomobil topilmadi</p>
            <p className="text-sm mt-2 mb-6">Filterni o'zgartirib ko'ring</p>
            <button onClick={resetFilters}
              className="bg-zinc-900 text-amber-500 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-zinc-800 transition-colors">
              Filterni tozalash
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cars;