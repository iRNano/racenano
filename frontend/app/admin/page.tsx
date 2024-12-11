import Link from "next/link";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-8">
        Welcome to the admin dashboard. Use the sections below to manage users,
        races, and results.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Management Card */}
        <Link
          href="/admin/users"
          className="block p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-blue-500 transition-all"
        >
          <h2 className="text-lg font-semibold mb-2">User Management</h2>
          <p className="text-gray-600">
            Manage user accounts, roles, and access permissions.
          </p>
        </Link>

        {/* Races Management Card */}
        <Link
          href="/admin/races"
          className="block p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-blue-500 transition-all"
        >
          <h2 className="text-lg font-semibold mb-2">Races</h2>
          <p className="text-gray-600">
            Create, update, and manage race events.
          </p>
        </Link>

        {/* Results Management Card */}
        <Link
          href="/admin/results"
          className="block p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-blue-500 transition-all"
        >
          <h2 className="text-lg font-semibold mb-2">Results</h2>
          <p className="text-gray-600">
            View and manage race results and statistics.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
