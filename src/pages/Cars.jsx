import { useState, useEffect } from "react";
import { cars, categories, brands, fuelTypes } from "../data/cars";
import CarCard from "../components/cards/CarCard";
import { CarCardSkeleton } from "../components/ui/Skeleton";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const Cars = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [selectedBrand, setSelectedBrand] = useState("Barchasi");
  const [selectedFuel, setSelectedFuel] = useState("Barchasi");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = cars.filter((car) => {
    const matchSearch =
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "Barchasi" || car.category === selectedCategory;
    const matchBrand =
      selectedBrand === "Barchasi" || car.brand === selectedBrand;
    const matchFuel =
      selectedFuel === "Barchasi" || car.fuelType === selectedFuel;
    const matchPrice = car.price <= maxPrice;
    return matchSearch && matchCategory && matchBrand && matchFuel && matchPrice;
  });

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("Barchasi");
    setSelectedBrand("Barchasi");
    setSelectedFuel("Barchasi");
    setMaxPrice(100000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-8"
      >
        Avtomobillar katalogi
      </motion.h1>

      {/* Search + Filter toggle */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Marka yoki model qidiring..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-colors font-medium
            ${showFilter
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"}`}
        >
          <FiFilter /> Filter
        </button>
      </div>

      {/* Filters */}
      {showFilter && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Kategoriya</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Marka</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {brands.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Yoqilg'i</label>
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {fuelTypes.map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Max narx: ${maxPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min={5000}
              max={100000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
          <div className="md:col-span-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="text-sm text-red-500 hover:underline flex items-center gap-1"
            >
              <FiX /> Filterni tozalash
            </button>
          </div>
        </motion.div>
      )}

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-gray-500 mb-4">{filtered.length} ta avtomobil topildi</p>
      )}

      {/* Cars Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CarCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car, i) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 text-gray-400"
        >
          <p className="text-5xl mb-4">🚗</p>
          <p className="text-xl font-medium">Avtomobil topilmadi</p>
          <p className="text-sm mt-2">Filterni o'zgartirib ko'ring</p>
          <button
            onClick={resetFilters}
            className="mt-4 text-blue-600 hover:underline text-sm"
          >
            Filterni tozalash
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Cars;