import React from "react";
import VendorNavbar from "../../Components/VendorNavbar";
import { FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { TbLayoutGrid } from "react-icons/tb";

const Vendordashboard = () => {
  const stats = [
    {
      label: "Total Sales",
      value: "1,284",
      trend: "+12% from last month",
      icon: <FiShoppingBag className="text-2xl text-gray-600" />,
      bgColor: "bg-white",
    },
    {
      label: "Revenue",
      value: "$48,200",
      trend: "+8.2% from last month",
      icon: <FiTrendingUp className="text-2xl text-gray-600" />,
      bgColor: "bg-white",
    },
    {
      label: "Orders",
      value: "356",
      trend: "+5% from last month",
      icon: <IoBagHandleOutline className="text-2xl text-gray-600" />,
      bgColor: "bg-white",
    },
    {
      label: "Products",
      value: "45",
      trend: "3 new this month",
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
                <p className="text-xs text-green-600">{stat.trend}</p>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Sales Analytics
            </h2>
            <div className="w-full h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Chart Container</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Vendordashboard;
