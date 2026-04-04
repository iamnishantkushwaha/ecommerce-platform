import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import api from "./api";

import Signup from "./authpages/Signup";
import Login from "./authpages/Login";
import ProtectedRoute from "./authpages/ProtectedRoute";

import Home from "./pages/Home";
import Dashboard from "./pages/userpages/Dashboard";
import Profile from "./pages/userpages/Profile";
import Orders from "./pages/userpages/Orders";
import Setting from "./pages/userpages/Setting";
import Products from "./pages/userpages/Products";
import { Cart } from "./pages/userpages/Cart";
import CartPage from "./pages/userpages/CartPage";
import Checkout from "./pages/userpages/Checkout";
import OrderPlaced from "./pages/userpages/OrderPlaced";
import Trackorder from "./pages/userpages/Trackorder";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Vendordashboard from "./pages/vendorpages/Vendordashboard";
import VendorProducts from "./pages/vendorpages/VendorProducts";
import VendorAddProduct from "./pages/vendorpages/VendorAddProduct";
import VendorOrders from "./pages/vendorpages/VendorOrders";
import VendorRevenue from "./pages/vendorpages/VendorRevenue";
import VendorProfile from "./pages/vendorpages/VendorProfile";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AdminUsers from "./pages/adminpages/AdminUsers";
import AdminVendors from "./pages/adminpages/AdminVendors";
import AdminProducts from "./pages/adminpages/AdminProducts";
import AdminOrders from "./pages/adminpages/AdminOrders";
import AdminSettings from "./pages/adminpages/AdminSettings";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        await api.get("/me", { timeout: 5000 });
        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isAuthenticated === null) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="orders" element={<Orders />} />
            <Route path="trackorder" element={<Trackorder />} />
            <Route path="profile" element={<Profile />} />
            <Route path="setting" element={<Setting />} />
          </Route>

          <Route path="/cart" element={<Cart />}>
            <Route index element={<CartPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orderplaced" element={<OrderPlaced />} />
          </Route>
          <Route path="/vendor" element={<Vendordashboard />} />
          <Route path="/vendor/dashboard" element={<Vendordashboard />} />
          <Route path="/vendor/products" element={<VendorProducts />} />
          <Route path="/vendor/add-product" element={<VendorAddProduct />} />
          <Route path="/vendor/orders" element={<VendorOrders />} />
          <Route path="/vendor/revenue" element={<VendorRevenue />} />
          <Route path="/vendor/profile" element={<VendorProfile />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/vendors" element={<AdminVendors />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
