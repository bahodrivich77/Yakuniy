import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-8xl mb-6"
      >
        🚗
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-8xl font-black text-blue-600 mb-2"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-gray-700 mb-2"
      >
        Sahifa topilmadi
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 mb-8 max-w-md"
      >
        Siz izlayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4 flex-wrap justify-center"
      >
        <Link
          to="/"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          <FiHome /> Bosh sahifaga
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 border-2 border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 px-6 py-3 rounded-xl font-medium transition-colors"
        >
          <FiArrowLeft /> Orqaga
        </button>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;