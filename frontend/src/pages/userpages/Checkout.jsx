import React from "react";
import Navbar from "../../Components/Navbar";
import { BsCash } from "react-icons/bs";
import { LuWallet } from "react-icons/lu";
import { FaCreditCard } from "react-icons/fa6";
import { FiSmartphone } from "react-icons/fi";
import { useState } from "react";

const Checkout = () => {
  const [isonline, setisonline] = useState(false);
  const [paymentmethod, setpaymentmethod] = useState("");
  const [onlinepaymentmethod, setonlinepaymentmethod] = useState("");
  const [IsUpi, setIsUpi] = useState(false);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-200 min-w-screen px-4 flex flex-col gap-4 pt-20">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <div className=" flex flex-col gap-3 p-4 w-full bg-white rounded-xl">
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          <form action="" className=" w-full ">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName">FullName</label>
              <input
                className="outline-0 p-2 bg-gray-100 rounded-lg border border-gray-300"
                type="text"
                name="fullNAme"
                id="fullName"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact">Contact</label>
              <input
                className="outline-0 p-2 bg-gray-100 rounded-lg border border-gray-300"
                type="text"
                name="contact"
                id="contact"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Address">Address</label>
              <input
                className="outline-0 p-2 bg-gray-100 rounded-lg border border-gray-300"
                type="text"
                name="Address"
                id="Address"
              />
            </div>
            <div className="flex gap-2 w-full">
              {" "}
              <div className="flex flex-col w-1/2 gap-2">
                <label htmlFor="city"></label>City
                <input
                  className="outline-0 p-2 bg-gray-100 rounded-lg border border-gray-300"
                  type="text"
                  name="city"
                  id="city"
                />
              </div>
              <div className="flex w-1/2 flex-col gap-2">
                <label htmlFor="State"></label>State
                <input
                  className="outline-0 p-2 bg-gray-100 rounded-lg border border-gray-300"
                  type="text"
                  name="State"
                  id="State"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-center items-center w-full">
              <div className="flex w-1/2 flex-col gap-2">
                <label htmlFor="Country"></label>Country
                <input
                  className="outline-0 p-2 bg-gray-100 rounded-lg border border-gray-300"
                  type="text"
                  name="Country"
                  id="Country"
                />
              </div>
              <div className="flex w-1/2 flex-col gap-2 pt-0.5">
                <label htmlFor="Pincode">Pincode</label>
                <input
                  className="outline-0 p-2 bg-gray-100 rounded-lg border border-gray-300"
                  type="Number"
                  name="Pincode"
                  id="Pincode"
                />
              </div>
            </div>
          </form>
        </div>
        <div className=" flex flex-col gap-8 p-4 w-full bg-white rounded-xl">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <form className="flex flex-col gap-4">
            <div
              onClick={() => {
                setpaymentmethod(paymentmethod === "cash" ? "" : "cash");
                setisonline(false);
              }}
              className={` flex   rounded-xl border  ${paymentmethod == "cash" ? "border-indigo-600 bg-indigo-100" : "border-gray-300"} gap-2 p-4`}
            >
              <input
                type="radio"
                name="payment"
                id="payment"
                value="cash"
                checked={paymentmethod == "cash"}
                onChange={(e) => setpaymentmethod(e.target.value)}
              />
              <label
                htmlFor="cash"
                className="flex text-lg font-semibold gap-2 items-center "
              >
                <BsCash className="text-2xl " /> Cash On Delivery
              </label>
            </div>
            <div
              onClick={() => {
                setpaymentmethod(paymentmethod === "online" ? "" : "online");
                setisonline(true);
              }}
              className={` flex   rounded-xl border  ${paymentmethod == "online" ? "border-indigo-600 bg-indigo-100" : "border-gray-300"} gap-2 p-4`}
            >
              <input
                type="radio"
                name="payment"
                id="online"
                value="online"
                checked={paymentmethod == "online"}
                onChange={(e) => setpaymentmethod(e.target.value)}
              />
              <label
                htmlFor="online"
                className="flex text-lg font-semibold gap-2 items-center "
              >
                <LuWallet className="text-2xl " /> By Online Payment
              </label>
            </div>
          </form>
          {isonline ? (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Select Payment Option</h3>
              <div className="flex justify-between items-center">
                <div
                  onClick={() =>
                    setonlinepaymentmethod(
                      onlinepaymentmethod == "creditcard" ? " " : "creditcard",
                    )
                  }
                  className={`flex items-center p-3 ${onlinepaymentmethod == "creditcard" ? "border-indigo-600 bg-indigo-100" : "border-gray-300 "} flex-col border rounded-xl `}
                >
                  <FaCreditCard className="text-2xl" />
                  Credit Card
                </div>
                <div
                  onClick={() =>
                    setonlinepaymentmethod(
                      onlinepaymentmethod == "debitcard" ? " " : "debitcard",
                    )
                  }
                  className={`p-3 flex flex-col border ${onlinepaymentmethod == "debitcard" ? "border-indigo-600 bg-indigo-100" : "border-gray-300 "} border-gray-300 items-center rounded-xl `}
                >
                  <FaCreditCard className="text-2xl" /> Debit Card
                </div>
                <div
                  onClick={() =>
                    setonlinepaymentmethod(
                      onlinepaymentmethod === "UPI" ? " " : "UPI",
                    )
                  }
                  className={`p-4 flex border ${onlinepaymentmethod === "UPI" ? "border-indigo-600 bg-indigo-100" : "border-gray-300 "} border-gray-300 items-center rounded-xl flex-col`}
                >
                  {" "}
                  <FiSmartphone className="text-2xl" /> UPI
                </div>
              </div>
              <div>
                {onlinepaymentmethod != "UPI" ? (
                  <form className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="cardnumber" className="font-semibold">
                        Card Number
                      </label>
                      <input
                        className="border border-gray-300 rounded-xl p-3 outline-0"
                        type="Number"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="expiry" className="font-semibold">
                        Expiry Date
                      </label>
                      <input
                        className="border border-gray-300 rounded-xl p-3 outline-0"
                        type="Number"
                      />
                    </div>
                    <div className="flex flex-col font-semibold gap-1">
                      <label htmlFor="cvv" className="font-semibold">
                        CVV
                      </label>
                      <input
                        className="border border-gray-300 rounded-xl p-3 outline-0"
                        type="Number"
                      />
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col gap-1">
                    <label htmlFor="upi" className="font-semibold">
                      UPI ID
                    </label>
                    <input
                      className="border border-gray-300 rounded-xl p-3 outline-0"
                      type="text"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            " "
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
