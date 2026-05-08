import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingCart, FiArrowLeft } from "react-icons/fi";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const { showToast } = useToast();

  const handleRemove = (car) => {
    removeFromCart(car.id);
    showToast(`${car.brand} ${car.model} olib tashlandi`, "info");
  };

  const handleClear = () => {
    clearCart();
    showToast("Korzina tozalandi", "info");
  };

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-32 text-center px-4"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-7xl mb-6"
        >
          🛒
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Korzina bo'sh</h2>
        <p className="text-gray-400 mb-6">Hali hech narsa qo'shilmagan</p>
        <Link
          to="/cars"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FiArrowLeft /> Katalogga o'tish
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FiShoppingCart /> Korzina
          <span className="text-lg bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
            {cartItems.length} ta
          </span>
        </h1>
        <button
          onClick={handleClear}
          className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
        >
          <FiTrash2 /> Barchasini o'chirish
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <AnimatePresence>
            {cartItems.map((car) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 items-center"
              >
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-28 h-20 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-sm text-gray-500">{car.year} • {car.category}</p>
                  <p className="text-blue-600 font-bold mt-1">
                    ${car.price.toLocaleString()}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemove(car)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiTrash2 size={18} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Jami</h2>
          <div className="flex flex-col gap-3 mb-6">
            {cartItems.map((car) => (
              <div key={car.id} className="flex justify-between text-sm text-gray-600">
                <span>{car.brand} {car.model}</span>
                <span>${car.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-800">
            <span>Umumiy</span>
            <span className="text-blue-600">${totalPrice.toLocaleString()}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors"
            onClick={() => showToast("Buyurtma qabul qilindi! 🎉", "success")}
          >
            Buyurtma berish
          </motion.button>
          <Link
            to="/cars"
            className="block text-center mt-3 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            Xaridni davom ettirish
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;