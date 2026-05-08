import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useLike } from "../../context/LikeContext";
import { useToast } from "../../context/ToastContext";

const CarCard = ({ car }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleLike, isLiked } = useLike();
  const { showToast } = useToast();

  const handleCart = () => {
    if (isInCart(car.id)) {
      showToast("Allaqachon korzinada!", "info");
      return;
    }
    addToCart(car);
    showToast(`${car.brand} ${car.model} korzinaga qo'shildi!`, "success");
  };

  const handleLike = () => {
    if (isLiked(car.id)) {
      toggleLike(car);
      showToast("Sevimlilardan olib tashlandi", "info");
    } else {
      toggleLike(car);
      showToast("Sevimlilarga qo'shildi ❤️", "success");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden h-48">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {car.isNew && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            Yangi
          </span>
        )}
        <button
          onClick={handleLike}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow transition-colors duration-200
            ${isLiked(car.id) ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
        >
          <FiHeart size={18} fill={isLiked(car.id) ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">
          {car.brand} {car.model}
        </h3>
        <p className="text-sm text-gray-500 mb-1">
          {car.year} • {car.category} • {car.transmission}
        </p>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{car.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ${car.price.toLocaleString()}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleCart}
              className={`p-2 rounded-lg transition-colors duration-200
                ${isInCart(car.id)
                  ? "bg-green-100 text-green-600"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
            >
              <FiShoppingCart size={18} />
            </button>
            <Link
              to={`/cars/${car.id}`}
              className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Batafsil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;