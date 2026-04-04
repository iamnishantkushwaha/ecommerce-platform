import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import {
  FiShoppingBag,
  FiGrid,
  FiUsers,
  FiPackage,
  FiTruck,
  FiShield,
  FiSettings,
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: FiGrid },
  { label: "Users", path: "/admin/users", icon: FiUsers },
  { label: "Vendors", path: "/admin/vendors", icon: FiShield },
  { label: "Products", path: "/admin/products", icon: FiPackage },
  { label: "Orders", path: "/admin/orders", icon: FiTruck },
  { label: "Settings", path: "/admin/settings", icon: FiSettings },
];

const getLinkClasses = ({ isActive }) =>
  `rounded-lg px-3 py-2 font-medium transition-colors ${
    isActive
      ? "bg-indigo-100 text-indigo-700"
      : "text-gray-700 hover:bg-gray-100"
  }`;

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <>
      <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col bg-slate-950 text-white md:flex">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-3">
            <FiShoppingBag className="text-2xl text-indigo-400" />
            <span className="text-3xl font-bold leading-none">MarketPro</span>
          </div>
          <NavLink
            to="/admin/dashboard"
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            aria-label="Admin dashboard"
          >
            <GoPerson className="text-xl" />
          </NavLink>
        </div>

        <div className="px-4 py-4">
          <span className="rounded-full bg-indigo-600/30 px-3 py-1 text-xs font-semibold text-indigo-200">
            Admin
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
                      ? "bg-indigo-600 text-white"
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
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-left font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="fixed left-72 right-0 top-0 z-40 hidden h-16 items-center justify-between border-b border-gray-200 bg-white px-6 md:flex">
        <h1 className="text-3xl font-semibold text-slate-900">Admin Panel</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Logout
        </button>
      </div>

      <div className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white md:hidden">
        <div className="mx-auto flex h-16 w-full items-center justify-between px-4">
          <div className="text-xl font-bold text-black">Admin Panel</div>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle admin menu"
          >
            {isOpen ? (
              <RxCross2 className="text-2xl" />
            ) : (
              <IoIosMenu className="text-2xl" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-gray-200 bg-white px-4 py-3">
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
              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 rounded-lg bg-indigo-600 px-4 py-2 text-left font-medium text-white"
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

export default AdminNavbar;
