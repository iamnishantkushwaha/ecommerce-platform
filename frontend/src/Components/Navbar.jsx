import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import { useState,useEffect } from "react";
import { NavLink } from "react-router";
import api from "../api";
const Navbar = () => {
  const [Isopen, setisopen] = useState(false);
  const [user,setuser]=useState(null);
  useEffect(()=>{
   const fetchuser=async ()=>{
       try{
      const res=await api.get(`/me`);
    setuser(res.data.user);
    console.log(res);
  }catch(err){
    console.log("Error in Navbar",err);
   }
   
  }
  fetchuser();},[])

  const handlelogout=async ()=>{
     try{const res=await api.get(`/logout`);
     setuser("");
     console.log(res?.data.message);}catch(err){
       console.log("Error in Navbar",err);
     }
  }
  return (
    <div className="min-w-screen h-17 flex  border-b-gray-400 border-b relative items-center justify-between px-4  lg:px-35 bg-white">
      <div className="text-black font-bold md:w-1/5  text-xl flex gap-2 items-center">
        <FiShoppingBag className=" text-3xl  text-indigo-600" /> MarketPro
      </div>
      <div className="flex items-center md:hidden justify-center gap-3">
        <CiShoppingCart className="text-3xl" />
        <div >
          {!Isopen ? (
            <IoIosMenu
              className="text-2xl md:hidden"
              onClick={() => setisopen(!Isopen)}
            />
          ) : (
            <RxCross2 className="text-2xl md:hidden" onClick={() => setisopen(!Isopen)} />
          )}
         
          

        </div>
        
      </div>
       <div className="md:flex md:items-center  md:justify-between w-full">
        <div className="flex justify-center items-center gap-8 w-4/5">
        <NavLink to="/" className="hover:bg-indigo-200 rounded-xl p-2">Home</NavLink>
       <NavLink to="/" className="hover:bg-indigo-200 rounded-xl p-2">Products</NavLink>
       
       {!user && (<><NavLink to="/login" className="hover:bg-indigo-200 rounded-xl p-2">Login</NavLink>
       <NavLink to="/signup" className="hover:bg-indigo-200 rounded-xl p-2">Sign Up</NavLink></>)}
       {user && (<> <NavLink to="/" className="hover:bg-indigo-200 rounded-xl p-2">Dashboard</NavLink>
       <NavLink to="/login" className="hover:bg-indigo-200 rounded-xl p-2" onClick={handlelogout}>Logout</NavLink></>)}</div>

       <div className="flex  items-center justify-center w-1/5 gap-8"><NavLink>  <CiShoppingCart className="text-3xl" /></NavLink>
      <NavLink to="/"><GoPerson className={user?"text-xl ml-4 hidden md:inline-block ":"hidden"}/></NavLink></div>
      
     
      </div>
      {/* mobile menu */}
      <div
        className={
          Isopen
            ? "bg-black text-gray-400 border-b-gray-400 border-b flex py-4 px-4 flex-col text-md h-65 w-full  left-0 absolute  top-17 "
            : "hidden"
        }
      >
        <NavLink to="/" className="hover:bg-indigo-200 rounded-xl p-2">
          Home
        </NavLink>
        <NavLink to="/" className="hover:bg-indigo-200 rounded-xl p-2">
          Products
        </NavLink>
        <NavLink to="/" className="hover:bg-indigo-200 rounded-xl p-2">
          Dashboard
        </NavLink>
      </div>
      
    </div>
  );
};

export default Navbar;
