import AdminNavbar from "../../Components/AdminNavbar";



const AdminVendors = () => {
  
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
  return (
    <>
      <AdminNavbar />
      <main className="bg-gray-100 pt-20 md:pl-72 md:pt-20 pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Manage Vendors</h1>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-6 overflow-hidden">
            <div className="grid grid-cols-5 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
              <p>Vendor ID</p>
              <p>Name</p>
              <p>Email</p>
              <p>Approval</p>
              <p>Action</p>
            </div>
            {mockVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="grid grid-cols-5 px-4 py-3 text-sm border-t border-gray-100 text-gray-700"
              >
                <p>{vendor.id}</p>
                <p>{vendor.name}</p>
                <p>{vendor.email}</p>
                <p>{vendor.approval}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={vendor.approval === "Approved"}
                    className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-gray-700 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-gray-800"
                  >
                    Disapprove
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

export default AdminVendors;
