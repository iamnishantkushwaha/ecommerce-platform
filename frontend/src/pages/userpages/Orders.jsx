import { useEffect, useState } from "react";
import api from "../../api";
import Table from "../../ui/Table";
import { FiShoppingBag } from "react-icons/fi";

const Orders = () => {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    const fetchorders = async () => {
      try {
        const res = await api.get("/user/orders");
        setorders(res?.data.orders);
        console.log(res.data.orders);
      } catch (err) {
        console.log("Error in orders:", err);
      }
    };
    fetchorders();
  }, []);
  console.log(orders, "kl");

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-slate-50 to-white px-4 md:px-8 lg:px-12 pt-24 md:pt-24 pb-8 md:pb-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
          <FiShoppingBag className="text-blue-600 text-3xl" />
          My Orders
        </h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base">
          Track and manage your purchases
        </p>
      </div>

      {/* Orders Section */}
      <div className="max-w-6xl mx-auto">
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <FiShoppingBag className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No Orders Yet
            </h3>
            <p className="text-slate-500 text-lg">
              You haven't placed any orders yet
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <Table orders={orders} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
