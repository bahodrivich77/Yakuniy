import { motion } from "framer-motion";
import { FiTool, FiShield, FiTruck, FiStar, FiPhone, FiCheckCircle } from "react-icons/fi";

const services = [
  {
    icon: <FiTool size={32} />,
    title: "Texnik Ko'rik",
    description: "Avtomobilingizni professional mutaxassislar tomonidan to'liq tekshirib beramiz.",
    price: "150 000 so'm",
    features: ["Dvigatel tekshiruvi", "Tormoz tizimi", "Elektr tizimi", "Hisobot"],
  },
  {
    icon: <FiShield size={32} />,
    title: "Kafolat Xizmati",
    description: "Barcha sotilgan avtomobillarimizga 1 yillik kafolat beramiz.",
    price: "Bepul",
    features: ["1 yil kafolat", "Bepul ta'mirlash", "Ehtiyot qism", "24/7 qo'llab-quvvatlash"],
  },
  {
    icon: <FiTruck size={32} />,
    title: "Yetkazib Berish",
    description: "Toshkent bo'ylab avtomobilingizni xavfsiz yetkazib beramiz.",
    price: "200 000 so'm",
    features: ["Toshkent bo'ylab", "Xavfsiz transport", "Sug'urta", "GPS tracking"],
  },
  {
    icon: <FiStar size={32} />,
    title: "Premium Servis",
    description: "VIP mijozlar uchun maxsus xizmatlar paketi.",
    price: "500 000 so'm",
    features: ["Shaxsiy menejer", "Ustunlik navbati", "Bepul yetkazish", "Premium kafolat"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const Services = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          Bizning Xizmatlar
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-blue-100 max-w-xl mx-auto"
        >
          Avtomobilingiz uchun eng yaxshi xizmatlarni taqdim etamiz
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-blue-600 mb-4">{service.icon}</div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                <span className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full font-medium">
                  {service.price}
                </span>
              </div>
              <p className="text-gray-500 mb-5">{service.description}</p>
              <ul className="flex flex-col gap-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <FiCheckCircle className="text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <FiPhone size={16} /> Bog'lanish
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 mb-12"
          >
            Nima uchun bizni tanlashadi?
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "10+", label: "Yillik tajriba" },
              { number: "1200+", label: "Mamnun mijoz" },
              { number: "24/7", label: "Qo'llab-quvvatlash" },
              { number: "100%", label: "Kafolat" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <p className="text-3xl font-bold text-blue-600">{stat.number}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;