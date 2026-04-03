import React, { useState,useEffect } from "react";
import VendorNavbar from "../../Components/VendorNavbar";
import { FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { TbLayoutGrid } from "react-icons/tb";
import api from "../../api";
import DashboardChart from "../../Components/DashboardChart";

const Vendordashboard = () => {
const [dashboardstats,setdashboardstats]=useState({})
 useEffect(()=>{
  const fetchstats=async()=>{
    try{
    const res=await api.get("/vendor/dashboard");
    console.log(res.data);
    setdashboardstats(res.data)
    }catch(err){
     console.log("Error in VendorDashboard",err.message);
    }
   
  }
  fetchstats()
 },[])

  const stats = [
    {
      label: "Total Sales",
      value: dashboardstats.totalsales,
     
      icon: <FiShoppingBag className="text-2xl text-gray-600" />,
      bgColor: "bg-white",
    },
    {
      label: "Revenue",
      value: ` $${dashboardstats.totalRevenue}`,
      
      icon: <FiTrendingUp className="text-2xl text-gray-600" />,
      bgColor: "bg-white",
    },
    {
      label: "Orders",
      value: dashboardstats.totalOrders,
      
      icon: <IoBagHandleOutline className="text-2xl text-gray-600" />,
      bgColor: "bg-white",
    },
    {
      label: "Products",
      value: dashboardstats.totalproducts,
      
      icon: <TbLayoutGrid className="text-2xl text-gray-600" />,
      bgColor: "bg-white",
    },
  ];

  return (
    <>
      <VendorNavbar />

      <main className="bg-gray-100 pt-20 md:pl-72 md:pt-20 pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Vendor Dashboard
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Welcome back! Here's your business overview.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} rounded-lg p-5 shadow-sm border border-gray-100`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-gray-700 font-medium text-sm">
                    {stat.label}
                  </h3>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Sales Analytics
            </h2>
            <div className="w-full h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <DashboardChart stats={dashboardstats.monthlysales}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Vendordashboard;
