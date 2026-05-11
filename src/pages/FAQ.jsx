import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const faqs = [
  {
    category: "Xarid",
    items: [
      { q: "Avtomobil sotib olish uchun nima kerak?", a: "Pasport va to'lov imkoniyati yetarli. Kredit orqali sotib olmoqchi bo'lsangiz, qo'shimcha hujjatlar kerak bo'lishi mumkin. Menejerimiz batafsil yordam beradi." },
      { q: "Narxlar qat'iymi?", a: "Ko'pchilik avtomobillarimizda narx muzokarasiga ochiqmiz. Siz bilan qulay narxda kelishib olishga harakat qilamiz." },
      { q: "Kredit bilan sotib olish mumkinmi?", a: "Ha, biz bir nechta banklar bilan hamkorlik qilamiz. 12 oydan 60 oygacha muddatli to'lov imkoniyati mavjud." },
      { q: "Pul qaytarish mumkinmi?", a: "Xariddan keyin 3 kun ichida avtomobilni qaytarish mumkin, agar texnik nuqson aniqlansa. Shartlar shartnomada ko'rsatiladi." },
    ],
  },
  {
    category: "Yetkazib berish",
    items: [
      { q: "Toshkentdan tashqariga yetkazasizlarmi?", a: "Ha, O'zbekiston bo'ylab yetkazib berish xizmatimiz mavjud. Narx va muddatlar masofaga qarab belgilanadi." },
      { q: "Yetkazib berish qancha vaqt oladi?", a: "Toshkent ichida 1-2 kun, viloyatlarga 2-5 ish kuni davom etadi." },
      { q: "Yetkazib berish bepulmi?", a: "200 000 so'mlik xizmat to'lovi mavjud. Premium xaridorlar uchun bepul yetkazib berish imkoniyati bor." },
    ],
  },
  {
    category: "Texnik",
    items: [
      { q: "Avtomobillar tekshirilganmi?", a: "Har bir avtomobil 50 bosqichli texnik ko'rikdan o'tadi. Hisobot xaridor bilan ulashiladi." },
      { q: "Kafolat muddati qancha?", a: "Yangi avtomobillarda 1 yil, ishlatilgan avtomobillarda 6 oy kafolat beramiz." },
      { q: "Servis xizmati qanday ishlaydi?", a: "Kafolat davomida barcha texnik muammolar bepul hal qilinadi. Sheriklarimiz servislari butun O'zbekistonda mavjud." },
    ],
  },
  {
    category: "To'lov",
    items: [
      { q: "Qanday to'lov usullari mavjud?", a: "Naqd pul, bank o'tkazmasi, Click, Payme, va kredit kartalar qabul qilinadi." },
      { q: "Boshlang'ich to'lov qancha?", a: "Kredit uchun minimal boshlang'ich to'lov 20% dan boshlanadi. Ayrim modellar uchun 0% boshlang'ich to'lov ham mavjud." },
    ],
  },
];

const FAQItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-zinc-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-zinc-50 transition-colors"
      >
        <span className="font-semibold text-zinc-800 pr-4">{item.q}</span>
        <span className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${open ? "bg-amber-500 text-zinc-900" : "bg-zinc-100 text-zinc-500"}`}>
          {open ? <FiMinus size={16} /> : <FiPlus size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-6 py-4 text-zinc-600 text-sm leading-relaxed border-t border-zinc-100 bg-zinc-50">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("Xarid");

  const current = faqs.find((f) => f.category === activeCategory);

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Hero */}
      <section className="bg-zinc-900 text-white py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black mb-4"
        >
          Ko'p so'raladigan <span className="text-amber-500">savollar</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 max-w-xl mx-auto"
        >
          Savol topa olmadingizmi? Biz bilan bog'laning
        </motion.p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {faqs.map((f) => (
            <button
              key={f.category}
              onClick={() => setActiveCategory(f.category)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
                ${activeCategory === f.category
                  ? "bg-zinc-900 text-amber-500"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"}`}
            >
              {f.category}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          {current?.items.map((item, i) => (
            <FAQItem key={i} item={item} />
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 bg-zinc-900 rounded-3xl p-10 text-center text-white"
        >
          <FiMessageCircle size={40} className="text-amber-500 mx-auto mb-4" />
          <h3 className="text-2xl font-black mb-2">Javob topa olmadingizmi?</h3>
          <p className="text-zinc-400 mb-6 text-sm">Menejerlarimiz 24/7 yordam berishga tayyor</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/contact"
              className="bg-amber-500 text-zinc-900 font-bold px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors">
              Bog'lanish
            </Link>
            <a href="tel:+998901234567"
              className="border border-zinc-700 text-white px-6 py-3 rounded-xl hover:bg-zinc-800 transition-colors font-medium">
              +998 90 123 45 67
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default FAQ;