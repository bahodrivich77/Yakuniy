import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cars } from "../data/cars";
import { useCart } from "../context/CartContext";
import { useLike } from "../context/LikeContext";
import { useToast } from "../context/ToastContext";
import CarCard from "../components/cards/CarCard";
import { FiHeart, FiShoppingCart, FiArrowLeft, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const { addToCart, isInCart } = useCart();
  const { toggleLike, isLiked } = useLike();
  const { showToast } = useToast();

  if (!car) {
    return (
      <div className="text-center py-24">
        <p className="text-5xl mb-4">🚗</p>
        <p className="text-xl font-medium text-gray-600">Avtomobil topilmadi</p>
        <button
          onClick={() => navigate("/cars")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Katalogga qaytish
        </button>
      </div>
    );
  }

  const similar = cars.filter((c) => c.category === car.category && c.id !== car.id).slice(0, 3);

  const handleCart = () => {
    if (isInCart(car.id)) {
      showToast("Allaqachon korzinada!", "info");
      return;
    }
    addToCart(car);
    showToast(`${car.brand} ${car.model} korzinaga qo'shildi!`, "success");
  };

  const handleLike = () => {
    toggleLike(car);
    showToast(
      isLiked(car.id) ? "Sevimlilardan olib tashlandi" : "Sevimlilarga qo'shildi ❤️",
      isLiked(car.id) ? "info" : "success"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6"
      >
        <FiArrowLeft /> Orqaga
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <img
            src={car.images[activeImg]}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-80 object-cover rounded-2xl shadow-lg"
          />
          <div className="flex gap-3 mt-4">
            {car.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}>
                <img
                  src={img}
                  alt=""
                  className={`w-20 h-16 object-cover rounded-lg border-2 transition-all
                    ${activeImg === i ? "border-blue-600 scale-105" : "border-gray-200 opacity-70"}`}
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 mt-1">{car.year} yil • {car.category}</p>
            </div>
            {car.isNew && (
              <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full font-medium">
                Yangi
              </span>
            )}
          </div>

          <p className="text-3xl font-bold text-blue-600">
            ${car.price.toLocaleString()}
          </p>

          <p className="text-gray-600 leading-relaxed">{car.description}</p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-2xl p-4">
            {[
              { label: "Yoqilg'i", value: car.fuelType },
              { label: "Uzatmalar", value: car.transmission },
              { label: "Rang", value: car.color },
              { label: "Yurish", value: car.mileage === 0 ? "Yangi" : `${car.mileage.toLocaleString()} km` },
            ].map((spec) => (
              <div key={spec.label} className="bg-white rounded-xl p-3 shadow-sm">
                <p className="text-xs text-gray-400">{spec.label}</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all
                ${isInCart(car.id)
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              {isInCart(car.id) ? <><FiCheck /> Korzinada</> : <><FiShoppingCart /> Korzinaga</>}
            </button>
            <button
              onClick={handleLike}
              className={`px-5 py-3 rounded-xl border-2 transition-all
                ${isLiked(car.id)
                  ? "border-red-500 bg-red-50 text-red-500"
                  : "border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-400"}`}
            >
              <FiHeart fill={isLiked(car.id) ? "currentColor" : "none"} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Similar Cars */}
      {similar.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">O'xshash avtomobillar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetail;