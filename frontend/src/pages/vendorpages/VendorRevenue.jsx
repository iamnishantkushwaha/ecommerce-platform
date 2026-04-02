import React from "react";
import VendorNavbar from "../../Components/VendorNavbar";
import { FiTrendingUp, FiBarChart2 } from "react-icons/fi";

const VendorRevenue = () => {
  return (
    <>
      <VendorNavbar />
      <main className="bg-gray-100 pt-20 md:pl-72 md:pt-20 pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Revenue Analytics
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Track your sales performance and revenue trends
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Growth Rate Card */}
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 font-medium text-sm mb-1">
                    Growth Rate
                  </p>
                  <h2 className="text-3xl font-bold text-gray-900">18.2%</h2>
                  <p className="text-xs text-green-600 mt-1">Up from 14.5%</p>
                </div>
                <FiTrendingUp className="text-2xl text-gray-600" />
              </div>
            </div>

            {/* Net Profit Card */}
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 font-medium text-sm mb-1">
                    Net Profit
                  </p>
                  <h2 className="text-3xl font-bold text-gray-900">$34,200</h2>
                  <p className="text-xs text-green-600 mt-1">
                    +22% vs last period
                  </p>
                </div>
                <FiBarChart2 className="text-2xl text-gray-600" />
              </div>
            </div>
          </div>

          {/* Revenue Over Time Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Revenue Over Time
            </h2>

            {/* Chart Container */}
            <div className="w-full h-56 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
              <p className="text-gray-500 text-sm">Chart Container</p>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-sm text-gray-700">Revenue</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-sm text-gray-700">Sales</span>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <p className="text-gray-600 font-medium text-sm mb-1">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-gray-900">$156,840</p>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <p className="text-gray-600 font-medium text-sm mb-1">
                Avg Order Value
              </p>
              <p className="text-2xl font-bold text-gray-900">$125.40</p>
              <p className="text-xs text-gray-500 mt-1">Per transaction</p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <p className="text-gray-600 font-medium text-sm mb-1">
                Total Orders
              </p>
              <p className="text-2xl font-bold text-gray-900">1,248</p>
              <p className="text-xs text-gray-500 mt-1">Completed orders</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default VendorRevenue;
