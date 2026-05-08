import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { LikeProvider } from "./context/LikeContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import AppRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <LikeProvider>
          <ToastProvider>
            <div className="min-h-screen flex flex-col">
              <ScrollToTop />
              <Navbar />
              <main className="flex-1">
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </LikeProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;