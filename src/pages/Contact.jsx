import { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheckCircle } from "react-icons/fi";
import { useToast } from "../context/ToastContext";

const Contact = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.message) {
      showToast("Barcha maydonlarni to'ldiring!", "error"); return;
    }
    setSent(true);
    showToast("Xabaringiz yuborildi! 🎉", "success");
    setTimeout(() => { setSent(false); setForm({ name: "", phone: "", subject: "", message: "" }); }, 3000);
  };

  const contacts = [
    { icon: <FiPhone />, title: "Telefon", value: "+998 90 123 45 67", sub: "24/7 ishlaydi" },
    { icon: <FiMail />, title: "Email", value: "info@automarket.uz", sub: "1 soat ichida javob" },
    { icon: <FiMapPin />, title: "Manzil", value: "Toshkent, Chilonzor", sub: "5-mavze, 12-uy" },
    { icon: <FiClock />, title: "Ish vaqti", value: "9:00 — 18:00", sub: "Dushanba — Shanba" },
  ];

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Hero */}
      <section className="bg-zinc-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Biz bilan <span className="text-amber-500">bog'laning</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-xl"
          >
            Har qanday savol yoki taklif bo'lsa — biz doim tayyormiz
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contacts.map((c, i) => (
            <motion.div key={c.title}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all"
            >
              <div className="bg-amber-500 text-zinc-900 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                {c.icon}
              </div>
              <p className="text-xs text-zinc-400 mb-1">{c.title}</p>
              <p className="font-black text-zinc-900 text-sm">{c.value}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{c.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8"
        >
          <h2 className="text-2xl font-black text-zinc-900 mb-6">Xabar yuborish</h2>

          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center">
              <FiCheckCircle size={56} className="text-green-500 mb-4" />
              <h3 className="text-xl font-black text-zinc-900 mb-2">Yuborildi!</h3>
              <p className="text-zinc-500 text-sm">Tez orada siz bilan bog'lanamiz</p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-500 mb-1.5 block uppercase tracking-wider">Ism *</label>
                  <input type="text" placeholder="Ismingiz"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all bg-zinc-50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-500 mb-1.5 block uppercase tracking-wider">Telefon *</label>
                  <input type="tel" placeholder="+998 90 000 00 00"
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all bg-zinc-50" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 mb-1.5 block uppercase tracking-wider">Mavzu</label>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-50">
                  <option value="">Mavzuni tanlang</option>
                  <option>Avtomobil xaridi</option>
                  <option>Kredit maslahat</option>
                  <option>Texnik xizmat</option>
                  <option>Yetkazib berish</option>
                  <option>Boshqa</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 mb-1.5 block uppercase tracking-wider">Xabar *</label>
                <textarea placeholder="Xabaringizni yozing..." rows={5}
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none bg-zinc-50" />
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit}
                className="bg-zinc-900 hover:bg-zinc-800 text-amber-500 py-4 rounded-2xl font-black transition-colors flex items-center justify-center gap-2">
                <FiSend size={16} /> Yuborish
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Map + Info */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-4">
          <div className="bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm flex-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191943.33399342588!2d69.1390522!3d41.2994958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%" height="320" style={{ border: 0 }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="bg-zinc-900 rounded-3xl p-8">
            <h3 className="text-white font-black text-lg mb-4">Tezkor aloqa</h3>
            <p className="text-zinc-400 text-sm mb-6">Qo'ng'iroq qiling — darhol javob beramiz</p>
            <a href="tel:+998901234567"
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-black py-4 rounded-2xl transition-colors">
              <FiPhone /> +998 90 123 45 67
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;