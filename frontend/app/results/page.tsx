"use client";

import { useEffect, useState } from "react";
// import BackButton from "../components/BackButton";
import config from "../config/config";
interface ResultEntry {
  position: number;
  name: string;
  time: string; // The time or score the user achieved in the race
  raceName: string;
  raceDate: string;
}

export default function ResultsPage() {
  const [results, setResults] = useState<ResultEntry[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      // Replace with the actual API call to fetch past race results
      const res = await fetch(`${config.apiBaseUrl}/api/results`); // This should be an endpoint for previous race results
      const data = await res.json();
      setResults(data);
    };
    fetchResults();
  }, []);

  if (results.length === 0) {
    return <div>No previous results found.</div>;
  }

  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-3xl font-bold">Previous Race Results</h1>
    //   <ul className="mt-4 space-y-4">
    //     {results.map((result) => (
    //       <li
    //         key={`${result.raceName}-${result.position}`}
    //         className="bg-white p-4 shadow-md rounded-lg"
    //       >
    //         <h2 className="text-xl">{result.raceName}</h2>
    //         <p className="text-lg text-gray-700">Date: {result.raceDate}</p>
    //         <div className="mt-2">
    //           <span className="font-semibold">
    //             Position {result.position}:{" "}
    //           </span>
    //           <span>
    //             {result.name} - {result.time}
    //           </span>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    //   <BackButton />
    // </div>
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Race Results</h1>
        <p className="text-gray-600">
          Browse through past race results and track your performance.
        </p>
        <div className="flex gap-4 mt-4">
          <input
            type="text"
            placeholder="Search by name or race"
            className="border p-2 rounded w-full max-w-sm"
          />
          <select className="border p-2 rounded">
            <option>Filter by Race</option>
            <option>Marathon</option>
            <option>Half Marathon</option>
          </select>
          <select className="border p-2 rounded">
            <option>Sort by Date</option>
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Position</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Race Name</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-center">1</td>
              <td className="border p-2">John Doe</td>
              <td className="border p-2">City Marathon</td>
              <td className="border p-2">2:45:30</td>
              <td className="border p-2">2024-12-01</td>
            </tr>
            {/* Repeat for other rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
