import AdminNavbar from "../../Components/AdminNavbar";

const mockProducts = [
  {
    id: "PRD-9001",
    title: "Wireless Earbuds",
    vendor: "Urban Cart",
    status: "Published",
  },
  {
    id: "PRD-9002",
    title: "Running Shoes",
    vendor: "Trend Hub",
    status: "Under Review",
  },
  {
    id: "PRD-9003",
    title: "Desk Lamp",
    vendor: "Prime Retail",
    status: "Published",
  },
];

const AdminProducts = () => {
  return (
    <>
      <AdminNavbar />
      <main className="bg-gray-100 pt-20 md:pl-72 md:pt-20 pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-6 overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
              <p>Product ID</p>
              <p>Title</p>
              <p>Vendor</p>
              <p>Status</p>
            </div>
            {mockProducts.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-4 px-4 py-3 text-sm border-t border-gray-100 text-gray-700"
              >
                <p>{product.id}</p>
                <p>{product.title}</p>
                <p>{product.vendor}</p>
                <p>{product.status}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminProducts;
