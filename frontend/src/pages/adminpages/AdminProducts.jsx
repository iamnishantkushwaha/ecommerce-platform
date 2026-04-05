import { useState, useEffect } from "react";
import api from "../../api";
import AdminNavbar from "../../Components/AdminNavbar";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const [products, setproducts] = useState([]);
  const [featured, setfeatured] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const fetchproducts = async () => {
    try {
      const res = await api.get("/products");
      setproducts(res.data.products || []);
    } catch (err) {
      console.log("Error in adminproducts:", err.message);
    }
  };

  const handleSetFeatured = async (product) => {
    try {
      const res = await api.patch(`/admin/products/${product._id}`, {
        featured,
      });

      console.log(res.data);
      fetchproducts();
    } catch (err) {
      console.log("Error in adminproducts:", err.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await api.delete(`/admin/products/${productId}`);
      fetchproducts();
      toast.success("Product Deleted Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.log("Error deleting product:", err.message);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);
  return (
    <>
      <AdminNavbar />
      <main className="bg-[#F8FAFC] pt-20 md:pl-72 md:pt-20 pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-900">Manage Products</h1>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-6 overflow-hidden">
            <div className="grid grid-cols-5 bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-slate-700">
              <p>Product ID</p>
              <p>Title</p>
              <p>Vendor</p>
              <p>Featured</p>
              <p>Action</p>
            </div>
            {products.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-5 px-4 py-3 text-sm border-t border-slate-200 text-slate-700"
              >
                <p>{product._id}</p>
                <p>{product.title}</p>
                <p>{product?.vendor?.fullName || product?.vendor || "-"}</p>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setfeatured(!featured);
                      handleSetFeatured(product);
                    }}
                    className="rounded-md bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {product.isFeatured ? "Remove Featured" : "Set Featured"}
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(product._id)}
                    disabled={deletingId === product._id}
                    className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {deletingId === product._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminProducts;
