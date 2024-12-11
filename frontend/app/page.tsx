"use client";
import Link from "next/link";

import { useAuth } from "./contexts/AuthContext";
export default function Home() {
  const { authState } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center text-primary">
        Welcome to the Race Event App
      </h1>
      <p className="text-lg text-center text-gray-700">
        Manage and track race events seamlessly. Register, view results, and
        stay updated with live tracking during events.
      </p>

      <div className="flex justify-center space-x-4 mt-8">
        {!authState.isAuthenticated && (
          <Link
            href="/register"
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Register Now
          </Link>
        )}

        <Link
          href="/races"
          className="bg-secondary text-white px-6 py-3 rounded-md hover:bg-purple-700"
        >
          View Races
        </Link>
      </div>
    </div>
  );
}
