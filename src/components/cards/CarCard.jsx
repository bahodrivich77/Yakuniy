import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useLike } from "../../context/LikeContext";
import { useToast } from "../../context/ToastContext";

const CarCard = ({ car }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleLike, isLiked } = useLike();
  const { showToast } = useToast();

  const handleCart = () => {
    if (isInCart(car.id)) { showToast("Allaqachon korzinada!", "info"); return; }
    addToCart(car);
    showToast(`${car.brand} ${car.model} korzinaga qo'shildi!`, "success");
  };

  const handleLike = () => {
    if (isLiked(car.id)) {
      toggleLike(car); showToast("Sevimlilardan olib tashlandi", "info");
    } else {
      toggleLike(car); showToast("Sevimlilarga qo'shildi ❤️", "success");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl shadow-sm border border-zinc-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300 overflow-hidden group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {car.isNew && (
            <span className="bg-amber-500 text-zinc-900 text-xs px-2.5 py-1 rounded-lg font-bold">
              YANGI
            </span>
          )}
          {!car.isNew && (
            <span className="bg-zinc-800 text-white text-xs px-2.5 py-1 rounded-lg font-medium">
              B/U
            </span>
          )}
        </div>

        {/* Like */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleLike}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-sm transition-all
            ${isLiked(car.id)
              ? "bg-red-500 text-white shadow-lg"
              : "bg-white/80 text-zinc-500 hover:bg-red-50 hover:text-red-500"}`}
        >
          <FiHeart size={16} fill={isLiked(car.id) ? "currentColor" : "none"} />
        </motion.button>

        {/* Hover overlay button */}
        <Link
          to={`/cars/${car.id}`}
          className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-amber-500 text-zinc-900 py-2.5 text-sm font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          <FiEye size={16} /> Batafsil ko'rish
        </Link>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-black text-zinc-900">
            {car.brand} {car.model}
          </h3>
          <span className="text-xs text-zinc-400 bg-zinc-100 px-2 py-1 rounded-lg">{car.year}</span>
        </div>

        <div className="flex gap-2 mb-3 flex-wrap">
          {[car.category, car.transmission, car.fuelType].map((tag) => (
            <span key={tag} className="text-xs text-zinc-500 bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{car.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400">Narxi</p>
            <p className="text-2xl font-black text-zinc-900">
              ${car.price.toLocaleString()}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCart}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all
              ${isInCart(car.id)
                ? "bg-green-500 text-white"
                : "bg-zinc-900 hover:bg-zinc-700 text-white"}`}
          >
            <FiShoppingCart size={16} />
            {isInCart(car.id) ? "Qo'shildi" : "Korzina"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;