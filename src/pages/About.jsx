import { motion } from "framer-motion";
import { FiUsers, FiAward, FiTrendingUp, FiHeart, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const team = [
  { name: "Alisher Karimov", role: "Bosh direktor", emoji: "👨‍💼", exp: "15 yil tajriba" },
  { name: "Malika Yusupova", role: "Savdo menejeri", emoji: "👩‍💼", exp: "8 yil tajriba" },
  { name: "Bobur Rahimov", role: "Texnik mutaxassis", emoji: "👨‍🔧", exp: "12 yil tajriba" },
  { name: "Nilufar Hasanova", role: "Mijozlar xizmati", emoji: "👩‍💻", exp: "6 yil tajriba" },
];

const values = [
  { title: "Ishonch", desc: "Har bir mijozimiz bilan shaffof va halol munosabatda bo'lamiz." },
  { title: "Sifat", desc: "Faqat tekshirilgan va kafolatlangan avtomobillarni taklif qilamiz." },
  { title: "Xizmat", desc: "Xariddan oldin va keyin ham mijozimiz yonida bo'lamiz." },
  { title: "Tajriba", desc: "10+ yillik tajriba biz ishonchli sherik ekanligimizni isbotlaydi." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

const About = () => {
  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Hero */}
      <section className="bg-zinc-900 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-4 py-2 rounded-full mb-6"
            >
              2014 yildan beri
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl font-black mb-6"
            >
              Biz haqimizda
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-zinc-400 leading-relaxed text-lg"
            >
              AutoMarket — O'zbekistondagi eng ishonchli avtomobil savdo platformasi. Biz 10 yildan ortiq vaqt davomida minglab mijozlarga orzu qilgan avtomobillarini topishda yordam berdik.
            </motion.p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <FiUsers size={24} />, number: "1200+", label: "Mamnun mijoz" },
              { icon: <FiAward size={24} />, number: "10+", label: "Yillik tajriba" },
              { icon: <FiTrendingUp size={24} />, number: "500+", label: "Avtomobil" },
              { icon: <FiHeart size={24} />, number: "98%", label: "Mamnunlik" },
            ].map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700"
              >
                <div className="text-amber-500 mb-3">{stat.icon}</div>
                <p className="text-3xl font-black text-white">{stat.number}</p>
                <p className="text-zinc-400 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-zinc-900 mb-6">
              Bizning <span className="text-amber-500">tarix</span>
            </h2>
            <div className="flex flex-col gap-5 text-zinc-600 leading-relaxed">
              <p>AutoMarket 2014 yilda kichik bir garaj do'kon sifatida boshlangan. Dastlab 5 kishilik jamoa bilan ish boshladik.</p>
              <p>Bugun biz O'zbekistonning eng yirik avtomobil savdo platformasiga aylandik. 30+ nafar professional xodimlar jamoamiz bor.</p>
              <p>Bizning maqsad — har bir mijozga o'z orzu qilgan avtomobilini kafolat va ishonch bilan taqdim etish.</p>
            </div>
            <Link to="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-zinc-900 text-amber-500 font-black px-8 py-4 rounded-2xl hover:bg-zinc-800 transition-colors">
              Bog'lanish <FiArrowRight />
            </Link>
          </motion.div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div key={v.title}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i}
                className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm hover:border-amber-300 hover:shadow-md transition-all"
              >
                <div className="w-8 h-1 bg-amber-500 rounded-full mb-4" />
                <h3 className="font-black text-zinc-900 mb-2">{v.title}</h3>
                <p className="text-zinc-500 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-zinc-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-black text-white mb-3">Bizning <span className="text-amber-500">jamoa</span></h2>
            <p className="text-zinc-400 text-sm">Har bir xodimimiz o'z sohasining mutaxassisi</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i}
                whileHover={{ y: -5 }}
                className="bg-zinc-800 rounded-2xl p-6 text-center border border-zinc-700 hover:border-amber-500 transition-all"
              >
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="font-black text-white text-sm">{member.name}</h3>
                <p className="text-amber-500 text-xs mt-1 font-semibold">{member.role}</p>
                <p className="text-zinc-500 text-xs mt-1">{member.exp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission CTA */}
      <section className="bg-amber-500 py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black text-zinc-900 mb-4">Bizning missiya</h2>
          <p className="text-zinc-800 max-w-2xl mx-auto mb-8 leading-relaxed">
            Har bir O'zbek oilasiga sifatli, ishonchli va kafolatlangan avtomobil xizmatini taqdim etish — bu bizning bosh maqsadimiz.
          </p>
          <Link to="/cars"
            className="inline-flex items-center gap-2 bg-zinc-900 text-amber-500 font-black px-10 py-4 rounded-2xl hover:bg-zinc-800 transition-colors">
            Katalogni ko'rish <FiArrowRight />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;