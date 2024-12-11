"use client";

import { useState, useEffect, useMemo } from "react";
import config from "../config/config";
import Link from "next/link";

// Type for race details
interface Race {
  id: number;
  name: string;
  description: string;
  date: string;
}

export default function RacesPage() {
  const [races, setRaces] = useState<Race[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter();

  // Fetch race data with proper error handling and loading state
  useEffect(() => {
    const fetchRaces = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/races`);
        if (!response.ok) {
          throw new Error("Failed to fetch races");
        }
        const data = await response.json();
        setRaces(data);
      } catch (err: unknown) {
        if (err instanceof Error)
          return setError(
            err.message || "An error occurred while fetching races."
          );
        setError("An error occured");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRaces();
  }, []); // Empty dependency array to ensure it runs once on page load

  // Memoize the races list to avoid unnecessary re-renders
  const raceList = useMemo(() => {
    return races?.map((race) => (
      <div key={race.id} className="border-b py-4">
        <h2 className="text-xl font-bold">{race.name}</h2>
        <p>{race.description}</p>
        <p>{new Date(race.date).toLocaleDateString()}</p>
        <Link href={`/races/${race.id}`}>View race details</Link>
      </div>
    ));
  }, [races]); // Only recompute if races data changes

  return (
    // <div className="max-w-3xl mx-auto mt-10 p-5">
    //   <h1 className="text-3xl font-bold mb-6">Available Races</h1>

    //   {/* Loading state */}
    //   {isLoading && <p className="text-center">Loading races...</p>}

    //   {/* Error state */}
    //   {error && <p className="text-red-600 text-center">{error}</p>}

    //   {/* Races list */}
    //   {races && !isLoading && !error ? <div>{raceList}</div> : null}

    //   {/* No races available */}
    //   {races && races.length === 0 && !isLoading && !error && (
    //     <p className="text-center">No races available at the moment.</p>
    //   )}
    // </div>
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Explore Races</h1>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search races..."
            className="border px-4 py-2 rounded w-full md:w-64"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <label htmlFor="filter" className="mr-2">
          Filter by Type:
        </label>
        <select id="filter" className="border px-4 py-2 rounded">
          <option value="all">All</option>
          <option value="marathon">Marathon</option>
          <option value="sprint">Sprint</option>
          <option value="relay">Relay</option>
        </select>
      </div>

      {/* Race Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Single Race Card */}
        <div className="border rounded shadow-lg p-4">
          <img
            src="/race-image.jpg"
            alt="Race Banner"
            className="w-full h-32 object-cover rounded"
          />
          <h3 className="mt-4 text-xl font-bold">City Marathon 2024</h3>
          <p className="text-gray-600 mt-1">Date: December 15, 2024</p>
          <p className="text-gray-600">Location: Downtown City</p>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
            Open for Registration
          </span>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Register Now
          </button>
        </div>
        {/* Repeat for other races */}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
          Previous
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 ml-2">
          Next
        </button>
      </div>
    </div>
  );
}
