import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cars } from "../data/cars";
import { useCart } from "../context/CartContext";
import { useLike } from "../context/LikeContext";
import { useToast } from "../context/ToastContext";
import CarCard from "../components/cards/CarCard";
import { FiHeart, FiShoppingCart, FiArrowLeft, FiCheck, FiShield, FiTruck, FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const { addToCart, isInCart } = useCart();
  const { toggleLike, isLiked } = useLike();
  const { showToast } = useToast();

  if (!car) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-6xl mb-4">🚗</p>
      <p className="text-xl font-bold text-zinc-700 mb-4">Avtomobil topilmadi</p>
      <button onClick={() => navigate("/cars")}
        className="bg-zinc-900 text-amber-500 px-6 py-3 rounded-xl font-semibold">
        Katalogga qaytish
      </button>
    </div>
  );

  const similar = cars.filter((c) => c.category === car.category && c.id !== car.id).slice(0, 3);

  const handleCart = () => {
    if (isInCart(car.id)) { showToast("Allaqachon korzinada!", "info"); return; }
    addToCart(car); showToast(`${car.brand} ${car.model} korzinaga qo'shildi!`, "success");
  };

  const handleLike = () => {
    toggleLike(car);
    showToast(isLiked(car.id) ? "Sevimlilardan olib tashlandi" : "Sevimlilarga qo'shildi ❤️",
      isLiked(car.id) ? "info" : "success");
  };

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Back */}
      <div className="bg-zinc-900 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-400 hover:text-amber-500 transition-colors text-sm font-medium">
            <FiArrowLeft /> Orqaga
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm">
              <img
                src={car.images[activeImg]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="flex gap-3 mt-4">
              {car.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`flex-1 rounded-2xl overflow-hidden border-2 transition-all
                    ${activeImg === i ? "border-amber-500 shadow-md" : "border-zinc-100 opacity-60 hover:opacity-100"}`}>
                  <img src={img} alt="" className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div>
                {car.isNew && (
                  <span className="bg-amber-500 text-zinc-900 text-xs font-black px-3 py-1 rounded-lg mb-2 inline-block">
                    YANGI
                  </span>
                )}
                <h1 className="text-4xl font-black text-zinc-900">{car.brand} {car.model}</h1>
                <p className="text-zinc-500 mt-1">{car.year} yil • {car.category}</p>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-5">
              <p className="text-zinc-400 text-sm mb-1">Narxi</p>
              <p className="text-4xl font-black text-amber-500">${car.price.toLocaleString()}</p>
              <p className="text-zinc-500 text-xs mt-1">Muddatli to'lov imkoniyati mavjud</p>
            </div>

            <p className="text-zinc-600 leading-relaxed text-sm">{car.description}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Yoqilg'i", value: car.fuelType },
                { label: "Uzatmalar", value: car.transmission },
                { label: "Rang", value: car.color },
                { label: "Yurish", value: car.mileage === 0 ? "Yangi" : `${car.mileage.toLocaleString()} km` },
              ].map((spec) => (
                <div key={spec.label} className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm">
                  <p className="text-xs text-zinc-400 mb-1">{spec.label}</p>
                  <p className="font-bold text-zinc-800">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Guarantees */}
            <div className="flex gap-3">
              {[
                { icon: <FiShield size={14} />, text: "Kafolat bor" },
                { icon: <FiTruck size={14} />, text: "Yetkazib berish" },
                { icon: <FiCheck size={14} />, text: "Tekshirilgan" },
              ].map((g) => (
                <div key={g.text} className="flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-100 px-3 py-2 rounded-xl">
                  <span className="text-amber-500">{g.icon}</span> {g.text}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all text-sm
                  ${isInCart(car.id)
                    ? "bg-green-500 text-white"
                    : "bg-zinc-900 hover:bg-zinc-800 text-white"}`}
              >
                {isInCart(car.id) ? <><FiCheck /> Korzinada</> : <><FiShoppingCart /> Korzinaga qo'shish</>}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={handleLike}
                className={`px-5 py-4 rounded-2xl border-2 transition-all
                  ${isLiked(car.id)
                    ? "border-red-500 bg-red-50 text-red-500"
                    : "border-zinc-200 text-zinc-400 hover:border-red-400 hover:text-red-400"}`}
              >
                <FiHeart fill={isLiked(car.id) ? "currentColor" : "none"} />
              </motion.button>
            </div>

            <a href="tel:+998901234567"
              className="flex items-center justify-center gap-2 border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-zinc-900 py-3.5 rounded-2xl font-bold transition-all text-sm">
              <FiPhone /> Menejer bilan bog'lanish
            </a>
          </motion.div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-zinc-900 mb-6">O'xshash avtomobillar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similar.map((car) => <CarCard key={car.id} car={car} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetail;