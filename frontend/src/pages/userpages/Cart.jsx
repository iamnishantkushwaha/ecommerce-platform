import React from "react";
import Navbar from "../../Components/Navbar";
import { Outlet } from "react-router-dom";

export const Cart = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};