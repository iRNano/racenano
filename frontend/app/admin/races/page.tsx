"use client";

import { useState, useEffect } from "react";
import config from "../../config/config";

interface Race {
  id: number;
  name: string;
  description: string;
  date: string;
  participants: string[]; // Assuming participants are represented by their IDs (you can modify if it's a more complex structure)
}

const RacesManagement = () => {
  const [races, setRaces] = useState<Race[]>([]); // Typed the state to hold an array of Race objects

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/races`);
        if (!response.ok) throw new Error("Failed to fetch races");
        const data: Race[] = await response.json(); // Typed the response data as an array of Race objects
        setRaces(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRaces();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Race Management</h1>
      {races.length > 0 ? (
        <ul className="space-y-4">
          {races.map((race) => (
            <li key={race.id} className="border p-4 rounded">
              <h2 className="font-bold">{race.name}</h2>
              <p>Description: {race.description}</p>
              <p>Date: {race.date}</p>
              <p>Participants: {race?.participants?.length | 0}</p>
              {/* You can display more race details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No races found.</p>
      )}
    </div>
  );
};

export default RacesManagement;
