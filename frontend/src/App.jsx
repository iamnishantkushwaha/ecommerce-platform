import Signup from "./authpages/Signup";
import Login from "./authpages/Login";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/userpages/Dashboard";
import Profile from "./pages/userpages/Profile";
import Orders from "./pages/userpages/Orders";
import Setting from "./pages/userpages/Setting";
import Products from "./pages/userpages/Products";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Cart } from "./pages/userpages/Cart";
import CartPage from "./pages/userpages/CartPage";
import Checkout from "./pages/userpages/Checkout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        <Route path="/products" element={<Products />} />

        <Route path="/cart" element={<Cart />}>
          <Route index element={<CartPage />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;