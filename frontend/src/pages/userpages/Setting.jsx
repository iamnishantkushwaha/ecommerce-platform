import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../api";
const Setting = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newpassword === confirmpassword) {
      try {
        const res = await api.patch("/user/passwordchange", {
          currentpassword,
          newpassword,
        });
        console.log(res.data);
      } catch (err) {
        console.log("Error in Setting", err);
      }
    } else {
      alert("newpassword and confirm password doen't match");
    }
  };
  const [currentpassword, setcurrentpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  return (
    <div className="min-h-screen w-screen font-bold md:px-6 lg:px-10 bg-gray-100 px-4 py-5 gap-8 flex flex-col md:gap-10 md:w-full">
      <h1 className="text-3xl font-bold text-center">Setting</h1>
      <div className="rounded-xl p-6 md:px-6 md:py-4 bg-white flex flex-col gap-6 md:gap-4 items-center w-full max-w-lg mx-auto">
        <h1 className="text-2xl font-bold ">Change Password</h1>
        <div className="w-full">
          <form
            className="flex flex-col gap-6 md:gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              {" "}
              <label htmlFor="currentpassword">Current Password</label>
              <input
                autoComplete="currentpassword"
                value={currentpassword}
                id="currentpassword"
                onChange={(e) => setcurrentpassword(e.target.value)}
                className="p-2 outline-0 bg-gray-100 border border-gray-300 rounded-xl "
                type="password"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="newpassword">New Passsword</label>
              <input
                value={newpassword}
                autoComplete="newpassword"
                onChange={(e) => setnewpassword(e.target.value)}
                className="p-2 outline-0 bg-gray-100 border border-gray-300 rounded-xl "
                type="password"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                autoComplete="confirmpasssword"
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
                className="p-2 outline-0 bg-gray-100 border border-gray-300 rounded-xl "
                type="password"
              />
            </div>
            <div className="flex justify-center">
              <button className="bg-indigo-600 p-4 rounded-xl text-white font-bold w-full sm:w-auto">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
