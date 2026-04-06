import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import {
  FiShoppingBag,
  FiBox,
  FiPlusCircle,
  FiTrendingUp,
  FiSettings,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { TbLayoutGrid } from "react-icons/tb";
import { IoBagHandleOutline } from "react-icons/io5";
import api from "../api";

const navItems = [
  { label: "Dashboard", path: "/vendor/dashboard", icon: TbLayoutGrid },
  { label: "Products", path: "/vendor/products", icon: FiBox },
  { label: "Add Product", path: "/vendor/add-product", icon: FiPlusCircle },
  { label: "Orders", path: "/vendor/orders", icon: IoBagHandleOutline },
  { label: "Revenue", path: "/vendor/revenue", icon: FiTrendingUp },
  { label: "Settings", path: "/vendor/settings", icon: FiSettings },
];

const getLinkClasses = ({ isActive }) =>
  `rounded-lg px-3 py-2 font-medium transition-colors ${
    isActive ? "bg-blue-50 text-blue-500" : "text-slate-700 hover:bg-slate-100"
  }`;

const VendorNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.get(`/logout`);
      setIsOpen(false);
      console.log(res?.data.message);
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (err) {
      console.log("Error in Navbar", err);
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col bg-slate-900 text-white md:flex">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-3">
            <FiShoppingBag className="text-2xl text-blue-500" />
            <span className="text-3xl font-bold leading-none">MarketPro</span>
          </div>
          <NavLink
            to="/vendor/profile"
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            aria-label="Vendor profile"
          >
            <GoPerson className="text-xl" />
          </NavLink>
        </div>

        <div className="px-4 py-4">
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">
            Vendor
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon className="text-lg" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl bg-blue-500 px-4 py-3 text-left font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="fixed left-72 right-0 top-0 z-40 hidden h-16 items-center justify-between border-b border-slate-200 bg-white px-6 md:flex">
        <h1 className="text-3xl font-semibold text-slate-900">
          Vendor Dashboard
        </h1>
        <div className="flex items-center gap-2">
          <NavLink
            to="/vendor/profile"
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Vendor profile"
          >
            <GoPerson className="text-xl" />
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="fixed top-0 left-0 z-50 w-full border-b border-slate-200 bg-white md:hidden">
        <div className="mx-auto flex h-16 w-full items-center justify-between px-4">
          <div className="text-xl font-bold text-black">Vendor Dashboard</div>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle vendor menu"
          >
            {isOpen ? (
              <RxCross2 className="text-2xl" />
            ) : (
              <IoIosMenu className="text-2xl" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-3">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={getLinkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/vendor/profile"
                className={getLinkClasses}
                onClick={() => setIsOpen(false)}
              >
                Profile
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 rounded-lg bg-blue-500 px-4 py-2 text-left font-medium text-white"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VendorNavbar;
