import VendorNavbar from "../../Components/VendorNavbar";

const Vendordashboard = () => {
  return (
    <>
      <VendorNavbar />

      <main className="min-h-screen bg-gray-100 pt-20 md:pl-72 md:pt-20">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Vendor Dashboard</h2>
            <p className="mt-2 text-slate-600">
              Dashboard content area is now visible. You can add your cards, charts, and tables here.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Vendordashboard;