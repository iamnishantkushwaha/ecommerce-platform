import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import api from "./api";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Signup = lazy(() => import("./authpages/Signup"));
const Login = lazy(() => import("./authpages/Login"));
const ProtectedRoute = lazy(() => import("./authpages/ProtectedRoute"));

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/userpages/Dashboard"));
const Profile = lazy(() => import("./pages/userpages/Profile"));
const Orders = lazy(() => import("./pages/userpages/Orders"));
const Setting = lazy(() => import("./pages/userpages/Setting"));
const Products = lazy(() => import("./pages/userpages/Products"));
const ProductDetail = lazy(() => import("./pages/userpages/ProductDetail"));
const Cart = lazy(() =>
  import("./pages/userpages/Cart").then((module) => ({ default: module.Cart })),
);
const CartPage = lazy(() => import("./pages/userpages/CartPage"));
const Checkout = lazy(() => import("./pages/userpages/Checkout"));
const OrderPlaced = lazy(() => import("./pages/userpages/OrderPlaced"));
const Trackorder = lazy(() => import("./pages/userpages/Trackorder"));

const Vendordashboard = lazy(
  () => import("./pages/vendorpages/Vendordashboard"),
);
const VendorProducts = lazy(() => import("./pages/vendorpages/VendorProducts"));
const VendorAddProduct = lazy(
  () => import("./pages/vendorpages/VendorAddProduct"),
);
const VendorOrders = lazy(() => import("./pages/vendorpages/VendorOrders"));
const VendorRevenue = lazy(() => import("./pages/vendorpages/VendorRevenue"));
const VendorProfile = lazy(() => import("./pages/vendorpages/VendorProfile"));
const VendorSettings = lazy(() => import("./pages/vendorpages/VendorSettings"));
const AdminDashboard = lazy(() => import("./pages/adminpages/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/adminpages/AdminUsers"));
const AdminVendors = lazy(() => import("./pages/adminpages/AdminVendors"));
const AdminProducts = lazy(() => import("./pages/adminpages/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/adminpages/AdminOrders"));
const AdminSettings = lazy(() => import("./pages/adminpages/AdminSettings"));
const AdminAddAdmin = lazy(() => import("./pages/adminpages/AdminAddAdmin"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const res = await api.get("/me", { timeout: 5000 });
        setUser(res.data.user);
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
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                onLoginSuccess={(loggedinuser) => {
                  setIsAuthenticated(true);
                  setUser(loggedinuser);
                }}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/" element={<Home />} />
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                user={user}
                allowedRoles={["USER"]}
              />
            }
          >
            <Route path="/cart" element={<Cart />}>
              <Route index element={<CartPage />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="orderplaced" element={<OrderPlaced />} />
            </Route>

            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="orders" element={<Orders />} />
              <Route path="trackorder" element={<Trackorder />} />
              <Route path="profile" element={<Profile />} />
              <Route path="setting" element={<Setting />} />
            </Route>
          </Route>

          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                user={user}
                allowedRoles={["VENDOR"]}
              />
            }
          >
            <Route path="/vendor" element={<Vendordashboard />} />
            <Route path="/vendor/dashboard" element={<Vendordashboard />} />
            <Route path="/vendor/products" element={<VendorProducts />} />
            <Route path="/vendor/add-product" element={<VendorAddProduct />} />
            <Route path="/vendor/orders" element={<VendorOrders />} />
            <Route path="/vendor/revenue" element={<VendorRevenue />} />
            <Route path="/vendor/profile" element={<VendorProfile />} />
            <Route path="/vendor/settings" element={<VendorSettings />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                user={user}
                allowedRoles={["ADMIN"]}
              />
            }
          >
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/vendors" element={<AdminVendors />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/add-admin" element={<AdminAddAdmin />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Suspense>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
