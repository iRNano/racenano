"use client"; // Mark this component for client-side rendering

import { useAuth } from "../contexts/AuthContext";

import Link from "next/link";

const Navbar = () => {
  const { authState, logout } = useAuth();
  const isAdmin = authState?.user?.role === "admin";

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  console.log("isAdmin", authState?.user);
  console.log("isAdmin", isAdmin);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Home Link */}
        <Link href="/" className="text-2xl font-bold">
          RaceApp
        </Link>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-4">
          {/* Always visible links */}
          <Link
            href={isAdmin ? "/admin" : "/"}
            className="text-white hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            href={isAdmin ? "/admin/races" : "/races"}
            className="text-white hover:text-gray-300"
          >
            Races
          </Link>
          <Link
            href={isAdmin ? "/admin/results" : "/results"}
            className="text-white hover:text-gray-300"
          >
            Results
          </Link>

          {/* Auth-dependent links */}
          {!authState.isAuthenticated ? (
            <>
              <Link href="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link href="/register" className="text-white hover:text-gray-300">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="text-white hover:text-gray-300">
                Profile
              </Link>
              {/* Logout as a Link-styled button */}
              <a
                href="#"
                onClick={() => handleLogout()}
                className="text-white hover:text-gray-300 rounded-md focus:outline-none"
              >
                Logout
              </a>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <button className="text-white">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
