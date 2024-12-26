"use client";

import { useEffect, useState } from "react";
import config from "../../config/config"; // Adjust path as needed
import RaceRegistration from "../../components/RaceRegistration"; // Adjust path as needed
import { format } from "date-fns";
import Image from "next/image";
interface Race {
  id: number;
  name: string;
  description: string;
  date: string;
  mechanics: string;
  paymentOptions: string[];
  registrationDeadline: string;
  prizes: string;
  schedule: string;
  mapUrl: string;
  contactInfo: {
    email: string;
    phone: string;
  };
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

  // // Format the date if needed
  const formattedDate = new Date(raceDetails.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedDeadline = format(
    new Date(raceDetails.registrationDeadline),
    "MMMM dd, yyyy"
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 border rounded-md shadow-lg">
      <h1 className="text-3xl font-bold mb-5">{raceDetails.name}</h1>
      <p className="mb-4">{raceDetails.description}</p>

      {/* Date and Registration Deadline */}
      <p>
        <strong>Date:</strong> {formattedDate}
      </p>
      <p>
        <strong>Registration Deadline:</strong> {formattedDeadline}
      </p>

      {/* Race Mechanics */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Race Mechanics</h2>
        <p>{raceDetails.mechanics}</p>
      </div>

      {/* Payment Options */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Payment Options</h2>
        <ul className="list-disc pl-5">
          {raceDetails.paymentOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>

      {/* Prizes */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Prizes</h2>
        <p className="text-xl font-semibold">{raceDetails.prizes}</p>
        {/* <ul className="list-disc pl-5">
          {raceDetails?.prizes.map((prize, index) => (
            <li key={index}>{prize}</li>
          ))}
        </ul> */}
      </div>

      {/* Event Schedule */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Event Schedule</h2>
        <p>{raceDetails.schedule}</p>
      </div>

      {/* Map and Route */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Race Route</h2>
        <Image
          src={raceDetails.mapUrl}
          alt="Race Route Map"
          className="w-full h-auto rounded-md shadow"
        />
      </div>

      {/* Contact Information */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <p>
          <strong>Email:</strong> {raceDetails.contactInfo.email}
        </p>
        <p>
          <strong>Phone:</strong> {raceDetails.contactInfo.phone}
        </p>
      </div>

      {/* Registration Component */}
      <RaceRegistration raceId={raceDetails.id} />
    </div>
  );
};

export default RaceDetailsPage;
