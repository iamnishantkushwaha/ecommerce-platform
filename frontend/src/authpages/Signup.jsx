import React from "react";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import CustomRoleSelect from "../ui/CustomRoleSelect";
import Logopara from "../ui/Logopara";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
const Signup = () => {
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrole] = useState("USER");
  const [show, setshow] = useState(false);
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setphoneNumber(digitsOnly);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

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
        setPassword(""),
        setphoneNumber(""),
        setrole("USER"));
      toast.success("Account Created Successfully");
      console.log(res?.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.log("Error in Signup Page: ", err);
    }
  };
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] w-full px-4 py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <Logopara
          logotext="ShopNest"
          para="Create your account to get started"
        />

        <div className="w-full mt-4 bg-white/95 border border-slate-200 rounded-2xl px-6 py-6 md:px-8 shadow-[0_24px_45px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="min-h-24 gap-1 w-full flex flex-col justify-center items-center">
            <h1 className="gap-2 flex font-semibold text-3xl text-slate-900">
              Create Account
            </h1>
            <p className="text-slate-500 text-center">
              Fill in your details to create a new account
            </p>
          </div>

          <form
            className="flex flex-col gap-4 text-lg"
            method="POST"
            onSubmit={handleSignup}
          >
            <div className="flex flex-col gap-1.5">
              <label
                className="font-semibold text-slate-700"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="outline-none bg-slate-50 rounded-xl p-3 border border-slate-200 focus:border-blue-500"
                placeholder="John Doe"
                id="fullName"
                name="fullName"
                autoComplete="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-700" htmlFor="email">
                email
              </label>
              <input
                className="outline-none bg-slate-50 rounded-xl p-3 border border-slate-200 focus:border-blue-500"
                placeholder="john@gmail.com"
                id="email"
                name="email"
                type="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                className="font-semibold text-slate-700"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className="outline-none bg-slate-50 rounded-xl p-3 border border-slate-200 focus:border-blue-500"
                placeholder="9632587412"
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={phoneNumber}
                autoComplete="phoneNumber"
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]{10}"
                onChange={handlePhoneNumberChange}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                className="font-semibold text-slate-700"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full outline-none bg-slate-50 rounded-xl py-3 pl-3 pr-11 border border-slate-200 focus:border-blue-500"
                  placeholder="******"
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  value={password}
                  autoComplete="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setshow(!show)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-500 transition hover:text-slate-700"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? (
                    <IoMdEyeOff className="text-xl" />
                  ) : (
                    <IoMdEye className="text-xl" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <CustomRoleSelect role={role} setRole={setrole} />
            </div>
            <div className="inline text-slate-600">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                autoComplete="agree"
                className="accent-blue-500"
              />
              <label className="text-sm pl-1.5" htmlFor="agree">
                I agree to the{" "}
                <a href="" className="text-blue-500 font-semibold">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="" className="text-blue-500 font-semibold">
                  Privacy Policy
                </a>
              </label>
            </div>
            <div className="flex items-center justify-center pt-1">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 text-white rounded-xl bg-slate-900 font-semibold transition hover:bg-blue-500"
              >
                Create Account
              </button>
            </div>
            <p className="text-sm mb-2 text-center text-slate-600">
              Already have an account? &nbsp;
              <Link className="text-blue-500 font-semibold" to="/login">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
