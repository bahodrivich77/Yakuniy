import { motion } from "framer-motion";
import { FiCalendar, FiArrowRight } from "react-icons/fi";

const news = [
  {
    id: 1,
    title: "2024 yilning eng yaxshi avtomobillari e'lon qilindi",
    excerpt: "Jahon avtomobil ko'rgazmasida bu yilning eng yaxshi modellari taqdim etildi. Elektr avtomobillar yetakchilik qilmoqda.",
    date: "15 Aprel 2024",
    category: "Yangilik",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    readTime: "3 daqiqa",
  },
  {
    id: 2,
    title: "Elektr avtomobillar narxi pasaymoqda",
    excerpt: "So'nggi ma'lumotlarga ko'ra, elektr avtomobillar narxi 2024 yilda sezilarli darajada pasaydi.",
    date: "10 Aprel 2024",
    category: "Bozor",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600",
    readTime: "5 daqiqa",
  },
  {
    id: 3,
    title: "Chevrolet Uzbekistonda yangi model taqdim etdi",
    excerpt: "GM Uzbekistan kompaniyasi Cobalt modelining yangilangan versiyasini taqdim etdi.",
    date: "5 Aprel 2024",
    category: "Yangi Model",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600",
    readTime: "4 daqiqa",
  },
  {
    id: 4,
    title: "Avtomobil sug'urtasi bo'yicha yangi qoidalar",
    excerpt: "O'zbekistonda avtomobil sug'urtasi sohasida yangi qoidalar joriy etildi.",
    date: "1 Aprel 2024",
    category: "Qonun",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600",
    readTime: "6 daqiqa",
  },
  {
    id: 5,
    title: "Yoz mavsumida avtomobilni qanday saqlash kerak?",
    excerpt: "Issiq ob-havoda avtomobilingizni to'g'ri parvarish qilish bo'yicha mutaxassislar maslahati.",
    date: "28 Mart 2024",
    category: "Maslahat",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
    readTime: "4 daqiqa",
  },
  {
    id: 6,
    title: "AutoMarket — eng ishonchli avtomobil bozori",
    excerpt: "2024 yilgi so'rovnoma natijalariga ko'ra, AutoMarket Uzbekistondagi eng ishonchli platform deb topildi.",
    date: "20 Mart 2024",
    category: "Yangilik",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600",
    readTime: "2 daqiqa",
  },
];

const categoryColors = {
  Yangilik: "bg-blue-100 text-blue-600",
  Bozor: "bg-green-100 text-green-600",
  "Yangi Model": "bg-purple-100 text-purple-600",
  Qonun: "bg-orange-100 text-orange-600",
  Maslahat: "bg-yellow-100 text-yellow-700",
};

const News = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-600 text-white py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          Yangiliklar
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-xl mx-auto"
        >
          Avtomobil dunyosidagi eng so'nggi yangiliklar
        </motion.p>
      </section>

      {/* News Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="overflow-hidden h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[item.category]}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <FiCalendar size={12} /> {item.date}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{item.readTime} o'qish</span>
                  <button className="text-blue-600 text-sm flex items-center gap-1 hover:gap-2 transition-all font-medium">
                    O'qish <FiArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default News;