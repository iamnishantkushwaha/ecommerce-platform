import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setCart } from "../Redux/Cartslice";
import { CiLocationOn } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";

import api from "../api";
import { toast } from "react-toastify";
const Navbar = () => {
  const location = useLocation();
  const sidebar = location.pathname.startsWith("/dashboard");
  const navigate = useNavigate();
  const [Isopen, setisopen] = useState(false);
  const [user, setuser] = useState(null);
  const dispatch = useDispatch();
  const cartcount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + (item.quantity || 0), 0),
  );

  const sidebaroptions = [
    {
      logo: FiShoppingBag,
      label: "Orders",
      path: "/dashboard/orders",
    },
    { logo: CiLocationOn, label: "Track Order", path: "/dashboard/trackorder" },
    { logo: IoMdContact, label: "Profile", path: "/dashboard/profile" },
    {
      logo: IoSettingsOutline,
      label: "Setting",
      path: "/dashboard/setting",
    },
    { logo: GoArrowLeft, label: "Back to Store", path: "/" },
  ];

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await api.get(`/me`);
        setuser(res.data.user);
        console.log(res);
        const cartRes = await api.get("/user/cart");
        dispatch(setCart(cartRes.data.cart?.products || []));
      } catch (err) {
        console.log("Error in Navbar", err);
      }
    };
    fetchuser();
  }, [dispatch]);

  const handlelogout = async () => {
    try {
      const res = await api.get(`/logout`);
      setuser("");
      dispatch(setCart([]));
      console.log(res?.data.message);
      toast.success("Logout Successfully");
      navigate("/login");
      window.location.reload();
    } catch (err) {
      console.log("Error in Navbar", err);
      toast.error("Logout failed");
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="w-full h-16 flex relative items-center justify-between px-4 md:px-8 lg:px-10 bg-white/90">
        <div className="text-slate-900 font-bold md:w-1/5 text-xl flex gap-2 items-center">
          <FiShoppingBag className="text-3xl text-blue-500" /> MarketPro
        </div>
        <div className="flex items-center md:hidden  relative justify-center gap-3">
          {cartcount > 0 && (
            <div className="bg-rose-500 font-semibold text-xs text-white flex rounded-full justify-center items-center h-4 w-4 top-0 right-8 absolute">
              {cartcount}
            </div>
          )}
          <NavLink to="/cart">
            <CiShoppingCart className="text-3xl text-slate-800" />
          </NavLink>
          <div>
            {!Isopen ? (
              <IoIosMenu
                className="text-2xl md:hidden text-slate-800"
                onClick={() => setisopen(!Isopen)}
              />
            ) : (
              <RxCross2
                className="text-2xl md:hidden text-slate-800"
                onClick={() => setisopen(!Isopen)}
              />
            )}
          </div>
        </div>
        <div className="hidden md:flex md:items-center  md:justify-between w-full">
          <div className="flex justify-center items-center gap-8 w-4/5">
            <NavLink
              to="/"
              onClick={() => setisopen(false)}
              className="hover:bg-slate-100 rounded-xl p-2 text-slate-700 transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setisopen(false)}
              className="hover:bg-slate-100 rounded-xl p-2 text-slate-700 transition"
            >
              Products
            </NavLink>

            {!user && (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setisopen(false)}
                  className="hover:bg-slate-100 rounded-xl p-2 text-slate-700 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setisopen(false)}
                  className="hover:bg-slate-100 rounded-xl p-2 text-slate-700 transition"
                >
                  Sign Up
                </NavLink>
              </>
            )}
            {user && (
              <>
                {" "}
                <NavLink
                  to="/dashboard/orders"
                  onClick={() => setisopen(false)}
                  className="hover:bg-slate-100 rounded-xl p-2 text-slate-700 transition"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/login"
                  className="hover:bg-slate-100 rounded-xl p-2 text-slate-700 transition"
                  onClick={() => {
                    handlelogout();
                    setisopen(false);
                  }}
                >
                  Logout
                </NavLink>
              </>
            )}
          </div>

          <div
            className={
              user
                ? "flex  items-center justify-center relative w-1/5   gap-8 "
                : "flex  items-center justify-end relative w-1/5  "
            }
          >
            <NavLink onClick={() => setisopen(false)} to="/cart">
              {cartcount > 0 && (
                <div className="bg-rose-500 font-semibold text-md text-white flex rounded-full justify-center items-center h-5 w-5 -top-1 right-32 absolute">
                  {cartcount}
                </div>
              )}{" "}
              <CiShoppingCart className="text-3xl text-slate-800" />
            </NavLink>
            <NavLink onClick={() => setisopen(false)} to="/dashboard/profile">
              <GoPerson
                className={
                  user
                    ? "text-xl ml-4 hidden md:inline-block text-slate-800"
                    : "hidden"
                }
              />
            </NavLink>
          </div>
        </div>
        {/* mobile menu */}
        <div
          className={
            Isopen
              ? "bg-white text-slate-800 border-b border-slate-200 flex py-4 px-4 flex-col text-md w-full left-0 absolute top-16 max-h-[70vh] overflow-y-auto"
              : "hidden"
          }
        >
          {!sidebar ? (
            <>
              <NavLink
                onClick={() => setisopen(false)}
                to="/"
                className="hover:bg-slate-100 rounded-xl p-2 transition"
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setisopen(false)}
                to="/products"
                className="hover:bg-slate-100 rounded-xl p-2 transition"
              >
                Products
              </NavLink>
              {!user && (
                <>
                  <NavLink
                    onClick={() => setisopen(false)}
                    to="/login"
                    className="hover:bg-slate-100 rounded-xl p-2 transition"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    onClick={() => setisopen(false)}
                    to="/signup"
                    className="hover:bg-slate-100 rounded-xl p-2 transition"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
              {user && (
                <>
                  {" "}
                  <NavLink
                    onClick={() => setisopen(false)}
                    to="/dashboard/orders"
                    className="hover:bg-slate-100 rounded-xl p-2 transition"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="hover:bg-slate-100 rounded-xl p-2 transition"
                    onClick={() => {
                      handlelogout();
                      setisopen(false);
                    }}
                  >
                    Logout
                  </NavLink>
                </>
              )}
            </>
          ) : (
            sidebaroptions.map((option, idx) => {
              const Icon = option.logo;
              return (
                <NavLink
                  key={idx}
                  to={option.path}
                  onClick={() => setisopen(false)}
                  className="hover:bg-slate-100 flex font-semibold items-center gap-2 rounded-xl p-2 transition"
                >
                  <Icon className="font-bold" /> {option.label}
                </NavLink>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
