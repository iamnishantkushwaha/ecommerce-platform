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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        await api.get("/me");
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    }

    checkAuth();
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
            <Route path="profile" element={<Profile />} />
            <Route path="setting" element={<Setting />} />
          </Route>

          <Route path="/cart" element={<Cart />}>
            <Route index element={<CartPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orderplaced" element={<OrderPlaced />} />
            <Route path="trackorder" element={<Trackorder />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
