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

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-6 overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-[minmax(220px,1.4fr)_minmax(140px,1fr)_minmax(90px,0.7fr)_minmax(110px,0.9fr)] gap-x-4 bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-700 md:grid-cols-4 md:px-4 md:text-sm md:gap-x-0">
                <p>Order ID</p>
                <p>Customer</p>
                <p>Total</p>
                <p>Status</p>
              </div>
              {orders.map((order) => (
                <div
                  key={order._id.slice(0, 5)}
                  className="grid grid-cols-[minmax(220px,1.4fr)_minmax(140px,1fr)_minmax(90px,0.7fr)_minmax(110px,0.9fr)] gap-x-4 px-3 py-3 text-xs border-t border-slate-200 text-slate-700 md:grid-cols-4 md:px-4 md:text-sm md:gap-x-0"
                >
                  <p className="break-all whitespace-normal">{order._id}</p>
                  <p className="wrap-break-word whitespace-normal">
                    {order.user.fullName}
                  </p>
                  <p className="whitespace-nowrap">₹{order.totalAmount}</p>
                  <p className="wrap-break-word whitespace-normal">
                    {order.orderStatus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminOrders;
