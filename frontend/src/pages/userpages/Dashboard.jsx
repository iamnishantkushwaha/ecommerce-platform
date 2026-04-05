import React from "react";
import Navbar from "../../Components/Navbar";
import { Outlet } from "react-router";
import Sidebar from "../../Components/Sidebar";
const Dashboard = () => {
  return (
    <div className="min-h-screen w-screen md:w-full flex bg-slate-50">
      <Sidebar />
      <div className="w-full md:w-5/6">
        <Navbar sidebar={true} />
        <div className="w-full pt-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
