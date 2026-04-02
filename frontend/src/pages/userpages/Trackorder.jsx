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
      <div className="min-h-screen pt-20 flex flex-col md:px-6 lg:px-10 gap-4 bg-gray-100 px-4 w-screen md:w-full">
        <h2 className="text-2xl font-bold">Track Order</h2>
        <div className="bg-white flex md:justify-start  md:gap-3 justify-between rounded-xl p-4">
          <input
            className="p-1 md:w-1/2 outline-0 border border-gray-200 rounded-xl"
            type="text"
            value={orderId}
            onChange={(e) => setorderId(e.target.value)}
            placeholder=" Enter Order ID"
          />{" "}
          <button
            onClick={handletrackorder}
            className="flex gap-2 bg-indigo-600 p-3 text-white font-semibold rounded-xl items-center  justify-center"
          >
            <LuBox /> Track Order
          </button>
        </div>
        {trackorder ? (
          <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1   justify-center  overflow-x-auto  rounded-xl p-3 gap-2">
            <div className=" rounded-xl flex flex-col items-center justify-center bg-white  p-1">
              <h2 className="font-light">Order ID</h2>
              <h2 className=" h-10">{shortId}</h2>
            </div>
            <div className=" rounded-xl bg-white flex flex-col items-center justify-center p-1">
              <h2 className="font-light ">Shipping Via</h2>
              <h2>{trackorder.courierName}</h2>
            </div>
            <div className=" rounded-xl flex flex-col items-center justify-center bg-white  p-1">
              <h2 className="font-light">Tracking No.</h2>
              <h2>{trackorder.trackingId}</h2>
            </div>
            <div className=" rounded-xl flex flex-col items-center justify-center bg-white  p-1">
              <h2 className="font-light">Estimated Delivery</h2>
              <h2 className="font-semibold">
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
          <div className="mt-8 w-full font-bold text-center text-2xl">
            No Order For Tracking
          </div>
        )}
      </div>
    </>
  );
};

export default Trackorder;
