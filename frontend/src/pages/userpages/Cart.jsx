import React from "react";
import Navbar from "../../Components/Navbar";
import { Outlet } from "react-router-dom";

export const Cart = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Outlet />
    </div>
  );
};
