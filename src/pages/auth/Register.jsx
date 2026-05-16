import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff, FiUserPlus } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) {
      showToast("Barcha majburiy maydonlarni to'ldiring!", "error"); return;
    }
    if (form.password.length < 6) {
      showToast("Parol kamida 6 ta belgi bo'lishi kerak!", "error"); return;
    }
    if (form.password !== form.confirm) {
      showToast("Parollar mos kelmadi!", "error"); return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = register(form.name, form.email, form.password, form.phone);
      if (result.success) {
        showToast("Muvaffaqiyatli ro'yxatdan o'tdingiz! 🎉", "success");
        navigate("/");
      } else {
        showToast(result.message, "error");
      }
      setLoading(false);
    }, 800);
  };

  const fields = [
    { key: "name", label: "Ism Familiya *", placeholder: "John Doe", icon: <FiUser size={16} />, type: "text" },
    { key: "email", label: "Email *", placeholder: "email@example.com", icon: <FiMail size={16} />, type: "email" },
    { key: "phone", label: "Telefon", placeholder: "+998 90 000 00 00", icon: <FiPhone size={16} />, type: "tel" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-amber-500 text-zinc-900 font-black text-sm px-2.5 py-1.5 rounded-lg">AM</div>
            <span className="text-white font-black text-xl">Auto<span className="text-amber-500">Market</span></span>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Ro'yxatdan o'tish</h1>
          <p className="text-zinc-500 text-sm">Yangi hisob yarating</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800"
        >
          <div className="flex flex-col gap-4">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="text-xs font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">{f.label}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">{f.icon}</span>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500 transition-all"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="text-xs font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Parol *</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Kamida 6 ta belgi"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500 transition-all"
                />
                <button onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Parolni tasdiqlang *</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Parolni qayta kiriting"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-zinc-900 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <><FiUserPlus size={18} /> Ro'yxatdan o'tish</>
              )}
            </motion.button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-zinc-500 text-sm">
              Hisobingiz bormi?{" "}
              <Link to="/login" className="text-amber-500 font-bold hover:text-amber-400">Kirish</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;