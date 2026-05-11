import { motion } from "framer-motion";
import { FiTool, FiShield, FiTruck, FiStar, FiPhone, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <FiTool size={28} />,
    title: "Texnik Ko'rik",
    description: "Avtomobilingizni professional mutaxassislar tomonidan to'liq tekshirib beramiz.",
    price: "150 000 so'm",
    features: ["Dvigatel tekshiruvi", "Tormoz tizimi", "Elektr tizimi", "To'liq hisobot"],
    popular: false,
  },
  {
    icon: <FiShield size={28} />,
    title: "Kafolat Xizmati",
    description: "Barcha sotilgan avtomobillarimizga 1 yillik kafolat beramiz.",
    price: "Bepul",
    features: ["1 yil kafolat", "Bepul ta'mirlash", "Ehtiyot qism", "24/7 yordam"],
    popular: true,
  },
  {
    icon: <FiTruck size={28} />,
    title: "Yetkazib Berish",
    description: "O'zbekiston bo'ylab avtomobilingizni xavfsiz yetkazib beramiz.",
    price: "200 000 so'm",
    features: ["Butun O'zbekiston", "Xavfsiz transport", "Sug'urta", "GPS tracking"],
    popular: false,
  },
  {
    icon: <FiStar size={28} />,
    title: "Premium Servis",
    description: "VIP mijozlar uchun maxsus xizmatlar paketi.",
    price: "500 000 so'm",
    features: ["Shaxsiy menejer", "Ustunlik navbati", "Bepul yetkazish", "Premium kafolat"],
    popular: false,
  },
];

const steps = [
  { num: "01", title: "Bog'laning", desc: "Bizga qo'ng'iroq qiling yoki saytda ariza qoldiring" },
  { num: "02", title: "Maslahat", desc: "Mutaxassisimiz siz bilan bog'lanib, xizmat turini tanlaydi" },
  { num: "03", title: "Xizmat", desc: "Professional jamoamiz xizmatni bajaradi" },
  { num: "04", title: "Natija", desc: "Siz mamnun, biz baxtli — kafolat bilan topshiramiz" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

const Services = () => {
  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Hero */}
      <section className="bg-zinc-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-4 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-amber-500 rounded-full" /> Professional xizmat
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Bizning <span className="text-amber-500">xizmatlar</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-xl"
          >
            Avtomobilingiz uchun eng yaxshi xizmatlarni taqdim etamiz. Sifat va ishonch kafolatlanadi.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={i}
              whileHover={{ y: -4 }}
              className={`bg-white rounded-3xl p-8 border-2 shadow-sm hover:shadow-lg transition-all relative
                ${service.popular ? "border-amber-500" : "border-zinc-100"}`}
            >
              {service.popular && (
                <span className="absolute -top-3 left-8 bg-amber-500 text-zinc-900 text-xs font-black px-4 py-1 rounded-full">
                  ENG MASHHUR
                </span>
              )}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5
                ${service.popular ? "bg-amber-500 text-zinc-900" : "bg-zinc-100 text-zinc-700"}`}>
                {service.icon}
              </div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-black text-zinc-900">{service.title}</h3>
                <span className={`text-sm font-bold px-3 py-1 rounded-xl
                  ${service.popular ? "bg-amber-100 text-amber-700" : "bg-zinc-100 text-zinc-600"}`}>
                  {service.price}
                </span>
              </div>
              <p className="text-zinc-500 text-sm mb-6">{service.description}</p>
              <ul className="flex flex-col gap-2 mb-6">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-600">
                    <FiCheckCircle className="text-amber-500 flex-shrink-0" size={15} /> {f}
                  </li>
                ))}
              </ul>
              <a href="tel:+998901234567"
                className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all
                  ${service.popular
                    ? "bg-amber-500 hover:bg-amber-400 text-zinc-900"
                    : "bg-zinc-900 hover:bg-zinc-800 text-white"}`}>
                <FiPhone size={15} /> Bog'lanish
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-zinc-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-3xl font-black text-white text-center mb-14"
          >
            Qanday ishlaydi?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-zinc-700" />
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-amber-500 text-zinc-900 rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-4 shadow-lg">
                  {step.num}
                </div>
                <h3 className="font-black text-white mb-2">{step.title}</h3>
                <p className="text-zinc-500 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-14 px-6 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10+", label: "Yillik tajriba" },
            { number: "1200+", label: "Mamnun mijoz" },
            { number: "24/7", label: "Qo'llab-quvvatlash" },
            { number: "100%", label: "Kafolat" },
          ].map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              <p className="text-4xl font-black text-amber-500 mb-1">{stat.number}</p>
              <p className="text-zinc-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-500 py-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-black text-zinc-900 mb-3">Xizmatdan foydalaning</h2>
          <p className="text-zinc-800 text-sm mb-8 max-w-md mx-auto">Bugun murojaat qiling va birinchi maslahatni bepul oling</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact"
              className="bg-zinc-900 text-amber-500 font-black px-8 py-4 rounded-2xl hover:bg-zinc-800 transition-colors">
              Bog'lanish
            </Link>
            <Link to="/faq"
              className="border-2 border-zinc-900 text-zinc-900 font-bold px-8 py-4 rounded-2xl hover:bg-zinc-900 hover:text-amber-500 transition-colors flex items-center gap-2">
              FAQ <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;