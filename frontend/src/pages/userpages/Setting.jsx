import React from "react";
import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { MdLock } from "react-icons/md";

const Setting = () => {
  const [currentpassword, setcurrentpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newpassword === confirmpassword) {
      try {
        const res = await api.patch("/user/passwordchange", {
          currentpassword,
          newpassword,
        });
        console.log(res.data);
        toast.success("Password Changed Successfully");
        setcurrentpassword("");
        setnewpassword("");
        setconfirmpassword("");
      } catch (err) {
        toast.error(err.response?.data?.message);
        console.log("Error in Setting", err);
      }
    } else {
      alert("newpassword and confirm password doen't match");
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-slate-50 to-white px-4 md:px-8 lg:px-12 pt-24 md:pt-24 pb-8 md:pb-12">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
          <MdLock className="text-blue-600" />
          Security Settings
        </h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base">
          Protect your account with a strong password
        </p>
      </div>

      {/* Main Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-linear-to-r from-slate-900 to-blue-600 px-8 py-10 text-white">
            <h2 className="text-2xl font-bold">Change Password</h2>
            <p className="text-white/80 text-sm mt-1">
              Keep your account secure
            </p>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="px-8 md:px-10 py-10 space-y-6"
          >
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Current Password
              </label>
              <input
                autoComplete="current-password"
                value={currentpassword}
                onChange={(e) => setcurrentpassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-colors"
                type="password"
                placeholder="Enter your current password"
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                New Password
              </label>
              <input
                value={newpassword}
                onChange={(e) => setnewpassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-colors"
                type="password"
                placeholder="Enter new password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Confirm Password
              </label>
              <input
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-colors"
                type="password"
                placeholder="Confirm your new password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-slate-900 to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 mt-8"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
