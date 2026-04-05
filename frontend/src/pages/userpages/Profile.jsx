import React from "react";
import { GoPerson } from "react-icons/go";
import { useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify";

const Profile = () => {
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const handlePhoneNumberChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setphoneNumber(digitsOnly);
  };

  useEffect(() => {
    const fetchprofiledata = async () => {
      try {
        const res = await api.get("/user/profile");
        console.log(res?.data.message);
        setfullName(res.data.user.fullName);
        setemail(res.data.user.email);
        setphoneNumber(res.data.user.phoneNumber);
      } catch (err) {
        console.log("Error in Profile", err);
      }
    };
    fetchprofiledata();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    try {
      const res = await api.patch("/user/profile", {
        fullName,
        email,
        phoneNumber,
      });
      toast.success("Profile Updated Successfully");
      console.log(res.data.message);
    } catch (err) {
      console.log("Error in Profile", err);
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-slate-50 to-white px-4 md:px-8 lg:px-12 pt-24 md:pt-24 pb-8 md:pb-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          My Profile
        </h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base">
          Update your personal information
        </p>
      </div>

      {/* Main Card */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-linear-to-r from-slate-900 to-blue-600 px-8 py-12 text-white">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                <GoPerson className="text-4xl text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{fullName || "User"}</h2>
                <p className="text-white/80">{email || "No email"}</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-colors"
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-colors"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-colors"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  placeholder="Enter your phone number"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-slate-900 to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 mt-8"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
