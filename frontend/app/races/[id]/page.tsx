"use client";

import { useEffect, useState } from "react";
import config from "../../config/config"; // Adjust path as needed
import RegistrationStatus from "../../components/RegistrationStatus"; // Adjust path as needed
import RaceRegistration from "../../components/RaceRegistration";
import { format } from "date-fns";

interface Race {
  id: number;
  name: string;
  description: string;
  date: string;
  categories: string[];
  mechanics: string;
  paymentOptions: string[];
  registrationDeadline: string;
  prizes: string;
  schedule: string;
  mapRoute: string;
  contactInfo: {
    email: string;
    phone: string;
  };
}

interface Registration {
  raceId: number;
  category: string;
  status: string;
  registrationDate: string;
  paymentStatus: string;
}

const RaceDetailsPage = ({ params }: { params: { id: string } }) => {
  const [raceDetails, setRaceDetails] = useState<Race | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registrationInfo, setRegistrationInfo] = useState<Registration | null>(
    null
  );
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    if (!params) return;

    const fetchRaceDetailsAndRegistrationStatus = async () => {
      try {
        setLoading(true);

        // Fetch race details
        const raceResponse = await fetch(
          `${config.apiBaseUrl}/api/races/${params.id}`
        );
        if (!raceResponse.ok) {
          throw new Error("Failed to fetch race details");
        }
        const raceData: Race = await raceResponse.json();
        setRaceDetails(raceData);

        const token = localStorage.getItem("userToken");

        if (token) {
          // Check if the user is registered for this race
          const registrationResponse = await fetch(
            `${config.apiBaseUrl}/api/users/current/registrations`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Adjust as needed for auth
              },
            }
          );
          if (!registrationResponse.ok) {
            throw new Error("Failed to fetch registration status");
          }
          const registrations: Registration[] =
            await registrationResponse.json();
          const userRegistration = registrations.find(
            (reg) => reg.raceId === raceData.id
          );
          setRegistrationInfo(userRegistration || null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchRaceDetailsAndRegistrationStatus();
  }, [params]);

  const handleRegisterClick = () => {
    setIsRegistrationOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsRegistrationOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!raceDetails) return <div>No race details found.</div>;

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

      <p>
        <strong>Date:</strong> {formattedDate}
      </p>
      <p>
        <strong>Registration Deadline:</strong> {formattedDeadline}
      </p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Race Mechanics</h2>
        <p>{raceDetails.mechanics}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Payment Options</h2>
        <ul className="list-disc pl-5">
          {raceDetails.paymentOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Prizes</h2>
        <p>{raceDetails.prizes}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Event Schedule</h2>
        <p>{raceDetails.schedule}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Race Route</h2>
        <img
          src={raceDetails.mapRoute}
          alt="Race Route Map"
          width={800}
          className="w-full h-auto rounded-md shadow"
        />
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <p>
          <strong>Email:</strong> {raceDetails.contactInfo.email}
        </p>
        <p>
          <strong>Phone:</strong> {raceDetails.contactInfo.phone}
        </p>
      </div>

      <div className="mt-4">
        {registrationInfo ? (
          <RegistrationStatus registration={registrationInfo} />
        ) : (
          <>
            <button
              onClick={handleRegisterClick}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Register for Race
            </button>
            {isRegistrationOpen && (
              <div className="mt-4">
                <RaceRegistration
                  raceId={raceDetails.id}
                  raceDetails={raceDetails}
                  onClose={handleCloseRegistration}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RaceDetailsPage;
