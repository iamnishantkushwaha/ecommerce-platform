import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../Redux/Cartslice";
import api from "../api";
const Navbar = () => {
  const [Isopen, setisopen] = useState(false);
  const [user, setuser] = useState(null);
 const dispatch=useDispatch()
 const cartcount = useSelector((state) =>
  state.cart.items.reduce((total, item) => total + (item.quantity || 0), 0)
);

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
      console.log(res?.data.message);
    } catch (err) {
      console.log("Error in Navbar", err);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="min-w-screen h-17 flex  border-b-gray-400 border-b relative items-center justify-between px-4  md:px-27  bg-white ">
        <div className="text-black font-bold md:w-1/5  text-xl flex gap-2 items-center">
          <FiShoppingBag className=" text-3xl  text-indigo-600" /> MarketPro
        </div>
        <div className="flex items-center md:hidden  relative justify-center gap-3">
          {cartcount > 0 && (
  <div className="bg-red-400 font-semibold text-sm text-white flex rounded-full justify-center items-center h-4 w-4 top-0 right-8 absolute">
    {cartcount}
  </div>
)}   
          <CiShoppingCart className="text-3xl" />
          <div>
            {!Isopen ? (
              <IoIosMenu
                className="text-2xl md:hidden"
                onClick={() => setisopen(!Isopen)}
              />
            ) : (
              <RxCross2
                className="text-2xl md:hidden"
                onClick={() => setisopen(!Isopen)}
              />
            )}
          </div>
        </div>
        <div className="hidden md:flex md:items-center  md:justify-between w-full">
          <div className="flex justify-center items-center gap-8 w-4/5">
            <NavLink to="/" className="hover:bg-indigo-200 rounded-xl p-2">
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="hover:bg-indigo-200 rounded-xl p-2"
            >
              Products
            </NavLink>

            {!user && (
              <>
                <NavLink
                  to="/login"
                  className="hover:bg-indigo-200 rounded-xl p-2"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="hover:bg-indigo-200 rounded-xl p-2"
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
                  className="hover:bg-indigo-200 rounded-xl p-2"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/login"
                  className="hover:bg-indigo-200 rounded-xl p-2"
                  onClick={handlelogout}
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
            <NavLink to="/cart">
{cartcount > 0 && (
  <div className="bg-red-400 font-semibold text-md text-white flex rounded-full justify-center items-center h-5 w-5 top-0.1 right-26 absolute">
    {cartcount}
  </div>
)}              <CiShoppingCart className="text-3xl " />
            </NavLink>
            <NavLink to="/dashboard/profile">
              <GoPerson
                className={
                  user ? "text-xl ml-4 hidden md:inline-block " : "hidden"
                }
              />
            </NavLink>
          </div>
        </div>
        {/* mobile menu */}
        <div
          className={
            Isopen
              ? "bg-white text-gray-400 border-b-gray-400 border-b flex py-4 px-4 flex-col text-md h-65 w-full  left-0 absolute  top-17 "
              : "hidden"
          }
        >
          <NavLink to="/" className="hover:bg-indigo-200 rounded-xl p-2">
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="hover:bg-indigo-200 rounded-xl p-2"
          >
            Products
          </NavLink>
          {!user && (
            <>
              <NavLink
                to="/login"
                className="hover:bg-indigo-200 rounded-xl p-2"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="hover:bg-indigo-200 rounded-xl p-2"
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
                className="hover:bg-indigo-200 rounded-xl p-2"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/login"
                className="hover:bg-indigo-200 rounded-xl p-2"
                onClick={handlelogout}
              >
                Logout
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
