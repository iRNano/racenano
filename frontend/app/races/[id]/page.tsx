"use client";

import { useEffect, useState } from "react";
import config from "../../config/config"; // Adjust path as needed
import RaceRegistration from "../../components/RaceRegistration"; // Adjust path as needed
import { format } from "date-fns";

interface Race {
  id: number;
  name: string;
  description: string;
  date: string;
}

const RaceDetailsPage = ({ params }: { params: { id: string } }) => {
  const [raceDetails, setRaceDetails] = useState<Race | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaceDetails = async () => {
      try {
        const response = await fetch(
          `${config.apiBaseUrl}/api/races/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch race details");
        }
        const data: Race = await response.json();
        setRaceDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchRaceDetails();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!raceDetails) return <div>No race details found.</div>;

  // Optional: Format the date if needed
  const formattedDate = format(new Date(raceDetails.date), "MMMM dd, yyyy");

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 border rounded-md shadow-lg">
      <h1 className="text-3xl font-bold mb-5">{raceDetails.name}</h1>
      <p className="mb-4">{raceDetails.description}</p>
      <p>
        <strong>Date:</strong> {formattedDate}
      </p>
      {/* Add more race details as needed */}
      <RaceRegistration raceId={raceDetails.id} />
    </div>
  );
};

export default RaceDetailsPage;
