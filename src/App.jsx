import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { LikeProvider } from "./context/LikeContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import { CarsProvider } from "./context/CarsContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import AppRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CarsProvider>
          <OrderProvider>
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
          </OrderProvider>
        </CarsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;