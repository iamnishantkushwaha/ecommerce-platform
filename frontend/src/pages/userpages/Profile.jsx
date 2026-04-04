import React from "react";
import { GoPerson } from "react-icons/go";
import { useState, useEffect } from "react";
import api from "../../api";
const Profile = () => {
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  useEffect(() => {
    const fetchprofiledata = async () => {
      try {
        const res = await api.get("/user/profile");
        console.log(res?.data.message);
        setfullName(res.data.user.fullName);
        setemail(res.data.user.email);
        setphoneNumber(res.data.user.phoneNumber);
        toast.success("Profile Updated Successfully");
      } catch (err) {
        console.log("Error in Profile", err);
         toast.error(err.response?.data?.message);
      }
    };
    fetchprofiledata();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await api.patch("/user/profile", {
        fullName,
        email,
        phoneNumber,
      });
      console.log(res.data.message);
    } catch (err) {
      console.log("Error in Profile", err);
    }
  };
  return (
    <div className="min-h-screen px-4 w-screen md:w-full md:px-6 lg:px-10 bg-gray-100 flex flex-col justify-center gap-8">
      <h1 className="text-3xl font-bold text-center">My Profile</h1>
      <div className="rounded-xl bg-white p-6 md:p-8 items-center justify-center flex flex-col gap-10 w-full max-w-3xl mx-auto">
        <div className="flex gap-4 justify-center w-full">
          <div className="text-indigo-600 h-fit w-fit  bg-indigo-200 p-3 text-5xl rounded-[50px] font-bold">
            <GoPerson />
          </div>
          <div>
            <span className="text-2xl font-semibold">{fullName}</span>
            <p>{email}</p>
          </div>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
                className="p-2 outline-0 bg-gray-100 border border-gray-300 rounded-xl "
                type="text"
                id="fullName"
                name="fullName"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="p-2 outline-0 bg-gray-100 border border-gray-300 rounded-xl "
                type="text"
                id="email"
                name="email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
                className="p-2 outline-0 bg-gray-100 border border-gray-300 rounded-xl "
                type="text"
                id="phoneNumber"
                name="phoneNumber"
              />
            </div>
            <div className="flex justify-center">
              <button className="p-3 w-full sm:w-auto text-white bg-indigo-600 rounded-xl font-semibold">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
