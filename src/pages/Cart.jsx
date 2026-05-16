import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrder } from "../context/OrderContext";
import { FiTrash2, FiShoppingCart, FiArrowLeft, FiShield, FiTruck } from "react-icons/fi";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const { showToast } = useToast();
  const { user } = useAuth();
  const { createOrder } = useOrder();
  const navigate = useNavigate();

  const handleRemove = (car) => {
    removeFromCart(car.id);
    showToast(`${car.brand} ${car.model} olib tashlandi`, "info");
  };

  if (cartItems.length === 0) return (
    <div className="bg-zinc-50 min-h-screen flex flex-col items-center justify-center text-center px-4 py-32">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="text-8xl mb-6">🛒</motion.div>
      <h2 className="text-2xl font-black text-zinc-800 mb-2">Korzina bo'sh</h2>
      <p className="text-zinc-500 mb-8 text-sm">Hali hech narsa qo'shilmagan</p>
      <Link to="/cars" className="bg-zinc-900 text-amber-500 font-bold px-8 py-4 rounded-2xl hover:bg-zinc-800 transition-colors flex items-center gap-2">
        <FiArrowLeft /> Katalogga o'tish
      </Link>
    </div>
  );

  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="bg-zinc-900 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <FiShoppingCart className="text-amber-500" />
            Korzina
            <span className="text-base bg-amber-500 text-zinc-900 px-3 py-1 rounded-xl font-bold">{cartItems.length} ta</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-end">
            <button onClick={() => { clearCart(); showToast("Korzina tozalandi", "info"); }}
              className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-medium">
              <FiTrash2 size={13} /> Barchasini o'chirish
            </button>
          </div>
          <AnimatePresence>
            {cartItems.map((car) => (
              <motion.div key={car.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30, height: 0 }}
                className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 flex gap-4 items-center"
              >
                <img src={car.image} alt={`${car.brand} ${car.model}`}
                  className="w-32 h-24 object-cover rounded-2xl flex-shrink-0 border border-zinc-100" />
                <div className="flex-1">
                  <h3 className="font-black text-zinc-900 text-lg">{car.brand} {car.model}</h3>
                  <p className="text-sm text-zinc-500">{car.year} • {car.category} • {car.transmission}</p>
                  <p className="text-xl font-black text-amber-600 mt-2">${car.price.toLocaleString()}</p>
                </div>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleRemove(car)}
                  className="p-2.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                  <FiTrash2 size={18} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-4 h-fit sticky top-24">
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
            <h2 className="text-lg font-black text-zinc-900 mb-5 pb-4 border-b border-zinc-100">Buyurtma jami</h2>
            <div className="flex flex-col gap-3 mb-5">
              {cartItems.map((car) => (
                <div key={car.id} className="flex justify-between text-sm text-zinc-600">
                  <span className="truncate mr-2">{car.brand} {car.model}</span>
                  <span className="font-semibold flex-shrink-0">${car.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between font-black text-xl text-zinc-900 mb-6">
              <span>Jami</span>
              <span className="text-amber-600">${totalPrice.toLocaleString()}</span>
            </div>
            <motion.button whileTap={{ scale: 0.97 }}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-amber-500 py-4 rounded-2xl font-black transition-colors text-sm"
              onClick={() => {
                if (!user) {
                  showToast("Buyurtma berish uchun kiring!", "error");
                  return;
                }
                createOrder(user.id, user.name, cartItems, totalPrice);
                clearCart();
                showToast("Buyurtma qabul qilindi! 🎉", "success");
                navigate("/profile");
              }}
            >
              Buyurtma berish →
            </motion.button>
            <Link to="/cars" className="block text-center mt-3 text-sm text-zinc-400 hover:text-amber-600 transition-colors">
              Xaridni davom ettirish
            </Link>
          </div>

          {/* Trust badges */}
          <div className="bg-zinc-900 rounded-2xl p-5 flex flex-col gap-3">
            {[
              { icon: <FiShield size={16} />, text: "Xavfsiz to'lov" },
              { icon: <FiTruck size={16} />, text: "Tez yetkazib berish" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-3 text-sm text-zinc-400">
                <span className="text-amber-500">{b.icon}</span> {b.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;