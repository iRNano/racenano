"use client";

import { useState, useEffect } from "react";
import config from "../../config/config";
import { useRouter } from "next/navigation"; // For navigation

interface Race {
  id: number;
  name: string;
  description: string;
  date: string;
  participants: string[];
  photo: string;
  type: string;
  categories: string[]; // Assuming participants are represented by their IDs
}

const RacesManagement = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const router = useRouter();

  // Fetch races from API
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/races`);
        if (!response.ok) throw new Error("Failed to fetch races");
        const data: Race[] = await response.json();
        setRaces(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRaces();
  }, []);

  // Handle creating a new race
  const handleCreateRace = () => {
    router.push("/admin/races/create"); // Navigate to the race creation page
  };

  // Handle editing a race
  const handleEditRace = (raceId: number) => {
    router.push(`/admin/races/edit/${raceId}`); // Navigate to the race edit page
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Race Management</h1>
      <button
        onClick={handleCreateRace}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Create New Race
      </button>
      {races.length > 0 ? (
        <ul className="space-y-4">
          {races.map((race) => (
            <li key={race.id} className="border p-4 rounded">
              <h2 className="font-bold">{race.name}</h2>
              <p>Description: {race.description}</p>
              <p>Date: {race.date}</p>
              <p>Participants: {race.participants.length || 0}</p>
              <div className="mt-2">
                {/* Button to edit the race */}
                <button
                  onClick={() => handleEditRace(race.id)}
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                >
                  Edit Race
                </button>
              </div>
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
