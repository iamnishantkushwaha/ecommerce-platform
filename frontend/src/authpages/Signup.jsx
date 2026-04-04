import React from "react";
import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import CustomRoleSelect from "../ui/CustomRoleSelect";
import Logopara from "../ui/Logopara";
import { Link } from "react-router";
import axios from "axios";
import api from "../api";
const Signup = () => {
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrole] = useState("USER");
  const [show, setshow] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/signup`, {
        fullName,
        email,
        phoneNumber,
        password,
        role,
      });
      (setfullName(""),
        setemail(""),
        setPassword(" "),
        setphoneNumber(" "),
        setrole("USER"));
        toast.success("Account Created Successfully");
      console.log(res?.data.message);
    } catch (err) {
       toast.error(err.response?.data?.message);
      console.log("Error in Signup Page: ", err);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F2F4] w-full px-4">
      <Logopara
        logotext="MarketPro"
        para="Create your account to get started"
      />
      <div className="w-full max-w-lg mb-10 bg-white rounded-xl px-6 py-4 md:px-8">
        <div className="min-h-24 gap-1 w-full flex flex-col justify-center items-center">
          <h1 className="   gap-2 flex  font-semibold font text-3xl">
            Create Account
          </h1>
          <p className="text-gray-400 text-center">
            Fill in your details to create a new account
          </p>
        </div>
        <form
          className="flex flex-col gap-3 text-lg "
          method="POST"
          onSubmit={handleSignup}
        >
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="outline-none bg-gray-200 rounded-xl p-3"
              placeholder="John Doe"
              id="fullName"
              name="fullName"
              autoComplete="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="email">
              email
            </label>
            <input
              className="outline-none bg-gray-200 rounded-xl p-3"
              placeholder="john@gmail.com"
              id="email"
              name="email"
              type="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className="outline-none bg-gray-200 rounded-xl p-3"
              max={10}
              placeholder="9632587412"
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={phoneNumber}
              autoComplete="phoneNumber"
              onChange={(e) => setphoneNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col relative">
            <label className="font-semibold" htmlFor="password">
              Password
            </label>
            <IoMdEye
              onClick={() => setshow(!show)}
              className={!show ? "absolute top-12 right-3.5" : "hidden"}
            />
            <IoMdEyeOff
              onClick={() => setshow(!show)}
              className={show ? "absolute top-12 right-3.5" : "hidden"}
            />
            <input
              className="outline-none bg-gray-200 rounded-xl p-3"
              placeholder="******"
              id="password"
              name="password"
              type={show ? "text" : "password"}
              value={password}
              autoComplete="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <CustomRoleSelect role={role} setRole={setrole} />
          </div>
          <div className="inline">
            <input type="radio" name="agree" id="agree" autoComplete="agree" />
            <label className="text-sm pl-1.5" htmlFor="agree">
              I agree to the{" "}
              <a href="" className="text-indigo-600">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="" className="text-indigo-600">
                Privacy Policy
              </a>
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 text-white rounded-xl bg-indigo-600"
            >
              Create Account
            </button>
          </div>
          <p className="text-sm mb-10  text-center">
            Already have an account? &nbsp;
            <Link className="text-indigo-600" to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
