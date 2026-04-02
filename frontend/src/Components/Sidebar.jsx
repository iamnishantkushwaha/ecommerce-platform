import React from "react";
import { NavLink } from "react-router";
import { FiShoppingBag } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";

const Sidebar = () => {

  const sidebaroptions = [
    {
      logo: FiShoppingBag,
      label: "Orders",
      path: "/dashboard/orders",
    },
    { logo: CiLocationOn , label: "Track Order", path: "/dashboard/trackorder" },
    { logo: IoMdContact, label: "Profile", path: "/dashboard/profile" },
    {
      logo: IoSettingsOutline,
      label: "Setting",
      path: "/dashboard/setting",
    },
  ];
  return (
    <div className="hidden md:bg-black  md:w-65
md:shrink-0
px-5  md:flex md:justify-between md:pt-20 md:flex-col ">
        <div className="flex flex-col gap-3 ">
      {sidebaroptions.map((option, idx) => {
      const Icon=option.logo;
        return (
          <NavLink
            key={idx}
            to={option.path}
            className="flex  w-full items-center  font-semibold gap-2 hover:bg-indigo-600 text-white rounded-xl p-2"
          >
            <Icon className="font-bold" /> { option.label}
          </NavLink>
        );
      })}
     
    </div>
     <div className="pb-10">
        <NavLink
            
            to="/"
            className="flex  w-full items-center  font-semibold gap-2 hover:bg-indigo-600 text-white rounded-xl p-2"
          >
            <GoArrowLeft className="font-bold"/> Back to Store
          </NavLink>
      </div>
    </div>
    
  );
};

export default Sidebar;
