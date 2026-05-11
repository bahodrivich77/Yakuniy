import { motion, AnimatePresence } from "framer-motion";
import { useLike } from "../context/LikeContext";
import { Link } from "react-router-dom";
import { FiHeart, FiArrowRight } from "react-icons/fi";
import CarCard from "../components/cards/CarCard";

const Favorites = () => {
  const { likedItems } = useLike();

  if (likedItems.length === 0) return (
    <div className="bg-zinc-50 min-h-screen flex flex-col items-center justify-center text-center px-4 py-32">
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
        className="text-8xl mb-6">❤️</motion.div>
      <h2 className="text-2xl font-black text-zinc-800 mb-2">Sevimlilar bo'sh</h2>
      <p className="text-zinc-500 mb-8 text-sm">Yoqtirgan avtomobilingizni saqlang</p>
      <Link to="/cars"
        className="bg-zinc-900 text-amber-500 font-bold px-8 py-4 rounded-2xl hover:bg-zinc-800 transition-colors flex items-center gap-2">
        Katalogga o'tish <FiArrowRight />
      </Link>
    </div>
  );

  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="bg-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <FiHeart className="text-red-500" />
            Sevimlilar
            <span className="text-base bg-red-500 text-white px-3 py-1 rounded-xl font-bold">{likedItems.length} ta</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedItems.map((car, i) => (
              <motion.div key={car.id}
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
    </div>
  );
};

export default Favorites;