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
    { logo: CiLocationOn, label: "Track Order", path: "/dashboard/trackorder" },
    { logo: IoMdContact, label: "Profile", path: "/dashboard/profile" },
    {
      logo: IoSettingsOutline,
      label: "Setting",
      path: "/dashboard/setting",
    },
  ];
  return (
    <div className="hidden md:w-65 md:shrink-0 px-4 md:flex md:justify-between md:pt-22 md:flex-col bg-slate-950">
      <div className="flex flex-col gap-2.5">
        {sidebaroptions.map((option, idx) => {
          const Icon = option.logo;
          return (
            <NavLink
              key={idx}
              to={option.path}
              className={({ isActive }) =>
                `flex w-full items-center font-semibold gap-2 rounded-xl p-2.5 transition ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-slate-200 hover:bg-slate-800"
                }`
              }
            >
              <Icon className="font-bold" /> {option.label}
            </NavLink>
          );
        })}
      </div>
      <div className="pb-10">
        <NavLink
          to="/"
          className="flex w-full items-center font-semibold gap-2 text-slate-200 hover:bg-slate-800 rounded-xl p-2.5 transition"
        >
          <GoArrowLeft className="font-bold" /> Back to Store
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
