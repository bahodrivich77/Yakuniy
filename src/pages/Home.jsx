import { Link } from "react-router-dom";
import { cars } from "../data/cars";
import CarCard from "../components/cards/CarCard";
import { motion } from "framer-motion";
import {
  FiArrowRight, FiTruck, FiShield, FiStar,
  FiPhone, FiCheckCircle, FiChevronRight
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

const Home = () => {
  const popularCars = cars.slice(0, 3);
  const newCars = cars.filter((c) => c.isNew).slice(0, 3);

  return (
    <div className="bg-zinc-50">
      {/* Hero */}
      <section className="bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/5 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              500+ avtomobil mavjud
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black leading-tight mb-6"
            >
              Orzu qilgan<br />
              <span className="text-amber-500">avtomobilingiz</span><br />
              shu yerda
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-lg mb-8 max-w-md"
            >
              O'zbekistoning eng ishonchli avtomobil savdo platformasi. Kafolat, kredit va yetkazib berish xizmati bilan.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4 flex-wrap"
            >
              <Link to="/cars"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold px-8 py-4 rounded-2xl transition-all text-sm">
                Katalogni ko'rish <FiArrowRight />
              </Link>
              <Link to="/contact"
                className="inline-flex items-center gap-2 border border-zinc-700 text-white hover:bg-zinc-800 px-8 py-4 rounded-2xl transition-all text-sm font-medium">
                <FiPhone size={16} /> Bog'lanish
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex items-center gap-6"
            >
              {[
                { number: "500+", label: "Avtomobil" },
                { number: "1200+", label: "Mijoz" },
                { number: "10+", label: "Yil tajriba" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-black text-amber-500">{s.number}</p>
                  <p className="text-zinc-500 text-xs">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block"
          >
            <motion.img
              src="https://tse1.mm.bing.net/th/id/OIP.0R_mm29ZNlxJCKzHKAGlggHaE7?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Hero car"
              className="w-full rounded-3xl object-cover h-80 shadow-2xl border border-zinc-700"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="mt-4 grid grid-cols-3 gap-3">
              {["Kafolat", "Kredit", "Yetkazish"].map((tag) => (
                <div key={tag} className="bg-zinc-800 rounded-xl px-3 py-2 text-center">
                  <FiCheckCircle className="text-amber-500 mx-auto mb-1" size={16} />
                  <p className="text-zinc-300 text-xs font-medium">{tag}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Sedan", count: 3, emoji: "🚗" },
            { label: "SUV", count: 2, emoji: "🚙" },
            { label: "Yangi", count: 4, emoji: "✨" },
            { label: "Kredit", count: 6, emoji: "💳" },
          ].map((cat, i) => (
            <motion.div
              key={cat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <Link to="/cars"
                className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-zinc-100 hover:border-amber-400 hover:shadow-md transition-all group">
                <span className="text-3xl">{cat.emoji}</span>
                <div>
                  <p className="font-bold text-zinc-800">{cat.label}</p>
                  <p className="text-xs text-zinc-400">{cat.count} ta</p>
                </div>
                <FiChevronRight className="ml-auto text-zinc-300 group-hover:text-amber-500 transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Cars */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-zinc-900">Mashhur avtomobillar</h2>
            <p className="text-zinc-500 text-sm mt-1">Eng ko'p ko'rilgan modellar</p>
          </div>
          <Link to="/cars"
            className="flex items-center gap-1 text-amber-600 hover:text-amber-500 font-semibold text-sm transition-colors">
            Barchasi <FiArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularCars.map((car, i) => (
            <motion.div
              key={car.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900 rounded-3xl px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-3xl font-black text-white mb-2">
              Kredit bilan <span className="text-amber-500">oson xarid</span>
            </h3>
            <p className="text-zinc-400 text-sm max-w-md">
              0% boshlang'ich to'lov. 60 oygacha muddatli to'lov. Bugun ariza bering!
            </p>
          </div>
          <Link to="/contact"
            className="flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-black px-8 py-4 rounded-2xl transition-all text-sm">
            Ariza berish →
          </Link>
        </motion.div>
      </section>

      {/* New Cars */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-zinc-900">Yangi kelganlar</h2>
            <p className="text-zinc-500 text-sm mt-1">Yangi qo'shilgan modellar</p>
          </div>
          <Link to="/cars"
            className="flex items-center gap-1 text-amber-600 hover:text-amber-500 font-semibold text-sm">
            Barchasi <FiArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newCars.map((car, i) => (
            <motion.div
              key={car.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white py-20 px-6 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-zinc-900 mb-3">Nima uchun AutoMarket?</h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-sm">Bizning afzalliklarimiz sizga ishonchli xarid qilish imkonini beradi</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FiShield size={28} />, title: "Kafolatlangan sifat", desc: "Har bir avtomobil 50 bosqichli texnik ko'rikdan o'tadi. To'liq hisobot bilan." },
              { icon: <FiTruck size={28} />, title: "Tez yetkazib berish", desc: "Toshkent bo'ylab 1-2 kun, viloyatlarga 2-5 kun ichida xavfsiz yetkazib beramiz." },
              { icon: <FiStar size={28} />, title: "Premium xizmat", desc: "Shaxsiy menejer, VIP muomala va xariddan keyin ham qo'llab-quvvatlash." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -4 }}
                className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100 hover:border-amber-300 hover:shadow-lg transition-all"
              >
                <div className="bg-amber-500 text-zinc-900 w-12 h-12 rounded-2xl flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-zinc-800 mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-500 py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black text-zinc-900 mb-4">Bugun boshlang!</h2>
          <p className="text-zinc-800 mb-8 max-w-lg mx-auto">500 dan ortiq avtomobil ichidan o'zingizga mosini toping</p>
          <Link to="/cars"
            className="inline-flex items-center gap-2 bg-zinc-900 text-white font-bold px-10 py-4 rounded-2xl hover:bg-zinc-800 transition-all">
            Katalogni ko'rish <FiArrowRight />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;