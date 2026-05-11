import { useState } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiArrowRight, FiClock, FiTag } from "react-icons/fi";

const news = [
  {
    id: 1,
    title: "2024 yilning eng yaxshi avtomobillari e'lon qilindi",
    excerpt: "Jahon avtomobil ko'rgazmasida bu yilning eng yaxshi modellari taqdim etildi. Elektr avtomobillar yetakchilik qilmoqda.",
    date: "15 Aprel 2024",
    category: "Yangilik",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    readTime: "3 daqiqa",
    featured: true,
  },
  {
    id: 2,
    title: "Elektr avtomobillar narxi pasaymoqda",
    excerpt: "So'nggi ma'lumotlarga ko'ra, elektr avtomobillar narxi 2024 yilda sezilarli darajada pasaydi.",
    date: "10 Aprel 2024",
    category: "Bozor",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800",
    readTime: "5 daqiqa",
    featured: false,
  },
  {
    id: 3,
    title: "Chevrolet Uzbekistonda yangi model taqdim etdi",
    excerpt: "GM Uzbekistan kompaniyasi Cobalt modelining yangilangan versiyasini taqdim etdi.",
    date: "5 Aprel 2024",
    category: "Yangi Model",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
    readTime: "4 daqiqa",
    featured: false,
  },
  {
    id: 4,
    title: "Avtomobil sug'urtasi bo'yicha yangi qoidalar",
    excerpt: "O'zbekistonda avtomobil sug'urtasi sohasida yangi qoidalar joriy etildi.",
    date: "1 Aprel 2024",
    category: "Qonun",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800",
    readTime: "6 daqiqa",
    featured: false,
  },
  {
    id: 5,
    title: "Yoz mavsumida avtomobilni qanday saqlash kerak?",
    excerpt: "Issiq ob-havoda avtomobilingizni to'g'ri parvarish qilish bo'yicha mutaxassislar maslahati.",
    date: "28 Mart 2024",
    category: "Maslahat",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    readTime: "4 daqiqa",
    featured: false,
  },
  {
    id: 6,
    title: "AutoMarket — eng ishonchli avtomobil bozori",
    excerpt: "2024 yilgi so'rovnoma natijalariga ko'ra, AutoMarket Uzbekistondagi eng ishonchli platform.",
    date: "20 Mart 2024",
    category: "Yangilik",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
    readTime: "2 daqiqa",
    featured: false,
  },
];

const categoryColors = {
  Yangilik: "bg-blue-100 text-blue-700",
  Bozor: "bg-green-100 text-green-700",
  "Yangi Model": "bg-purple-100 text-purple-700",
  Qonun: "bg-orange-100 text-orange-700",
  Maslahat: "bg-amber-100 text-amber-700",
};

const allCategories = ["Barchasi", ...new Set(news.map((n) => n.category))];

const News = () => {
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const featured = news.find((n) => n.featured);
  const filtered = news
    .filter((n) => !n.featured)
    .filter((n) => activeCategory === "Barchasi" || n.category === activeCategory);

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Hero */}
      <section className="bg-zinc-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Avtomobil <span className="text-amber-500">yangiliklari</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-xl"
          >
            Avtomobil dunyosidagi eng so'nggi yangiliklar va tahlillar
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Featured */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm mb-12 grid grid-cols-1 md:grid-cols-2 group cursor-pointer hover:shadow-xl transition-all"
          >
            <div className="overflow-hidden h-64 md:h-auto">
              <img src={featured.image} alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-amber-500 text-zinc-900 text-xs font-black px-3 py-1 rounded-full">
                  FEATURED
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColors[featured.category]}`}>
                  {featured.category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-zinc-900 mb-4 group-hover:text-amber-600 transition-colors">
                {featured.title}
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-zinc-400">
                  <span className="flex items-center gap-1"><FiCalendar size={12} /> {featured.date}</span>
                  <span className="flex items-center gap-1"><FiClock size={12} /> {featured.readTime}</span>
                </div>
                <button className="flex items-center gap-1 text-amber-600 font-bold text-sm hover:gap-2 transition-all">
                  O'qish <FiArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {allCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all
                ${activeCategory === cat
                  ? "bg-zinc-900 text-amber-500"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:border-amber-400"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="overflow-hidden h-48">
                <img src={item.image} alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColors[item.category]}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <FiClock size={11} /> {item.readTime}
                  </span>
                </div>
                <h3 className="font-black text-zinc-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500 line-clamp-2 mb-4">{item.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <FiCalendar size={11} /> {item.date}
                  </span>
                  <button className="text-amber-600 text-sm flex items-center gap-1 font-bold hover:gap-2 transition-all">
                    O'qish <FiArrowRight size={13} />
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