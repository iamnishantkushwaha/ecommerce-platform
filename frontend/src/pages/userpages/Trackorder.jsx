import React from "react";
import { LuBox } from "react-icons/lu";
import Navbar from "../../Components/Navbar";
import { useState } from "react";
import api from "../../api";
const Trackorder = () => {
  const [trackorder, settrackorder] = useState("");
  const [orderId, setorderId] = useState("");
  const [shortId, setshortId] = useState("");
  const handletrackorder = async () => {
    try {
      const res = await api.get(`/user/trackorder/${orderId}`);
      console.log(res.data.trackedorder);
      settrackorder(res.data.trackedorder);
      setshortId(res.data.trackedorder._id.toString().slice(-6));
    } catch (err) {
      console.log("Error in TrackOrder page", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 flex flex-col md:px-8 lg:px-10 gap-4 bg-slate-50 px-4 w-screen md:w-full">
        <div className="mx-auto w-full max-w-7xl pt-2">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Track Order
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Enter your order id to get live tracking details
          </p>
        </div>
        <div className="mx-auto w-full max-w-7xl bg-white border border-slate-200 flex md:justify-start md:gap-3 justify-between rounded-2xl p-4 shadow-sm">
          <input
            className="p-2 md:w-1/2 outline-0 border border-slate-200 rounded-xl focus:border-blue-500"
            type="text"
            value={orderId}
            onChange={(e) => setorderId(e.target.value)}
            placeholder=" Enter Order ID"
          />{" "}
          <button
            onClick={handletrackorder}
            className="flex gap-2 bg-slate-900 p-3 text-white font-semibold rounded-xl items-center justify-center transition hover:bg-blue-500"
          >
            <LuBox /> Track Order
          </button>
        </div>
        {trackorder ? (
          <div className="mx-auto w-full max-w-7xl grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 justify-center overflow-x-auto rounded-xl gap-3">
            <div className="rounded-2xl flex flex-col items-center justify-center bg-white border border-slate-200 p-4 shadow-sm">
              <h2 className="font-light text-slate-500">Order ID</h2>
              <h2 className="h-10 font-semibold text-slate-900">{shortId}</h2>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center p-4 shadow-sm">
              <h2 className="font-light text-slate-500">Shipping Via</h2>
              <h2 className="font-semibold text-slate-900">
                {trackorder.courierName}
              </h2>
            </div>
            <div className="rounded-2xl flex flex-col items-center justify-center bg-white border border-slate-200 p-4 shadow-sm">
              <h2 className="font-light text-slate-500">Tracking No.</h2>
              <h2 className="font-semibold text-slate-900">
                {trackorder.trackingId}
              </h2>
            </div>
            <div className="rounded-2xl flex flex-col items-center justify-center bg-white border border-slate-200 p-4 shadow-sm">
              <h2 className="font-light text-slate-500">Estimated Delivery</h2>
              <h2 className="font-semibold text-slate-900 text-center">
                {new Date(trackorder.estimatedDelivery).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  },
                )}
              </h2>
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-8 w-full max-w-7xl rounded-2xl border border-dashed border-slate-300 bg-white py-16 font-bold text-center text-2xl text-slate-600">
            No Order For Tracking
          </div>
        )}
      </div>
    </>
  );
};

export default Trackorder;
