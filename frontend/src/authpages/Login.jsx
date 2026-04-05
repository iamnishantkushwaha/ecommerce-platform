import React from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import Logopara from "../ui/Logopara";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
const Login = ({ onLoginSuccess }) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setshow] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/login`, { email, password });
      setemail("");
      setPassword("");
      toast.success("Login Successfully");
      console.log(res.data);
      if (onLoginSuccess) {
        onLoginSuccess(res.data.user);
      }

      console.log("ROLE:", res.data.user.role);
      if (res.data.user.role === "USER") {
        navigate("/");
      } else if (res.data.user.role === "VENDOR") {
        navigate("/vendor/dashboard");
      } else if (res.data.user.role === "ADMIN") {
        navigate("/admin/dashboard");
      }
    } catch (err) {
       
      toast.error(err.response?.data?.message);
      console.log(err.response?.data?.message);
    }
  };
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] w-full px-4 py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Logopara
          logotext="MarketPro"
          para="Welcome back! Sign in to your account"
        />

        <div className="w-full mt-4 bg-white/95 border border-slate-200 rounded-2xl px-6 py-6 md:px-8 shadow-[0_24px_45px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="min-h-24 gap-1 w-full flex flex-col justify-center items-center">
            <h1 className="gap-2 flex font-semibold text-3xl text-slate-900">
              Sign In
            </h1>
            <p className="text-slate-500 text-center">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="flex flex-col gap-4 text-lg" onSubmit={handleLogin}>
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
                  autoComplete="current-password"
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

            <div className="inline text-slate-600">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                className="accent-blue-500"
              />
              <label className="text-sm pl-1.5" htmlFor="agree">
                Remember me for 30 days
              </label>
            </div>

            <div className="flex items-center justify-center pt-1">
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-3 text-white rounded-xl bg-slate-900 font-semibold transition hover:bg-blue-500"
              >
                Sign In
              </button>
            </div>

            <p className="text-sm mb-2 text-center text-slate-600">
              Don't have an account? &nbsp;{" "}
              <Link className="text-blue-500 font-semibold" to="/signup">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
