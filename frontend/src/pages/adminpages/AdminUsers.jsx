import { useState,useEffect } from "react";
import AdminNavbar from "../../Components/AdminNavbar";
import api from "../../api"
import { toast } from "react-toastify";


const AdminUsers = () => {

const [users,setusers]=useState([])


const fetchusers=async()=>{
  try{
      const res=await api.get("/admin/manageusers")
        console.log(res.data);
        setusers(res.data.users)
        
    }catch(err){
      console.log("Error in AdminUsers:",err.message)
    }
    }


  useEffect(()=>{

    
   fetchusers()
  },[])


  const handledeleteuser=async(userId)=>{
    try{
      const res=await api.delete(`/admin/deleteuser/${userId}`)
        console.log(res.data);
       fetchusers()
        toast.success("User Deleted Successfully");
    }catch(err){
       toast.error(err.response?.data?.message);
      console.log("Error in AdminUsers[deleteuser]:",err.message)
    }
  }
  return (
    <>
      <AdminNavbar />
      <main className="bg-gray-100 pt-20 md:pl-72 md:pt-20 pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-6 overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
              <p>User ID</p>
              <p>Name</p>
              <p>Email</p>
              <p>Action</p>
            </div>
            {users.map((user) => (
              <div
                key={user._id}
                className="grid grid-cols-4 px-4 py-3 text-sm border-t border-gray-100 text-gray-700"
              >
                <p>USR-{user._id.slice(0,6)}</p>
                <p>{user.fullName}</p>
                <p>{user.email}</p>
                <div>
                  <button onClick={()=>{handledeleteuser(user._id)}}
                    type="button"
                    className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminUsers;
