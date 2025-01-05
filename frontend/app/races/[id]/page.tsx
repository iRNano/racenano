"use client";

import { useEffect, useState } from "react";
import config from "../../config/config"; // Adjust path as needed
// import RaceRegistration from "../../components/RaceRegistration"; // Adjust path as needed
import { format } from "date-fns";
import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify"; // Ensure react-toastify is installed and configured

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
  mapRoute: string;
  contactInfo: {
    email: string;
    phone: string;
  };
}

const RaceDetailsPage = ({ params }: { params: { id: string } }) => {
  const [raceDetails, setRaceDetails] = useState<Race | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { authState } = useAuth();
  const { user } = authState;
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

  const handleRegisterClick = () => {
    if (!user) {
      toast.error("You must be logged in to register.");
      return;
    }
    if (!user.isVerified) {
      toast.error(
        "Please verify your email address to proceed with registration."
      );
      return;
    }
    // Allow registration if the user is verified
    toast.success("Proceeding to registration...");
    // Implement further navigation or logic as needed
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
        <p>{raceDetails.prizes}</p>
      </div>

      {/* Event Schedule */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Event Schedule</h2>
        <p>{raceDetails.schedule}</p>
      </div>

      {/* Map and Route */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Race Route</h2>
        <img
          src={raceDetails.mapRoute}
          alt="Race Route Map"
          className="w-full h-auto rounded-md shadow"
          width={800}
          height={400}
        ></img>
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

      {/* Registration Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleRegisterClick}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Register for Race
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RaceDetailsPage;
