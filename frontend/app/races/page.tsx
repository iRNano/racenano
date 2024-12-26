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
  photo: string;
  type: string;
  categories: string[]; // Array of categories
}

export default function RacesPage() {
  const [races, setRaces] = useState<Race[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

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
          setError(err.message || "An error occurred while fetching races.");
        else setError("An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRaces();
  }, []); // Empty dependency array ensures it runs once on page load

  // Filter races based on type and search term
  const filteredRaces = useMemo(() => {
    return races
      ?.filter(
        (race) =>
          filterType === "all" ||
          race.type.toLowerCase() === filterType.toLowerCase()
      )
      ?.filter((race) =>
        race.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [races, filterType, searchTerm]);

  // Memoize the race list to avoid unnecessary re-renders
  const raceList = useMemo(() => {
    return filteredRaces?.map((race) => (
      <div key={race.id} className="border rounded shadow-lg p-4">
        <img
          src={race.photo}
          alt={race.name}
          className="w-full h-32 object-cover rounded"
        />
        <h3 className="mt-4 text-xl font-bold">{race.name}</h3>
        <p className="text-gray-600 mt-1">
          Date: {new Date(race.date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mt-1">Type: {race.type}</p>
        <p className="text-gray-600 mt-1">
          Categories: {race.categories.join(", ")}
        </p>
        <Link href={`/races/${race.id}`}>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Details
          </button>
        </Link>
      </div>
    ));
  }, [filteredRaces]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Explore Races</h1>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search races..."
            className="border px-4 py-2 rounded w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <select
          id="filter"
          className="border px-4 py-2 rounded"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          {races &&
            Array.from(new Set(races.map((race) => race.type))).map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
        </select>
      </div>

      {/* Race Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Loading state */}
        {isLoading && <p className="text-center">Loading races...</p>}

        {/* Error state */}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* No races available */}
        {races && races.length === 0 && !isLoading && !error && (
          <p className="text-center">No races available at the moment.</p>
        )}

        {/* Render filtered races */}
        {raceList}
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
