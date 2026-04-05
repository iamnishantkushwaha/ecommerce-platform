import api from "../../api";
import AdminNavbar from "../../Components/AdminNavbar";

import { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setorders] = useState([]);
  useEffect(() => {
    const fetchorders = async () => {
      try {
        const res = await api.get("/admin/orders");
        setorders(res.data.orders);
        console.log(res.data);
      } catch (err) {
        console.log("Error in AdminOrders", err.message);
      }
    };
    fetchorders();
  }, []);
  return (
    <>
      <AdminNavbar />
      <main className="bg-slate-50 pt-20 md:pl-72 md:pt-20 pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-900">Manage Orders</h1>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-6 overflow-hidden">
            <div className="grid grid-cols-4 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              <p>Order ID</p>
              <p>Customer</p>
              <p>Total</p>
              <p>Status</p>
            </div>
            {orders.map((order) => (
              <div
                key={order._id.slice(0, 5)}
                className="grid grid-cols-4 px-4 py-3 text-sm border-t border-slate-200 text-slate-700"
              >
                <p>{order._id}</p>
                <p>{order.user.fullName}</p>
                <p>₹{order.totalAmount}</p>
                <p>{order.orderStatus}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminOrders;
