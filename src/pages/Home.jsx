import { Link } from "react-router-dom";
import { cars } from "../data/cars";
import CarCard from "../components/cards/CarCard";
import { FiArrowRight, FiTruck, FiShield, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const Home = () => {
  const popularCars = cars.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Orzu qilgan <br />
            <span className="text-yellow-400">avtomobilingiz</span> shu yerda
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-lg text-blue-100 max-w-xl"
          >
            Eng yaxshi avtomobillarni qulay narxlarda toping. Sifat va ishonch bizning ustuvorligimiz.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex gap-4 flex-wrap justify-center"
          >
            <Link
              to="/cars"
              className="bg-yellow-400 text-gray-900 font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors flex items-center gap-2"
            >
              Katalogni ko'rish <FiArrowRight />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition-colors"
            >
              Bog'lanish
            </Link>
          </motion.div>

          {/* Floating car image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 w-full max-w-2xl"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"
              alt="hero car"
              className="rounded-2xl shadow-2xl w-full object-cover h-64 md:h-80"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: "500+", label: "Avtomobil" },
            { number: "1200+", label: "Mamnun mijoz" },
            { number: "10+", label: "Yillik tajriba" },
            { number: "24/7", label: "Xizmat" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <p className="text-3xl font-bold text-blue-600">{stat.number}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Cars */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800">Mashhur avtomobillar</h2>
          <Link to="/cars" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
            Barchasi <FiArrowRight />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Why Us */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 text-center mb-12"
          >
            Nima uchun biz?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FiTruck size={32} />, title: "Tez yetkazib berish", desc: "Buyurtmangizni tez va xavfsiz yetkazib beramiz." },
              { icon: <FiShield size={32} />, title: "Kafolat", desc: "Barcha avtomobillarimiz kafolat bilan ta'minlangan." },
              { icon: <FiStar size={32} />, title: "Sifat", desc: "Faqat tekshirilgan va sifatli avtomobillar." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ scale: 1.04 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow cursor-default"
              >
                <div className="text-blue-600 flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16 px-4 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Bugun o'z avtomobilingizni toping!</h2>
        <p className="text-blue-100 mb-8 max-w-lg mx-auto">
          500 dan ortiq avtomobil ichidan siz uchun eng mosini tanlab oling.
        </p>
        <Link
          to="/cars"
          className="bg-yellow-400 text-gray-900 font-bold px-10 py-3 rounded-xl hover:bg-yellow-300 transition-colors inline-flex items-center gap-2"
        >
          Hoziroq ko'rish <FiArrowRight />
        </Link>
      </motion.section>
    </div>
  );
};

export default Home;