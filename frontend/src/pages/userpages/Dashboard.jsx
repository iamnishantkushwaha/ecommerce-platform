import React from "react";
import DasboardNavbar from "../../Components/DasboardNavbar";
import Orders from "./Orders";
import Profile from "./Profile";
import Navbar from "../../Components/Navbar";
import { Outlet } from "react-router";
const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-10 w-full">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
