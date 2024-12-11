// app/ClientLayout.tsx (Client Component)
"use client"; // Ensure this is treated as a client component

import { useAuth } from "./contexts/AuthContext";
// import Navbar from "./components/Navbar";
import AdminLayout from "./admin/layout";
import DefaultLayout from "./components/DefaultLayout";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { authState } = useAuth(); // Access authState from context

  const isAdmin = authState.isAuthenticated && authState.user?.role === "admin";

  return (
    <>
      {/* <Navbar /> */}
      {/* Conditionally render AdminLayout or DefaultLayout */}
      {isAdmin ? (
        <AdminLayout>{children}</AdminLayout> // Admin layout for admin users
      ) : (
        <DefaultLayout>{children}</DefaultLayout> // Default layout for other users
      )}
    </>
  );
}
