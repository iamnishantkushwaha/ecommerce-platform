import AdminNavbar from "../../Components/AdminNavbar";

const AdminSettings = () => {
  return (
    <>
      <AdminNavbar />
      <main className="bg-gray-100 pt-20 md:pl-72 md:pt-20 pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-6 p-6 space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Platform Mode
              </p>
              <p className="text-sm text-gray-600">Production</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Vendor Approval Policy
              </p>
              <p className="text-sm text-gray-600">Manual review required</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Order Monitoring
              </p>
              <p className="text-sm text-gray-600">Alerts enabled</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminSettings;
