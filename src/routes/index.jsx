import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cars from "../pages/Cars";
import CarDetail from "../pages/CarDetail";
import Services from "../pages/Services";
import News from "../pages/News";
import Favorites from "../pages/Favorites";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import About from "../pages/About";
import FAQ from "../pages/FAQ";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/user/Profile";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AdminCars from "../pages/admin/AdminCars";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminStats from "../pages/admin/AdminStats";
import { AdminRoute, UserRoute } from "../components/layout/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/cars/:id" element={<CarDetail />} />
      <Route path="/services" element={<Services />} />
      <Route path="/news" element={<News />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Cart - auth kerak */}
      <Route path="/cart" element={
        <UserRoute><Cart /></UserRoute>
      } />

      {/* Profile */}
      <Route path="/profile" element={
        <UserRoute><Profile /></UserRoute>
      } />

      {/* Admin */}
      <Route path="/admin" element={
        <AdminRoute><AdminLayout /></AdminRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="cars" element={<AdminCars />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="stats" element={<AdminStats />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;