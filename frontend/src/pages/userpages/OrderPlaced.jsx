import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import { SiTicktick } from "react-icons/si";
import { LuBox } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
const OrderPlaced = () => {
  const [orderId, setorderId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchorders = async () => {
      try {
        const res = await api.get("/user/latest-order");
        console.log(res.data, "g");
        setorderId(res.data.order._id);
      } catch (err) {
        console.log("Error in orderplace page:", err.message);
      }
    };
    fetchorders();
  }, []);
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-screen md:w-full flex flex-col justify-center items-center bg-slate-50 pt-20 px-4">
        <div className="w-full max-w-xl rounded-2xl py-6 px-5 flex flex-col justify-center md:py-10 items-center gap-4 bg-white border border-slate-200 shadow-sm">
          <div className="w-full flex justify-center">
            <div className="flex justify-center items-center p-2 h-20 w-20 bg-emerald-100 rounded-full border border-emerald-200">
              <SiTicktick className="font-extralight text-4xl text-green-500" />
            </div>
          </div>

          <h2 className="text-3xl text-center font-bold text-slate-900">
            Order Placed Successfully
          </h2>
          <p className="text-center px-2 md:px-8 text-slate-500">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="flex justify-center items-center ">
            <div className="bg-slate-100 px-auto p-4 rounded-lg py-2 border border-slate-200">
              <h4 className="text-[11px] text-slate-500">Order Number</h4>
              <h3 className="font-bold text-slate-900">{orderId}</h3>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-3 justify-center items-center">
            <button
              onClick={() => {
                navigate("/dashboard/trackorder");
              }}
              className="rounded-xl bg-slate-900 text-white font-semibold w-full max-w-xs px-6 py-3 flex gap-1 items-center justify-center transition hover:bg-blue-500"
            >
              <LuBox />
              Track parcel
            </button>
            <button className="rounded-xl font-semibold bg-slate-100 border border-slate-200 w-full max-w-xs px-6 py-3 flex gap-1 items-center justify-center text-slate-800 hover:bg-slate-200 transition">
              <FiHome />
              <Link to="/products">Back to Home</Link>
            </button>
            <h2 className="text-blue-500 font-semibold">
              <Link to="/products">Continue to Shopping</Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPlaced;
