import { useState } from "react";
import api from "../../api";
import VendorNavbar from "../../Components/VendorNavbar";

const VendorSettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const isMismatch =
    formData.confirmPassword.length > 0 &&
    formData.newPassword !== formData.confirmPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isMismatch) return;

    try {
      const res = await api.patch("/user/passwordchange", {
        currentpassword: formData.currentPassword,
        newpassword: formData.newPassword,
      });
      console.log(res.data);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.log("Error in VendorSettings:", err.message);
    }
  };

  return (
    <>
      <VendorNavbar />
      <main className="bg-slate-50 pt-24 md:pl-72 md:pt-24 pb-10 min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="pt-4 md:pt-0 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Vendor Settings
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-500">
              Update your vendor account password.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-sm border border-slate-200 mt-6 p-6 md:p-8 max-w-3xl"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              Change Password
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Update your vendor account password.
            </p>

            <div className="space-y-4 max-w-xl">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Re-enter new password"
                />
                {isMismatch && (
                  <p className="mt-2 text-sm text-red-600">
                    New password and confirm password do not match.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isMismatch}
                className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default VendorSettings;
