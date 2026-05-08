import { motion } from "framer-motion";
import { FiUsers, FiAward, FiTrendingUp, FiHeart } from "react-icons/fi";

const team = [
  { name: "Alisher Karimov", role: "Bosh direktor", emoji: "👨‍💼" },
  { name: "Malika Yusupova", role: "Savdo menejeri", emoji: "👩‍💼" },
  { name: "Bobur Rahimov", role: "Texnik mutaxassis", emoji: "👨‍🔧" },
  { name: "Nilufar Hasanova", role: "Mijozlar xizmati", emoji: "👩‍💻" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-700 text-white py-24 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Biz haqimizda
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-2xl mx-auto text-lg"
        >
          AutoMarket — 2014 yildan beri O'zbekistondagi eng ishonchli avtomobil savdo platformasi
        </motion.p>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Bizning tarix</h2>
          <p className="text-gray-500 leading-relaxed mb-4">
            AutoMarket 2014 yilda kichik bir garaj do'kon sifatida boshlangan. Bugun biz O'zbekistonning
            eng yirik avtomobil savdo platformasiga aylandik.
          </p>
          <p className="text-gray-500 leading-relaxed mb-4">
            Bizning maqsad — har bir mijozga o'z orzu qilgan avtomobilini qulay narxda va ishonchli
            sharoitda taqdim etish.
          </p>
          <p className="text-gray-500 leading-relaxed">
            10 yildan ortiq tajribamiz va 1200 dan ortiq mamnun mijozlarimiz bilan davom etmoqdamiz.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { icon: <FiUsers size={28} />, number: "1200+", label: "Mamnun mijoz" },
            { icon: <FiAward size={28} />, number: "10+", label: "Yillik tajriba" },
            { icon: <FiTrendingUp size={28} />, number: "500+", label: "Avtomobil" },
            { icon: <FiHeart size={28} />, number: "98%", label: "Mamnunlik" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="bg-blue-50 rounded-2xl p-6 text-center"
            >
              <div className="text-blue-600 flex justify-center mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-gray-800">{stat.number}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 text-center mb-12"
          >
            Bizning jamoa
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="font-bold text-gray-800">{member.name}</h3>
                <p className="text-sm text-blue-600 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Bizning missiya</h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Har bir O'zbek oilasiga sifatli va ishonchli avtomobil xizmatini taqdim etish,
            mijozlarimiz hayotini qulay va xavfsiz qilish.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default About;