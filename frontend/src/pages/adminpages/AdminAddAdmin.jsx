import { useState } from "react";
import AdminNavbar from "../../Components/AdminNavbar";
import api from "../../api";
import { toast } from "react-toastify";

const AdminAddAdmin = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const isMismatch =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isMismatch) return;
    try{
     const res=await api.post("/admin/addadmin",formData)
     toast.success("Admin Added Successfully");
    }catch(err){
         toast.error(err.response?.data?.message);
        console.log("Error in Adminaddadmin:",err.message)
    }
    console.log("Add admin form submitted", formData);
  };

  return (
    <>
      <AdminNavbar />
      <main className="bg-gray-100 pt-20 md:pl-72 md:pt-20 pb-10 min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Add New Admin</h1>

          <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm max-w-2xl"
          >
            <p className="mb-6 text-sm text-gray-600">
              Create another admin account for platform management.
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Re-enter password"
                />
                {isMismatch && (
                  <p className="mt-2 text-sm text-red-600">
                    Password and confirm password do not match.
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isMismatch}
              className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              Add Admin
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default AdminAddAdmin;
