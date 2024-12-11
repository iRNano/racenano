"use client";

// import Link from "next/link";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="bg-gray-800 text-white py-4">
        <nav className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div>
            <Link href="/admin" className="px-3 py-2 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="px-3 py-2 hover:bg-gray-700 rounded"
            >
              Users
            </Link>
            <Link
              href="/admin/races"
              className="px-3 py-2 hover:bg-gray-700 rounded"
            >
              Races
            </Link>
            <Link
              href="/admin/results"
              className="px-3 py-2 hover:bg-gray-700 rounded"
            >
              Results
            </Link>
          </div>
        </nav>
      </header> */}
      <main className="flex-grow container mx-auto py-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
