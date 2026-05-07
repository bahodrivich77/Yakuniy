import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-white text-xl font-bold mb-4">
            Auto<span className="text-blue-400">Market</span>
          </h3>
          <p className="text-sm leading-relaxed">
            Eng yaxshi avtomobillarni qulay narxlarda taklif etamiz. Sifat va ishonch bizning ustuvorligimiz.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Sahifalar</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link to="/cars" className="hover:text-white transition-colors">Avtomobillar</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Xizmatlar</Link></li>
            <li><Link to="/news" className="hover:text-white transition-colors">Yangiliklar</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Biz haqimizda</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Aloqa</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>📍 Toshkent, Uzbekiston</li>
            <li>📞 +998 90 123 45 67</li>
            <li>✉️ info@automarket.uz</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © 2024 AutoMarket. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
};

export default Footer;