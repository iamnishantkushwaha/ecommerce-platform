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
      <div className="min-h-screen w-screen md:w-full flex flex-col justify-center items-center bg-gray-200 pt-20 px-4">
        <div className="w-full max-w-xl rounded-xl py-4 flex flex-col justify-center md:py-10 items-center gap-4 bg-white">
          <div className="w-full flex justify-center">
            <div className="flex justify-center items-center p-2 h-20 w-20 bg-green-100 rounded-full">
              <SiTicktick className="font-extralight text-4xl text-green-500" />
            </div>
          </div>

          <h2 className="text-3xl text-center font-bold">
            Order Placed Successfully
          </h2>
          <p className="text-center px-2 md:px-8 text-gray-500">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="flex justify-center items-center ">
            <div className="bg-gray-100 px-auto  p-4 rounded-lg py-2">
              <h4 className="text-[11px]">Order Number</h4>
              <h3 className="font-bold">{orderId}</h3>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-3 justify-center items-center">
            <button
              onClick={() => {
                navigate("/dashboard/trackorder");
              }}
              className="rounded-xl bg-indigo-600 text-white font-semibold w-full max-w-xs px-6 py-2 flex gap-1 items-center justify-center"
            >
              <LuBox />
              Track parcel
            </button>
            <button className="rounded-xl font-semibold bg-gray-200 w-full max-w-xs px-6 py-2 flex gap-1 items-center justify-center">
              <FiHome />
              <Link to="/products">Back to Home</Link>
            </button>
            <h2 className="text-indigo-600 ">
              <Link to="/products">Continue to Shopping</Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPlaced;
