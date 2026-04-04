import { useEffect,useState } from "react";
import AdminNavbar from "../../Components/AdminNavbar";
import { FiUsers, FiShield, FiPackage, FiTruck } from "react-icons/fi";

import api from "../../api"
const AdminDashboard = () => {
 const [stats,setstats]=useState({})
 const [recentactivties,setrecentactivites]=useState([])
  useEffect(()=>{
     const fetchstats=async()=>{
      try{
         const res=await api.get("/admin/dashboard");
         console.log(res.data)
         setstats(res.data)
      }catch(err){
        console.log("Error in AdminDasboard:",err)
      }
     
      
     }

    const fetchrecentactivities=async()=>{
      
      try{
         const res=await api.get("/admin/recentactivities");
         console.log(res.data)
         setrecentactivites(res.data.activities.slice(0,5))
      }catch(err){
        console.log("Error in recentactivities:",err)
      }
     
      
     }
    fetchrecentactivities()
    fetchstats()
  },[])
  const cards = [
    { label: "Total Users", value: stats.totalusers, icon: FiUsers },
    { label: "Total Vendors", value: stats.totalvendors, icon: FiShield },
    { label: "Total Products", value: stats.totalproducts, icon: FiPackage },
    { label: "Total Orders", value: stats.totalorders, icon: FiTruck },
  ];

  return (
    <>
      <AdminNavbar />
      <main className="bg-gray-100 pt-20 md:pl-72 md:pt-20 pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm">
            Overview of marketplace health and activity
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="bg-white rounded-lg p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-gray-700 font-medium text-sm">
                      {card.label}
                    </h3>
                    <Icon className="text-2xl text-gray-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-6 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Recent Activity
            </h2>
            <div className="space-y-3">
             {recentactivties.map((activity,idx)=>{
              return (<div key={idx} className="p-3 rounded-lg bg-gray-50 text-sm text-gray-700">
                {activity.message}
              </div>)
             })}
              
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
