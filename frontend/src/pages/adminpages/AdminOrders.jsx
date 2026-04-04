import AdminNavbar from "../../Components/AdminNavbar";

const mockOrders = [
  {
    id: "ORD-10192",
    customer: "Aarav Singh",
    total: "$220",
    status: "Shipped",
  },
  {
    id: "ORD-10193",
    customer: "Emily Carter",
    total: "$79",
    status: "Delivered",
  },
  {
    id: "ORD-10194",
    customer: "Noah Williams",
    total: "$150",
    status: "Processing",
  },
];

const AdminOrders = () => {
  return (
    <>
      <AdminNavbar />
      <main className="bg-gray-100 pt-20 md:pl-72 md:pt-20 pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Manage Orders</h1>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-6 overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
              <p>Order ID</p>
              <p>Customer</p>
              <p>Total</p>
              <p>Status</p>
            </div>
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-4 px-4 py-3 text-sm border-t border-gray-100 text-gray-700"
              >
                <p>{order.id}</p>
                <p>{order.customer}</p>
                <p>{order.total}</p>
                <p>{order.status}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminOrders;
