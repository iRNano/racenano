"use client";

import { useState } from "react";
import config from "../config/config";

interface RaceRegistrationProps {
  raceId: number;
}

export default function RaceRegistration({ raceId }: RaceRegistrationProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const token = localStorage.getItem("userToken"); // Get the token from localStorage
      if (!token) {
        throw new Error("You need to be logged in to register for a race.");
      }

      const response = await fetch(
        `${config.apiBaseUrl}/api/races/${raceId}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to register for the race.");
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="race-registration">
      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register for Race"}
      </button>
      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
