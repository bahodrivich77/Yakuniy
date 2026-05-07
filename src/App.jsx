import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { LikeProvider } from "./context/LikeContext";
import { ToastProvider } from "./context/ToastContext";
import AppRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <LikeProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </LikeProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;