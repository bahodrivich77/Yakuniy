import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import { useToast } from "../context/ToastContext";
import { useState } from "react";

const Contact = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.message) {
      showToast("Barcha maydonlarni to'ldiring!", "error");
      return;
    }
    showToast("Xabaringiz yuborildi! Tez orada bog'lanamiz 🎉", "success");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          Biz bilan bog'laning
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-blue-100 max-w-xl mx-auto"
        >
          Har qanday savol yoki takliflaringiz bo'lsa, biz doim tayyormiz
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Xabar yuborish</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Ismingiz</label>
              <input
                type="text"
                placeholder="Ism Familiya"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Telefon</label>
              <input
                type="tel"
                placeholder="+998 90 123 45 67"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Xabar</label>
              <textarea
                placeholder="Xabaringizni yozing..."
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FiSend /> Yuborish
            </motion.button>
          </div>
        </motion.div>

        {/* Info + Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-6"
        >
          {/* Contact cards */}
          {[
            { icon: <FiPhone />, title: "Telefon", value: "+998 90 123 45 67" },
            { icon: <FiMail />, title: "Email", value: "info@automarket.uz" },
            { icon: <FiMapPin />, title: "Manzil", value: "Toshkent, Chilonzor tumani" },
            { icon: <FiClock />, title: "Ish vaqti", value: "Dush-Shan: 9:00 - 18:00" },
          ].map((info, i) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4"
            >
              <div className="bg-blue-50 text-blue-600 p-3 rounded-xl text-xl">
                {info.icon}
              </div>
              <div>
                <p className="text-sm text-gray-400">{info.title}</p>
                <p className="font-semibold text-gray-700">{info.value}</p>
              </div>
            </motion.div>
          ))}

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-52">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191943.33399342588!2d69.1390522!3d41.2994958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;