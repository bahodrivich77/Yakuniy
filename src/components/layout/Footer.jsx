import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 hidden md:block">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-amber-500 text-zinc-900 font-black text-sm px-2.5 py-1.5 rounded-lg">AM</div>
            <span className="text-white font-black text-xl">Auto<span className="text-amber-500">Market</span></span>
          </div>
          <p className="text-sm leading-relaxed mb-5">
            O'zbekistondagi eng ishonchli avtomobil savdo platformasi. 10+ yillik tajriba.
          </p>
          <div className="flex gap-3">
            {[FiInstagram, FiTwitter, FiYoutube].map((Icon, i) => (
              <a key={i} href="#"
                className="p-2 bg-zinc-800 hover:bg-amber-500 hover:text-zinc-900 text-zinc-400 rounded-lg transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Sahifalar</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {[
              { to: "/cars", label: "Avtomobillar" },
              { to: "/services", label: "Xizmatlar" },
              { to: "/news", label: "Yangiliklar" },
              { to: "/about", label: "Biz haqimizda" },
              { to: "/faq", label: "FAQ" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-amber-500 transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Xizmatlar</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {["Texnik ko'rik", "Kafolat xizmati", "Yetkazib berish", "Kredit maslahat", "Premium servis"].map((s) => (
              <li key={s}><span className="hover:text-amber-500 transition-colors cursor-pointer">{s}</span></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Aloqa</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2"><FiMapPin className="mt-0.5 text-amber-500 flex-shrink-0" /><span>Toshkent, Chilonzor tumani, 5-mavze</span></li>
            <li className="flex items-center gap-2"><FiPhone className="text-amber-500" /><span>+998 90 123 45 67</span></li>
            <li className="flex items-center gap-2"><FiMail className="text-amber-500" /><span>info@automarket.uz</span></li>
          </ul>
          <div className="mt-5 p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            <p className="text-xs text-zinc-500 mb-2">Yangiliklar obunasi</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email..." className="flex-1 bg-zinc-800 text-zinc-100 px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-amber-500" />
              <button className="bg-amber-500 text-zinc-900 px-3 py-2 rounded-lg text-xs font-bold hover:bg-amber-400 transition-colors">OK</button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-800 text-center py-5 text-xs text-zinc-600">
        © 2024 AutoMarket. Barcha huquqlar himoyalangan. &nbsp;|&nbsp; Toshkent, O'zbekiston
      </div>
    </footer>
  );
};

export default Footer;