import React from "react";
import { GoPerson } from "react-icons/go";
import { useState, useEffect } from "react";
import api from "../../api";
import VendorNavbar from "../../Components/VendorNavbar";
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
      const res = await api.patch("/vendor/profile", {
        fullName,
        email,
        phoneNumber,
      });
      console.log(res.data.message);
      toast.success("Profile Updated Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.log("Error in Profile", err);
    }
  };
  return (
    <>
      <VendorNavbar />
      <div className="min-h-screen pt-24 md:pt-24 md:pl-72 px-4 w-full md:px-6 lg:px-10 bg-slate-50 flex flex-col gap-8 pb-10">
        <div className="max-w-3xl mx-auto w-full pt-4 md:pt-0">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            My Profile
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-500">
            Keep your vendor profile details current.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-6 md:p-8 items-center justify-center flex flex-col gap-10 w-full max-w-3xl mx-auto border border-slate-200 shadow-sm">
          <div className="flex gap-4 justify-center w-full">
            <div className="text-blue-600 h-fit w-fit bg-blue-50 p-3 text-5xl rounded-[50px] font-bold border border-blue-100">
              <GoPerson />
            </div>
            <div>
              <span className="text-2xl font-semibold text-slate-900">
                {fullName}
              </span>
              <p className="text-slate-500">{email}</p>
            </div>
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-slate-700"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                  className="p-3 outline-0 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500"
                  type="text"
                  id="fullName"
                  name="fullName"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-sm font-semibold text-slate-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="p-3 outline-0 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500"
                  type="text"
                  id="email"
                  name="email"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-sm font-semibold text-slate-700"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="p-3 outline-0 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500"
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
                />
              </div>
              <div className="flex justify-center">
                <button className="p-3 w-full sm:w-auto text-white bg-slate-900 rounded-xl font-semibold hover:bg-blue-600 transition">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
