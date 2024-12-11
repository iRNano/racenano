"use client";

import { useEffect, useState } from "react";

interface LeaderboardEntry {
  position: number;
  name: string;
  time: string; // The time or score the user achieved in the race
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch("http://localhost:5000/api/leaderboard"); // Replace with your actual API endpoint
      const data = await res.json();
      setLeaderboard(data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Leaderboard</h1>
      <ul className="mt-4">
        {leaderboard.map((entry) => (
          <li
            key={entry.position}
            className="bg-white p-4 shadow-md rounded-lg mb-2"
          >
            <div className="flex justify-between">
              <span className="text-xl">
                {entry.position}. {entry.name}
              </span>
              <span className="text-lg">{entry.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
