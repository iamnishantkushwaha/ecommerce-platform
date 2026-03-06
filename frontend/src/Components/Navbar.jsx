import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { NavLink } from "react-router";
const Navbar = () => {
  const [Isopen, setisopen] = useState(false);
  return (
    <div className="min-w-screen h-17 flex border-b-black border-b relative items-center justify-between px-5 bg-white">
      <div className="text-black font-bold text-2xl flex gap-2 items-center">
        <FiShoppingBag className=" text-3xl  text-indigo-600" />{" "}
        MarketPro
      </div>
      <div className="flex items-center justify-center gap-3">
        <CiShoppingCart className="text-3xl"/>{" "}
        <div>
          {!Isopen ? (
            <IoIosMenu
              className="text-2xl"
              onClick={() => setisopen(!Isopen)}
            />
          ) : (
            <RxCross2 className="text-2xl" onClick={() => setisopen(!Isopen)} />
          )}
        </div>
       
      </div>
      <div className={ Isopen?"bg-white flex py-3 flex-col text-xl h-65 max-w-full w-87 absolute  top-17":"hidden"}>
        <NavLink to="/" className="hover:bg-indigo-200 rounded-xl p-2" >Home</NavLink>
        <NavLink to="/" className="hover:bg-indigo-200 rounded-xl p-2">Products</NavLink>
        <NavLink to="/" className="hover:bg-indigo-200 rounded-xl p-2">Dashboard</NavLink>
        
      </div>
    </div>
  );
};

export default Navbar;
