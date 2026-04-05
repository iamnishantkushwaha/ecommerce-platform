import React from "react";
import Navbar from "../../Components/Navbar";
import { BsCash } from "react-icons/bs";
import { LuWallet } from "react-icons/lu";
import { FaCreditCard } from "react-icons/fa6";
import { FiSmartphone } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const [isonline, setisonline] = useState(false);
  const [paymentmethod, setpaymentmethod] = useState("");
  const [onlinepaymentmethod, setonlinepaymentmethod] = useState("");
  const [items, setitems] = useState([]);
  const [fullname, setfullname] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [address, setaddress] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [pincode, setpincode] = useState("");
  const [city, setcity] = useState("");

  const handlePhoneNumberChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setphonenumber(digitsOnly);
  };

  useEffect(() => {
    const fetchcart = async () => {
      try {
        const res = await api.get("/user/cart");
        setitems(res.data.cart.products || []);
      } catch (err) {
        console.log("Error in checkoput:", err.message);
      }
    };
    fetchcart();
  }, []);

  const handleplaceorder = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phonenumber)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    if (!paymentmethod) {
      return;
    }

    try {
      const formattedProducts = items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));
      let paymentStatus;
      const deliveryAddress = `${fullname}, ${address}, ${city}, ${state}, ${country}, ${pincode}\nMobile Number: ${phonenumber}`;
      if (paymentmethod == "online") {
        paymentStatus = "Paid";
      } else {
        paymentStatus = "Unpaid";
      }
      const res = await api.post("/user/orders", {
        products: formattedProducts,
        deliveryAddress,
        paymentStatus,
        shippingName: fullname,
      });
      if (res.data.message == "Order placed successfully") {
        navigate("/cart/orderplaced");
      }
      toast.success("Order Placed Successfully");
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("STATUS:", err?.response?.status);
      console.log("DATA:", err?.response?.data);
      console.log("MESSAGE:", err?.message);
      toast.error(err.response?.data?.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-screen md:w-full md:px-8 lg:px-10 px-4 flex flex-col gap-4 pt-24 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl pt-2">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Checkout
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Complete shipping and payment to place your order
          </p>
        </div>
        <form
          onSubmit={handleplaceorder}
          className="mx-auto flex w-full max-w-7xl md:flex-row md:gap-8 flex-col gap-4"
        >
          <div className="flex flex-col md:w-4/6 gap-4">
            <div className="flex flex-col gap-3 p-5 w-full bg-white rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Shipping Address
              </h3>
              <div className=" w-full ">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-slate-700"
                    htmlFor="fullName"
                  >
                    FullName
                  </label>
                  <input
                    className="outline-0 p-3 bg-slate-50 rounded-lg border border-slate-200 focus:border-blue-500"
                    type="text"
                    name="fullNAme"
                    id="fullName"
                    required
                    value={fullname}
                    onChange={(e) => setfullname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-slate-700"
                    htmlFor="contact"
                  >
                    Contact
                  </label>
                  <input
                    className="outline-0 p-3 bg-slate-50 rounded-lg border border-slate-200 focus:border-blue-500"
                    type="tel"
                    name="contact"
                    id="contact"
                    required
                    value={phonenumber}
                    onChange={handlePhoneNumberChange}
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]{10}"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-slate-700"
                    htmlFor="Address"
                  >
                    Address
                  </label>
                  <input
                    className="outline-0 p-3 bg-slate-50 rounded-lg border border-slate-200 focus:border-blue-500"
                    type="text"
                    name="Address"
                    id="Address"
                    required
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <div className="flex flex-col w-1/2 gap-2">
                    <label
                      className="text-sm font-semibold text-slate-700"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <input
                      className="outline-0 p-3 bg-slate-50 rounded-lg border border-slate-200 focus:border-blue-500"
                      type="text"
                      name="city"
                      id="city"
                      required
                      value={city}
                      onChange={(e) => setcity(e.target.value)}
                    />
                  </div>
                  <div className="flex w-1/2 flex-col gap-2">
                    <label
                      className="text-sm font-semibold text-slate-700"
                      htmlFor="State"
                    >
                      State
                    </label>
                    <input
                      className="outline-0 p-3 bg-slate-50 rounded-lg border border-slate-200 focus:border-blue-500"
                      type="text"
                      name="State"
                      id="State"
                      required
                      value={state}
                      onChange={(e) => setstate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-center items-center w-full">
                  <div className="flex w-1/2 flex-col gap-2">
                    <label
                      className="text-sm font-semibold text-slate-700"
                      htmlFor="Country"
                    >
                      Country
                    </label>
                    <input
                      className="outline-0 p-3 bg-slate-50 rounded-lg border border-slate-200 focus:border-blue-500"
                      type="text"
                      name="Country"
                      id="Country"
                      required
                      value={country}
                      onChange={(e) => setcountry(e.target.value)}
                    />
                  </div>
                  <div className="flex w-1/2 flex-col gap-2 pt-0.5">
                    <label
                      className="text-sm font-semibold text-slate-700"
                      htmlFor="Pincode"
                    >
                      Pincode
                    </label>
                    <input
                      className="outline-0 p-3 bg-slate-50 rounded-lg border border-slate-200 focus:border-blue-500"
                      type="Number"
                      name="Pincode"
                      id="Pincode"
                      required={true}
                      value={pincode}
                      onChange={(e) => setpincode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 p-5 w-full bg-white rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Payment Method
              </h3>
              <div className="flex flex-col gap-4">
                <div
                  onClick={() => {
                    setpaymentmethod(paymentmethod === "cash" ? "" : "cash");
                    setisonline(false);
                  }}
                  className={`flex rounded-xl border ${paymentmethod == "cash" ? "border-blue-500 bg-blue-50" : "border-slate-200"} gap-2 p-4 cursor-pointer transition`}
                >
                  <input
                    type="radio"
                    name="payment"
                    id="payment"
                    value="cash"
                    required
                    checked={paymentmethod == "cash"}
                    onChange={(e) => setpaymentmethod(e.target.value)}
                  />
                  <label
                    htmlFor="cash"
                    className="flex text-lg font-semibold gap-2 items-center text-slate-800"
                  >
                    <BsCash className="text-2xl " /> Cash On Delivery
                  </label>
                </div>
                <div
                  onClick={() => {
                    setpaymentmethod(
                      paymentmethod === "online" ? "" : "online",
                    );
                    setisonline(true);
                  }}
                  className={`flex rounded-xl border ${paymentmethod == "online" ? "border-blue-500 bg-blue-50" : "border-slate-200"} gap-2 p-4 cursor-pointer transition`}
                >
                  <input
                    type="radio"
                    name="payment"
                    id="online"
                    value="online"
                    required
                    checked={paymentmethod == "online"}
                    onChange={(e) => setpaymentmethod(e.target.value)}
                  />
                  <label
                    htmlFor="online"
                    className="flex text-lg font-semibold gap-2 items-center text-slate-800"
                  >
                    <LuWallet className="text-2xl " /> By Online Payment
                  </label>
                </div>
              </div>
              {isonline ? (
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Select Payment Option
                  </h3>
                  <div className="grid grid-cols-3 gap-3 items-center">
                    <div
                      onClick={() =>
                        setonlinepaymentmethod(
                          onlinepaymentmethod == "creditcard"
                            ? " "
                            : "creditcard",
                        )
                      }
                      className={`flex items-center p-3 md:p-4 ${onlinepaymentmethod == "creditcard" ? "border-blue-500 bg-blue-50" : "border-slate-200"} flex-col border rounded-xl cursor-pointer`}
                    >
                      <FaCreditCard className="text-2xl" />
                      Credit Card
                    </div>
                    <div
                      onClick={() =>
                        setonlinepaymentmethod(
                          onlinepaymentmethod == "debitcard"
                            ? " "
                            : "debitcard",
                        )
                      }
                      className={`p-3 md:p-4 flex flex-col border ${onlinepaymentmethod == "debitcard" ? "border-blue-500 bg-blue-50" : "border-slate-200"} items-center rounded-xl cursor-pointer`}
                    >
                      <FaCreditCard className="text-2xl" /> Debit Card
                    </div>
                    <div
                      onClick={() =>
                        setonlinepaymentmethod(
                          onlinepaymentmethod === "UPI" ? " " : "UPI",
                        )
                      }
                      className={`p-4 md:p-4 flex border ${onlinepaymentmethod === "UPI" ? "border-blue-500 bg-blue-50" : "border-slate-200"} items-center rounded-xl flex-col cursor-pointer`}
                    >
                      <FiSmartphone className="text-2xl" /> UPI
                    </div>
                  </div>
                  <div>
                    {onlinepaymentmethod != "UPI" ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                          <label htmlFor="cardnumber" className="font-semibold">
                            Card Number
                          </label>
                          <input
                            className="border border-slate-200 rounded-xl p-3 outline-0 focus:border-blue-500"
                            type="Number"
                            placeholder="4343 5464 4353 3345"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="expiry" className="font-semibold">
                            Expiry Date
                          </label>
                          <input
                            className="border border-slate-200 rounded-xl p-3 outline-0 focus:border-blue-500"
                            type="Number"
                            placeholder="09/11"
                          />
                        </div>
                        <div className="flex flex-col font-semibold gap-1">
                          <label htmlFor="cvv" className="font-semibold">
                            CVV
                          </label>
                          <input
                            className="border border-slate-200 rounded-xl p-3 outline-0 focus:border-blue-500"
                            type="Number"
                            placeholder="545"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <label htmlFor="upi" className="font-semibold">
                          UPI ID
                        </label>
                        <input
                          className="border border-slate-200 rounded-xl p-3 outline-0 focus:border-blue-500"
                          type="text"
                          placeholder="examample@upi"
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
          <div className="md:w-2/5 md:h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Order Summary
            </h2>

            <div className="border-b max-h-[45vh] md:max-h-58 overflow-y-auto flex flex-col gap-2 border-slate-200 py-3">
              {items.map((item) => {
                return (
                  <div
                    key={item.product._id}
                    className="flex gap-3 rounded-xl border border-slate-200 p-2"
                  >
                    <img
                      className="h-18 rounded-xl w-18 object-cover"
                      src={item.product.image}
                      alt={item.product.title}
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-slate-900">
                        {item.product.title}
                      </h3>
                      <div className="flex justify-between w-full items-center gap-3">
                        <h4 className="text-sm text-slate-600">
                          QTY:{item.quantity}
                        </h4>{" "}
                        <h2 className="text-lg font-bold text-slate-900">
                          ₹{item.quantity * item.product.price}
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between font-bold text-xl py-3">
              <span>Total</span>
              <span>₹45</span>
            </div>

            <button
              type="submit"
              className="w-full mt-2 p-4 rounded-xl bg-slate-900 text-white font-semibold transition hover:bg-blue-500"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
