"use client";

import { useState, useEffect } from "react";
import config from "../config/config";

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

interface RaceRegistrationProps {
  raceId: number;
  raceDetails: Race;
  onClose: () => void; // Callback to close the registration form
}

export default function RaceRegistration({
  raceId,
  raceDetails,
  onClose,
}: RaceRegistrationProps) {
  const [formData, setFormData] = useState({
    nickname: "",
    category: "",
    paymentMethod: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Pre-fill form data if needed (e.g., user profile information)
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) return;

        const response = await fetch(`${config.apiBaseUrl}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setFormData((prevFormData) => ({
            ...prevFormData,
            nickname: userData.nickname || "",
          }));
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("Authentication required");

      const response = await fetch(
        `${config.apiBaseUrl}/api/races/${raceId}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md border">
      <button
        onClick={onClose}
        className="text-red-500 hover:text-red-700 mb-2"
      >
        Close
      </button>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">
          Register for {raceDetails?.name}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Nickname (optional)
          </label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Category</option>
            {raceDetails?.categories.map((cat: string) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Payment Method
          </label>
          <input
            type="text"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Registration"}
        </button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
}
