"use client";

import { useState, useEffect } from "react";
import config from "../config/config";
import { useAuth } from "../contexts/AuthContext";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    preferences: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { authState } = useAuth();

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("Unauthorized access. Please log in.");
        return;
      }

      try {
        const response = await fetch(
          `${config.apiBaseUrl}/api/users/${authState.user?.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        console.log(data);
        setFormData(data);
      } catch (err: unknown) {
        if (err instanceof Error)
          return setError(err.message || "Something went wrong");
        setError("Error encountered");
      }
    };

    fetchProfile();
  }, [token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/api/users/${authState.user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully!");
    } catch (err: unknown) {
      if (err instanceof Error)
        return setError(err.message || "Something went wrong");
      setError("Error encountered");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-5 text-center">Your Profile</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Bio</label>
        <input
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Preferences</label>
        <textarea
          name="preferences"
          value={JSON.stringify(formData.preferences)}
          onChange={(e) =>
            setFormData({
              ...formData,
              preferences: JSON.parse(e.target.value),
            })
          }
          className="w-full p-2 border rounded-md"
        />
      </div>
      <button
        onClick={handleSave}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
