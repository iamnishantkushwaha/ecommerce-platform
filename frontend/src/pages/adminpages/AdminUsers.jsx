import AdminNavbar from "../../Components/AdminNavbar";

const mockUsers = [
  {
    id: "USR-1201",
    name: "Aarav Singh",
    email: "aarav@example.com",
    status: "Active",
  },
  {
    id: "USR-1202",
    name: "Emily Carter",
    email: "emily@example.com",
    status: "Active",
  },
  {
    id: "USR-1203",
    name: "Noah Williams",
    email: "noah@example.com",
    status: "Blocked",
  },
];

const AdminUsers = () => {
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
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-4 px-4 py-3 text-sm border-t border-gray-100 text-gray-700"
              >
                <p>{user.id}</p>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <div>
                  <button
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
