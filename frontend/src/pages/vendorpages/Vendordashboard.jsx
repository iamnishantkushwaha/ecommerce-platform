import React, { useState, useEffect } from "react";
import VendorNavbar from "../../Components/VendorNavbar";
import { FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { TbLayoutGrid } from "react-icons/tb";
import api from "../../api";
import DashboardChart from "../../Components/DashboardChart";

const Vendordashboard = () => {
  const [dashboardstats, setdashboardstats] = useState({});

  const totalSales = Number(dashboardstats.totalsales) || 0;
  const totalRevenue = Number(dashboardstats.totalRevenue) || 0;
  const totalOrders = Number(dashboardstats.totalOrders) || 0;
  const totalProducts = Number(dashboardstats.totalproducts) || 0;

  useEffect(() => {
    const fetchstats = async () => {
      try {
        const res = await api.get("/vendor/dashboard");
        console.log(res.data);
        setdashboardstats(res.data);
      } catch (err) {
        console.log("Error in VendorDashboard", err.message);
      }
    };
    fetchstats();
  }, []);

  const stats = [
    {
      label: "Total Sales",
      value: totalSales,

      icon: <FiShoppingBag className="text-2xl text-slate-600" />,
      bgColor: "bg-white",
    },
    {
      label: "Revenue",
      value: `₹${totalRevenue}`,

      icon: <FiTrendingUp className="text-2xl text-slate-600" />,
      bgColor: "bg-white",
    },
    {
      label: "Orders",
      value: totalOrders,

      icon: <IoBagHandleOutline className="text-2xl text-slate-600" />,
      bgColor: "bg-white",
    },
    {
      label: "Products",
      value: totalProducts,

      icon: <TbLayoutGrid className="text-2xl text-slate-600" />,
      bgColor: "bg-white",
    },
  ];

  return (
    <>
      <VendorNavbar />

      <main className="bg-slate-50 pt-24 md:pl-72 md:pt-24 pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Vendor Dashboard
            </h1>
            <p className="text-slate-500 mt-2 text-sm md:text-base">
              Welcome back! Here's your business overview.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} rounded-2xl p-5 shadow-sm border border-slate-200 transition hover:-translate-y-0.5 hover:shadow-md`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-slate-700 font-medium text-sm">
                    {stat.label}
                  </h3>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-3xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Sales Analytics
            </h2>
            <div className="w-full h-64 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center overflow-hidden">
              <DashboardChart stats={dashboardstats.monthlysales} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Vendordashboard;
