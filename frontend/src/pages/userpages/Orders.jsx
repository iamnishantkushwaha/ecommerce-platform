import { useEffect, useState } from "react";
import api from "../../api";
import Table from "../../ui/Table";
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
    <div className="min-h-screen  md:h-full w-screen px-4 md:px-6 lg:px-10 flex justify-center flex-col gap-5 pt-6">
      <h1 className="text-2xl font-semibold">My Orders</h1>

      <Table orders={orders} />
    </div>
  );
};

export default Orders;
