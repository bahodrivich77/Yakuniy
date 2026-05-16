import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      showToast("Barcha maydonlarni to'ldiring!", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = login(form.email, form.password);
      if (result.success) {
        showToast(`Xush kelibsiz, ${result.user.name}! 👋`, "success");
        navigate(result.user.role === "admin" ? "/admin" : "/");
      } else {
        showToast(result.message, "error");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-amber-500 text-zinc-900 font-black text-sm px-2.5 py-1.5 rounded-lg">AM</div>
            <span className="text-white font-black text-xl">Auto<span className="text-amber-500">Market</span></span>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Kirish</h1>
          <p className="text-zinc-500 text-sm">Hisobingizga kiring</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800"
        >
          {/* Demo info */}
          {/* <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-6"> */}
            {/* <p className="text-amber-400 text-xs font-semibold mb-1">Demo kirish:</p> */}
            {/* <p className="text-zinc-400 text-xs">Admin: admin@automarket.uz / admin123</p> */}
          {/* </div> */}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 mb-1.5 block uppercase tracking-wider">Parol</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full pl-11 pr-12 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500 transition-all"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
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
                <><FiLogIn size={18} /> Kirish</>
              )}
            </motion.button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-zinc-500 text-sm">
              Hisobingiz yo'qmi?{" "}
              <Link to="/register" className="text-amber-500 font-bold hover:text-amber-400 transition-colors">
                Ro'yxatdan o'tish
              </Link>
            </p>
          </div>
        </motion.div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          <Link to="/" className="hover:text-zinc-400 transition-colors">← Bosh sahifaga qaytish</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;