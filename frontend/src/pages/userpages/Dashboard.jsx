import React from "react";
import Orders from "./Orders";
import Profile from "./Profile";
import Navbar from "../../Components/Navbar";
import { Outlet } from "react-router";
import Sidebar from "../../Components/Sidebar";
const Dashboard = () => {
  return (
    <div className="min-h-screen w-screen flex  ">
      <Sidebar />
      <div className="w-5/6">
        <Navbar sidebar={true} />
      <div className=" w-full">
        <Outlet />
      </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
