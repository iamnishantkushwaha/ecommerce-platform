import AdminNavbar from "../../Components/AdminNavbar";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import api from "../../api";
const AdminVendors = () => {
  const [vendors, setvendors] = useState([]);
  const fetchvendors = async () => {
    try {
      const res = await api.get("/admin/managevendors");
      console.log(res.data);
      setvendors(res.data.vendors);
    } catch (err) {
      console.log("Error in AdminVendors:", err.message);
    }
  };

  useEffect(() => {
    fetchvendors();
  }, []);

  const handlevendorapprove = async (vendorId) => {
    try {
      const res = await api.patch(`/admin/managevendors/approve/${vendorId}`);
      fetchvendors();
    } catch (err) {
      console.log("Error in Vendorapprove:", err.message);
    }
  };

  const handlevendorreject = async (vendorId) => {
    try {
      const res = await api.patch(`/admin/managevendors/reject/${vendorId}`);
      fetchvendors();
    } catch (err) {
      console.log("Error in Vendorapprove:", err.message);
    }
  };

  const handleDeleteVendor = async (vendorId) => {
    try {
      const res = await api.delete(`/admin/deletevendor/${vendorId}`);
      fetchvendors();
      toast.success("Vendor Deleted Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.log("Error in Vendorapprove:", err.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      <main className="bg-[#F8FAFC] pt-20 md:pl-72 md:pt-20 pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-900">Manage Vendors</h1>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-6 overflow-hidden">
            <div className="grid grid-cols-5 bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-slate-700">
              <p>Vendor ID</p>
              <p>Name</p>
              <p>Email</p>
              <p>Approval</p>
              <p>Action</p>
            </div>
            {vendors.map((vendor) => (
              <div
                key={vendor._id}
                className="grid grid-cols-5 px-4 py-3 text-sm border-t border-slate-200 text-slate-700"
              >
                <p>{vendor._id}</p>
                <p>{vendor.fullName}</p>
                <p>{vendor.email}</p>
                <p>{vendor.approvalStatus}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handlevendorapprove(vendor._id);
                    }}
                    disabled={vendor.approvalStatus === "APPROVED"}
                    className="rounded-md bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    Approve
                  </button>
                  <button
                    disabled={vendor.approvalStatus === "REJECTED"}
                    onClick={() => {
                      handlevendorreject(vendor._id);
                    }}
                    type="button"
                    className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteVendor(vendor._id)}
                    className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700"
                  >
                    Delete
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

export default AdminVendors;
