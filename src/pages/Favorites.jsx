import { motion, AnimatePresence } from "framer-motion";
import { useLike } from "../context/LikeContext";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import CarCard from "../components/cards/CarCard";

const Favorites = () => {
  const { likedItems, toggleLike } = useLike();
  const { showToast } = useToast();

  const handleRemove = (car) => {
    toggleLike(car);
    showToast("Sevimlilardan olib tashlandi", "info");
  };

  if (likedItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-32 text-center px-4"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-7xl mb-6"
        >
          ❤️
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Sevimlilar bo'sh</h2>
        <p className="text-gray-400 mb-6">Yoqtirgan avtomobilingizni saqlang</p>
        <Link
          to="/cars"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Katalogga o'tish
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FiHeart className="text-red-500" /> Sevimlilar
          <span className="text-lg bg-red-100 text-red-500 px-3 py-1 rounded-full font-medium">
            {likedItems.length} ta
          </span>
        </h1>
      </motion.div>

      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedItems.map((car, i) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.1 }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Favorites;